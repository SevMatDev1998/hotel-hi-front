import React, { FC, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/shared/Button';
import AvailabilityGroupCard from './AvailabilityGroupCard';
import { useTranslation } from '../../hooks/useTranslation';
import { useAddHotelServiceAvailabilityMutation } from '../../services/hotelServiceAvailability';
import { CreateHotelServiceAvailabilitySchema } from '../../yupValidation/HoterServiceValidation';
import { FormValues } from './types';


interface MakeServiceAvailabilityModalFormProps {
  hotelServiceAvailabilities: FormValues;
  hotelServiceId: string;
  onCancel: () => void;
}

const MakeServiceAvailabilityModalForm: FC<MakeServiceAvailabilityModalFormProps> = ({
  hotelServiceAvailabilities,
  hotelServiceId,
  onCancel,
}) => {
  const { t } = useTranslation();
  const [addHotelServiceAvailability] = useAddHotelServiceAvailabilityMutation();

  useEffect(() => {
    if (hotelServiceAvailabilities) {
      methods.reset(hotelServiceAvailabilities);
    }
  }, [hotelServiceAvailabilities]);

  const methods = useForm<FormValues>({
    resolver: yupResolver(CreateHotelServiceAvailabilitySchema),
    defaultValues: {
      availabilities: [
        {
          isPaid: true,
          isActive: true,
          periods: [
            {
              periodType: 'FullYear',
              startMonth: `${new Date().getFullYear()}-01-01`,
              endMonth: `${new Date().getFullYear()}-12-31`,
              hourlyAvailabilityTypeId: 'AllDay',
              startHour: null,
              endHour: null,
            }
          ],
        },
        {
          isPaid: false,
          isActive: false,
          periods: [
            {
              periodType: 'FullYear',
              startMonth: `${new Date().getFullYear()}-01-01`,
              endMonth: `${new Date().getFullYear()}-12-31`,
              hourlyAvailabilityTypeId: 'Hours',
              startHour: '',
              endHour: '',
            }
          ],
        },
      ],
    },
  });

  const { handleSubmit, formState } = methods;

  const onSubmit = ({ availabilities }: FormValues) => {
    const activeAvailabilities = availabilities
      .filter(g => g.isActive)
      .map(group => ({
        ...group,
        periods: group.periods.map(({ periodType, ...period }) => period)
      }));
    
    addHotelServiceAvailability({
      hotelServiceId,
      data: {
        availabilities: activeAvailabilities,
      },
    });
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <AvailabilityGroupCard methods={methods} groupIndex={0} label="Վճարովի" />
      <AvailabilityGroupCard methods={methods} groupIndex={1} label="Անվճար" />

      <div className="flex justify-end gap-2">
        <Button variant='text' type="button" onClick={onCancel}>
          {t("buttons.cancel")}
        </Button>
        <Button type="submit">
          {t("buttons.save")}
        </Button>
      </div>
    </form>
  );
};

export default MakeServiceAvailabilityModalForm;
