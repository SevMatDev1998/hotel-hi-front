// yupValidation/HotelServiceValidation.ts
import * as yup from "yup";
import tv from '../helpers/tv';
import { HotelServiceHourlyAvailabilityType } from "../types"; // поправь путь при необходимости

const HHMM = /^\d{2}:\d{2}$/;

/** "HH:mm" -> minutes since midnight */
const toMinutes = (hhmm?: string | null) => {
  if (!hhmm) return null;
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** Период для активной группы (строгая валидация) */
const PeriodActiveSchema = yup.object({
  startMonth: yup.string().required(tv("required")),
  endMonth: yup
    .string()
    .required(tv("required"))
    .test("end>=start", tv("second_letter"), function (end) {
      const start = this.parent?.startMonth;
      if (!start || !end) return true;
      return new Date(end).getTime() >= new Date(start).getTime();
    }),

  // Радио обязательно только когда группа активна
  hourlyAvailabilityTypeId: yup
    .mixed<HotelServiceHourlyAvailabilityType>()
    .transform((v) => (v === "" || v == null ? undefined : v))
    .oneOf(
      [HotelServiceHourlyAvailabilityType.AllDay, HotelServiceHourlyAvailabilityType.Hours],
      tv("required")
    )
    .required(tv("required")),

  // Часы обязательны только при Hours
  startHour: yup
    .string()
    .nullable()
    .when("hourlyAvailabilityTypeId", {
      is: HotelServiceHourlyAvailabilityType.Hours,
      then: (s) => s.required(tv("required")).matches(HHMM, "Ֆորմատը HH:mm է"),
      otherwise: (s) => s.notRequired().nullable(),
    }),

  endHour: yup
    .string()
    .nullable()
    .when("hourlyAvailabilityTypeId", {
      is: HotelServiceHourlyAvailabilityType.Hours,
      then: (s) =>
        s
          .required(tv("required"))
          .matches(HHMM, "Ֆորմատը HH:mm է")
          .test("endHour>startHour", tv("second_letter"), function (end) {
            const start = this.parent?.startHour as string | null | undefined;
            const mEnd = toMinutes(end);
            const mStart = toMinutes(start);
            if (mEnd == null || mStart == null) return true;
            return mEnd > mStart;
          }),
      otherwise: (s) => s.notRequired().nullable(),
    }),
});

/** Период для неактивной группы (ничего не требуем) */
const PeriodInactiveSchema = yup.object({
  startMonth: yup.string().notRequired(),
  endMonth: yup.string().notRequired(),
  hourlyAvailabilityTypeId: yup
    .mixed<HotelServiceHourlyAvailabilityType>()
    .notRequired()
    .nullable(),
  startHour: yup.string().nullable().notRequired(),
  endHour: yup.string().nullable().notRequired(),
});

/** Группа (վճարովի / անվճար) */
const AvailabilityGroupSchema = yup.object({
  isPaid: yup.boolean().optional(),
  isActive: yup.boolean().default(false),
 
  periods: yup.array().when('isActive', {
    is: true,
    // Если группа активна - строгая валидация
    then: (schema) => schema
      .of(PeriodActiveSchema)
      .min(1, "Ավելացրեք առնվազն 1 ժամանակահատված")
      .required(),
    // Если группа неактивна - вообще не валидируем
    otherwise: (schema) => schema
      .of(PeriodInactiveSchema)
      .notRequired(),
  }),
}).test("no-overlap", "Ժամանակահատվածները չեն կարող հատվել", function (group) {
  // Пересечения проверяем только для активной группы
  if (!group?.isActive || !Array.isArray(group?.periods) || group.periods.length < 2) return true;

  const list = group.periods
    .map((p) => ({
      start: p?.startMonth ? new Date(p.startMonth).getTime() : NaN,
      end: p?.endMonth ? new Date(p.endMonth).getTime() : NaN,
    }))
    .filter((x) => !Number.isNaN(x.start) && !Number.isNaN(x.end))
    .sort((a, b) => a.start - b.start);

  for (let i = 1; i < list.length; i++) {
    if (list[i].start <= list[i - 1].end) {
      return this.createError({
        path: `periods.${i}.startMonth`,
        message: "Ժամանակահատվածները չեն կարող հատվել",
      });
    }
  }
  return true;
});

/** Корневая схема: ровно 2 группы (վճարովի / անվճար) */
export const CreateHotelServiceAvailabilitySchema = yup
  .object({
    availabilities: yup.array().of(AvailabilityGroupSchema).length(2).required(),
  })
  .test("no-overlap-between-groups", "Ժամանակահատվածները չեն կարող հատվել", function (data) {
    if (!data?.availabilities) return true;

    // Собираем все периоды из всех активных групп
    const allPeriods: Array<{ start: number; end: number; groupIndex: number; periodIndex: number }> = [];

    data.availabilities.forEach((group, groupIndex) => {
      if (!group?.isActive || !Array.isArray(group.periods)) return;

      group.periods.forEach((period, periodIndex) => {
        const start = period?.startMonth ? new Date(period.startMonth).getTime() : NaN;
        const end = period?.endMonth ? new Date(period.endMonth).getTime() : NaN;

        if (!Number.isNaN(start) && !Number.isNaN(end)) {
          allPeriods.push({ start, end, groupIndex, periodIndex });
        }
      });
    });

    // Сортируем по дате начала
    allPeriods.sort((a, b) => a.start - b.start);

    // Проверяем пересечения между всеми периодами
    for (let i = 1; i < allPeriods.length; i++) {
      if (allPeriods[i].start <= allPeriods[i - 1].end) {
        // Пересечение найдено
        return this.createError({
          path: `availabilities.${allPeriods[i].groupIndex}.periods.${allPeriods[i].periodIndex}.startMonth`,
          message: "Ժամանակահատվածները չեն կարող հատվել",
        });
      }
    }

    return true;
  });

export type CreateHotelServiceAvailabilityValues = yup.InferType<
  typeof CreateHotelServiceAvailabilitySchema
>;
