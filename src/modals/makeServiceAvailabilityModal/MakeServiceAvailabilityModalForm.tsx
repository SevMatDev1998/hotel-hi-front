import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AvailabilityGroupCard from './AvailabilityGroupCard';
import { Button } from '../../components/shared/Button';
import { FormValues } from './types';
import { useAddHotelServiceAvailabilityMutation } from '../../services/hotelServiceAvailability';
import { useTranslation } from '../../hooks/useTranslation';
import { CreateHotelServiceAvailabilitySchema } from '../../yupValidation/HoterServiceValidation';


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
   console.log("result",availabilities);
   
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
        <Button type="button" onClick={onCancel}>
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
