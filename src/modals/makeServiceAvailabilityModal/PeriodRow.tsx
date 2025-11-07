import { FC } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import RegisterInput from "../../components/shared/RegisterInput";
import { HotelServiceHourlyAvailabilityType } from "../../types";

interface Props {
  methods: UseFormReturn<any>;
  groupIndex: number;
  periodIndex: number;
  canRemove: boolean;
  onRemove: () => void;
}

const PeriodRow: FC<Props> = ({ methods, groupIndex, periodIndex, canRemove, onRemove }) => {
  const { register, control, watch, formState: { errors } } = methods;

  const isActive = watch(`availabilities.${groupIndex}.isActive`);
  const type = watch(`availabilities.${groupIndex}.periods.${periodIndex}.hourlyAvailabilityTypeId`);
  const isHours = type === HotelServiceHourlyAvailabilityType.Hours;

  const e = errors?.availabilities?.[groupIndex]?.periods?.[periodIndex];
  console.log(errors);
  
  return (
    <div className="flex flex-wrap items-center gap-3 w-full">
      <div className="flex border border-gray-300 rounded-md">
        <RegisterInput
          type="date"
          register={register}
          name={`availabilities.${groupIndex}.periods.${periodIndex}.startMonth`}
          disabled={!isActive}
          errors={e?.startMonth}
          className="border-none m-0"
        />
        <RegisterInput
          type="date"
          register={register}
          name={`availabilities.${groupIndex}.periods.${periodIndex}.endMonth`}
          disabled={!isActive}
          errors={e?.endMonth}
          className="border-none m-0"
        />
      </div>

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

      <Controller
        name={`availabilities.${groupIndex}.periods.${periodIndex}.startHour`}
        control={control}
        render={({ field }) => (
          <input type="time" step="60" {...field} disabled={!isActive || !isHours} />
        )}
      />

      <Controller
        name={`availabilities.${groupIndex}.periods.${periodIndex}.endHour`}
        control={control}
        render={({ field }) => (
          <input type="time" step="60" {...field} disabled={!isActive || !isHours} />
        )}
      />

      {canRemove && (
        <button type="button" className="text-red-600 underline" onClick={onRemove}>
          Ջնջել
        </button>
      )}
    </div>
  );
};

export default PeriodRow;
