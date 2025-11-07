import { FC, useEffect } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import PeriodRow from "./PeriodRow";
import CardContainer from "../../containers/public/CardContainer";
import { HotelServiceHourlyAvailabilityType } from "../../types";

interface Props {
  methods: UseFormReturn<any>;
  groupIndex: 0 | 1;
  label: string;
}

const AvailabilityGroupCard: FC<Props> = ({ methods, groupIndex, label }) => {
  const { register, watch } = methods;
  const isActive = watch(`availabilities.${groupIndex}.isActive`);

  const fa = useFieldArray({
    control: methods.control,
    name: `availabilities.${groupIndex}.periods`,
  });

  return (
    <CardContainer className="rounded-md flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <input type="checkbox" {...register(`availabilities.${groupIndex}.isActive`)} />
        <p>{label}</p>
      </div>

      {fa.fields.map((f, idx) => (
        <PeriodRow
          key={f.id}
          methods={methods}
          groupIndex={groupIndex}
          periodIndex={idx}
          canRemove={fa.fields.length > 1}
          onRemove={() => fa.remove(idx)}
        />
      ))}

      <button
        type="button"
        className="text-blue-600 underline"
        disabled={!isActive}
        onClick={() =>
          fa.append({
            startMonth: "",
            endMonth: "",
            hourlyAvailabilityTypeId: HotelServiceHourlyAvailabilityType.AllDay,
            startHour: null,
            endHour: null,
          })
        }
      >
        ➕ Ավելացնել ժամանակահատված
      </button>
    </CardContainer>
  );
};

export default AvailabilityGroupCard;
