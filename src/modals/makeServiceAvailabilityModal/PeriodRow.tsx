import { FC } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { HotelServiceHourlyAvailabilityType } from "../../types";
import clsx from "clsx";
import { useTranslation } from "../../hooks/useTranslation";
import { Button } from "../../components/shared/Button";

interface Props {
  methods: UseFormReturn<any>;
  groupIndex: number;
  periodIndex: number;
  canRemove: boolean;
  onRemove: () => void;
}

const PeriodRow: FC<Props> = ({ methods, groupIndex, periodIndex, canRemove, onRemove }) => {
  const { register, control, watch, formState: { errors } } = methods;
  const { t } = useTranslation();

  const isActive = watch(`availabilities.${groupIndex}.isActive`);
  const type = watch(`availabilities.${groupIndex}.periods.${periodIndex}.hourlyAvailabilityTypeId`);
  const isHours = type === HotelServiceHourlyAvailabilityType.Hours;

  const e = (errors?.availabilities as any)?.[groupIndex]?.periods?.[periodIndex];
  console.log(errors);


  return (
    <div className="flex flex-col gap-2 w-full  text-12">
      <div className="flex flex-wrap items-center gap-3 w-full">
        <div className="flex flex-col">
          <div className="flex border  rounded-md">
            <input
              type="date"
              {...register(`availabilities.${groupIndex}.periods.${periodIndex}.startMonth`)}
              disabled={!isActive}
              className={clsx("border-none m-0 px-2 py-1", e?.startMonth && "border-red-500")}
            />
            <input
              type="date"
              {...register(`availabilities.${groupIndex}.periods.${periodIndex}.endMonth`)}
              disabled={!isActive}
              className={clsx("border-none m-0 px-2 py-1", e?.endMonth && "border-red-500")}
            />
          </div>
          {(e?.startMonth || e?.endMonth) && (
            <span className="text-red-500  mt-1 font-medium">
              {e?.startMonth?.message || e?.endMonth?.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
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
              <input
                type="time"
                step="60"
                {...field}
                value={field.value || ''}
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
              <input
                type="time"
                step="60"
                {...field}
                value={field.value || ''}
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

        {canRemove && (
          <Button variant="text" onClick={onRemove}>
            {t('hotel_service.remove_availability_period')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PeriodRow;
