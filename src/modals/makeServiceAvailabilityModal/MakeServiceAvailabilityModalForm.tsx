import React, { FC } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateHotelServiceAvailabilitySchema } from '../../yupValidation/HoterServiceValidation';
import { HotelServiceAvailability, HotelServiceHourlyAvailabilityType } from '../../types';
import CardContainer from '../../containers/public/CardContainer';
import RegisterInput from '../../components/shared/RegisterInput';
import { Button } from '../../components/shared/Button';
import { useAddHotelServiceAvailabilityMutation } from '../../services/hotelServiceAvailability';
import { RegisterSelect } from '../../components/shared/RegisterSelect';

interface IMakeServiceAvailabilityModalFormProps {
  hotelServiceAvailabilities: HotelServiceAvailability;
  hotelServiceId: string;
}

const MakeServiceAvailabilityModalForm: FC<IMakeServiceAvailabilityModalFormProps> = ({
  hotelServiceAvailabilities,
  hotelServiceId,
}) => {
  const [addHotelServiceAvailability] = useAddHotelServiceAvailabilityMutation();

  const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(CreateHotelServiceAvailabilitySchema),
    defaultValues: {
      availabilities: [
        {
          isPaid: true, // первый — վճարովի (платный)
          isActive: true, // активная

          startMonth: '',
          endMonth: '',
          hourlyAvailabilityTypeId: HotelServiceHourlyAvailabilityType.AllDay,
          startHour: '',
          endHour: '',
        },
        {
          isPaid: false, // второй — անվճար (бесплатный)
          isActive: false,// неактивная

          startMonth: '',
          endMonth: '',
          hourlyAvailabilityTypeId: HotelServiceHourlyAvailabilityType.Hours,
          startHour: '',
          endHour: '',
        },
      ],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: 'availabilities',
  });

  const onSubmit = (data) => {
    // addHotelServiceAvailability({ hotelServiceId: hotelServiceId, data });
    console.log('✅ Final Data:', data);
  };

  const watchIsPaid = watch('availabilities');

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {fields.map((field, index) => {
        const isActive = watchIsPaid?.[index]?.isPaid; // если чекбокс неактивен — disable поля

        return (
          <CardContainer className="rounded-md" key={index}>
            <div className="flex items-center gap-2">
              <input type="checkbox" {...register(`availabilities.${index}.isActive`)} />
              <p>{index === 0 ? 'վճարովի' : 'անվճար'}</p>
            </div>

            <div className={`${!isActive ? 'opacity-50 pointer-events-none' : ''}`}>
              <h3>Availability</h3>

              <RegisterInput
                type="date"
                register={register}
                name={`availabilities.${index}.startMonth`}
                label="Start Month"
                disabled={!isActive}
                errors={errors.availabilities?.[index]}

              />

              <RegisterInput
                type="date"
                register={register}
                name={`availabilities.${index}.endMonth`}
                label="End Month"
                disabled={!isActive}
                errors={errors.availabilities?.[index]?.endHour}
              />
              <RegisterSelect

                name={`availabilities.${index}.hourlyAvailabilityTypeId`}
                label="Availability Type"
                options={[
                  { label: 'All Day', value: HotelServiceHourlyAvailabilityType.AllDay },
                  { label: 'Hours', value: HotelServiceHourlyAvailabilityType.Hours },
                ]}
                register={register}
                disabled={!isActive}
              />

              <Controller
                name={`availabilities.${index}.startHour`}
                control={control}
                render={({ field }) => (
                  <input type="time" {...field} disabled={!isActive} />
                )}
              />

              <Controller
                name={`availabilities.${index}.endHour`}
                control={control}
                render={({ field }) => (
                  <input type="time" step="60" {...field} disabled={!isActive} />
                )}
              />
            </div>
          </CardContainer>
        );
      })}

      <div className="flex justify-end gap-2">
        <Button onClick={() => { }}>
          {('buttons.save')}
        </Button>
      </div>
    </form>
  );
};

export default MakeServiceAvailabilityModalForm;
