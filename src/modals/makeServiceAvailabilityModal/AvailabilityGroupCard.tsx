import { FC } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import PeriodRow from "./PeriodRow";
import CardContainer from "../../containers/public/CardContainer";
import { HotelServiceHourlyAvailabilityType } from "../../types";
import CheckBox from "../../components/shared/CheckBox";
import { useTranslation } from "../../hooks/useTranslation";
import { Button } from "../../components/shared/Button";

interface IAvailabilityGroupCardProps {
  methods: UseFormReturn<any>;
  groupIndex: 0 | 1;
  label: string;
}

const AvailabilityGroupCard: FC<IAvailabilityGroupCardProps> = ({ methods, groupIndex, label }) => {
  const { watch, setValue } = methods;
  const isActive = watch(`availabilities.${groupIndex}.isActive`);
  const { t } = useTranslation();

  const fa = useFieldArray({
    control: methods.control,
    name: `availabilities.${groupIndex}.periods`,
  });

  return (
    <CardContainer className="rounded-md flex flex-col gap-3">
      <CheckBox
        options={{ id: groupIndex, name: label }}
        isChecked={isActive}
        toggleValue={() => setValue(`availabilities.${groupIndex}.isActive`, !isActive)}
      />
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
      <div>
        <Button
          variant="textUnderline"
          className="text-dusty-teal"
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
          {t('hotel_service.add_period')}
        </  Button>
      </div>

    </CardContainer>
  );
};

export default AvailabilityGroupCard;
