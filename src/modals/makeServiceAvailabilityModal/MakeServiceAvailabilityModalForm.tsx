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
              startMonth: '',
              endMonth: '',
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
              startMonth: '',
              endMonth: '',
              hourlyAvailabilityTypeId: 'Hours',
              startHour: '',
              endHour: '',
            }
          ],
        },
      ],
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = ({ availabilities }: FormValues) => {
   
    addHotelServiceAvailability({
      hotelServiceId,
      data: {
        availabilities: availabilities.filter(g => g.isActive),
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
