import { FC, useEffect } from "react";
import clsx from "clsx";
import { Controller, UseFormReturn } from "react-hook-form";
import { Button } from "../../components/shared/Button";
import TimeInput from "../../components/shared/TimeInput";
import { useTranslation } from "../../hooks/useTranslation";
import { HotelServiceHourlyAvailabilityType, HotelServicePeriodType } from "../../types";

interface Props {
  methods: UseFormReturn<any>;
  groupIndex: number;
  periodIndex: number;
  canRemove: boolean;
  onRemove: () => void;
}

const PeriodRow: FC<Props> = ({ methods, groupIndex, periodIndex, canRemove, onRemove }) => {
  const { register, control, watch, setValue, formState: { errors } } = methods;
  const { t } = useTranslation();

  const isActive = watch(`availabilities.${groupIndex}.isActive`);
  const periodType = watch(`availabilities.${groupIndex}.periods.${periodIndex}.periodType`);
  const type = watch(`availabilities.${groupIndex}.periods.${periodIndex}.hourlyAvailabilityTypeId`);
  const isHours = type === HotelServiceHourlyAvailabilityType.Hours;
  const isDateRange = periodType === HotelServicePeriodType.DateRange;

  const e = (errors?.availabilities as any)?.[groupIndex]?.periods?.[periodIndex];
  console.log(errors);

  // Автоматически устанавливаем даты при выборе FullYear
  useEffect(() => {
    if (periodType === HotelServicePeriodType.FullYear) {
      const currentYear = new Date().getFullYear();
      setValue(`availabilities.${groupIndex}.periods.${periodIndex}.startMonth`, `${currentYear}-01-01`);
      setValue(`availabilities.${groupIndex}.periods.${periodIndex}.endMonth`, `${currentYear}-12-31`);
    }
  }, [periodType, groupIndex, periodIndex, setValue]);


  return (
    <div className="flex items-center gap-2 w-full  text-12">
      {canRemove  &&
      <div onClick={onRemove}> 
        <img src="/images/icons/remove-button-icon.svg" alt="period icon" />
      </div>
      }
      <div className="flex flex-wrap items-center gap-3 w-full">
        <div className="flex flex-col border border-gray-300 rounded-md p-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  value={HotelServicePeriodType.FullYear}
                  {...register(`availabilities.${groupIndex}.periods.${periodIndex}.periodType`)}
                  disabled={!isActive}
                />
                <span>Ամբողջ տարի</span>
              </label>

              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  value={HotelServicePeriodType.DateRange}
                  {...register(`availabilities.${groupIndex}.periods.${periodIndex}.periodType`)}
                  disabled={!isActive}
                />
                <span>Ընտրել ժամանակահատված</span>
              </label>
            </div>
            {e?.periodType && (
              <span className="text-red-500 mt-1 font-medium">
                {e.periodType.message}
              </span>
            )}
          </div>
          
          <div className="flex border rounded-md mt-2">
            <input
              type="date"
              {...register(`availabilities.${groupIndex}.periods.${periodIndex}.startMonth`)}
              disabled={!isActive || !isDateRange}
              className={clsx("border-none m-0 px-2 py-1", e?.startMonth && "border-red-500")}
            />
            <input
              type="date"
              {...register(`availabilities.${groupIndex}.periods.${periodIndex}.endMonth`)}
              disabled={!isActive || !isDateRange}
              className={clsx("border-none m-0 px-2 py-1", e?.endMonth && "border-red-500")}
            />
          </div>
          {(e?.startMonth || e?.endMonth) && (
            <span className="text-red-500  mt-1 font-medium">
              {e?.startMonth?.message || e?.endMonth?.message}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 border border-gray-300 rounded-md p-2" >

        <div className="flex flex-col ">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value={HotelServiceHourlyAvailabilityType.AllDay}
                {...register(`availabilities.${groupIndex}.periods.${periodIndex}.hourlyAvailabilityTypeId`)}
                disabled={!isActive}
              />
              <span>24 ժամ</span>
            </label>

            <label className="flex items-center gap-1">
              <input
                type="radio"
                value={HotelServiceHourlyAvailabilityType.Hours}
                {...register(`availabilities.${groupIndex}.periods.${periodIndex}.hourlyAvailabilityTypeId`)}
                disabled={!isActive}
              />
              <span>Սահմանել ժամը</span>
            </label>
          </div>
          {e?.hourlyAvailabilityTypeId && (
            <span className="text-red-500  mt-1">
              {e.hourlyAvailabilityTypeId.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <Controller
            name={`availabilities.${groupIndex}.periods.${periodIndex}.startHour`}
            control={control}
            render={({ field }) => (
              <TimeInput
                value={field.value || ''}
                onChange={field.onChange}
                disabled={!isActive || !isHours}
                className={e?.startHour ? 'border-red-500' : ''}
              />
            )}
          />
          {e?.startHour && (
            <span className="text-red-500  mt-1">
              {e.startHour.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <Controller
            name={`availabilities.${groupIndex}.periods.${periodIndex}.endHour`}
            control={control}
            render={({ field }) => (
              <TimeInput
                value={field.value || ''}
                onChange={field.onChange}
                disabled={!isActive || !isHours}
                className={e?.endHour ? 'border-red-500' : ''}
              />
            )}
          />
          {e?.endHour && (
            <span className="text-red-500  mt-1">
              {e.endHour.message}
            </span>
          )}
        </div>
        </div>
        </div>
    </div>
  );
};

export default PeriodRow;
