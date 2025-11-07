// yupValidation/HotelServiceValidation.ts
import * as yup from "yup";
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
  startMonth: yup.string().required("Պարտադիր է"),
  endMonth: yup
    .string()
    .required("Պարտադիր է")
    .test("end>=start", "Վերջի օրը պետք է լինի ավելի ուշ կամ հավասար", function (end) {
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
      "Ընտրեք մեկ տարբերակ"
    )
    .required("Պարտադիր է"),

  // Часы обязательны только при Hours
  startHour: yup
    .string()
    .nullable()
    .when("hourlyAvailabilityTypeId", {
      is: HotelServiceHourlyAvailabilityType.Hours,
      then: (s) => s.required("Պարտադիր է").matches(HHMM, "Ֆորմատը HH:mm է"),
      otherwise: (s) => s.notRequired().nullable(),
    }),

  endHour: yup
    .string()
    .nullable()
    .when("hourlyAvailabilityTypeId", {
      is: HotelServiceHourlyAvailabilityType.Hours,
      then: (s) =>
        s
          .required("Պարտադիր է")
          .matches(HHMM, "Ֆորմատը HH:mm է")
          .test("endHour>startHour", "Ավարտի ժամը պետք է լինի ավելի ուշ", function (end) {
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
export const CreateHotelServiceAvailabilitySchema = yup.object({
  availabilities: yup.array().of(AvailabilityGroupSchema).length(2).required(),
});

export type CreateHotelServiceAvailabilityValues = yup.InferType<
  typeof CreateHotelServiceAvailabilitySchema
>;
