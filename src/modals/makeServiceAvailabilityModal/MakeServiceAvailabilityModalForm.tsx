import React, { FC } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateHotelServiceAvailabilitySchema } from '../../yupValidation/HoterServiceValidation';
import { HotelServiceAvailability, HotelServiceHourlyAvailabilityType } from '../../types';
import CardContainer from '../../containers/public/CardContainer';
import RegisterInput from '../../components/shared/RegisterInput';
import { Button } from '../../components/shared/Button';
import { useAddHotelServiceAvailabilityMutation } from '../../services/hotelServiceAvailability';

interface IMakeServiceAvailabilityModalFormProps {
  hotelServiceAvailabilities: HotelServiceAvailability
  hotelServiceId: string
}

const MakeServiceAvailabilityModalForm: FC<IMakeServiceAvailabilityModalFormProps> = ({ hotelServiceAvailabilities, hotelServiceId }) => {

  const [addHotelServiceAvailability] = useAddHotelServiceAvailabilityMutation()

  const { control, register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(CreateHotelServiceAvailabilitySchema),
    defaultValues: {
      availabilities: [
        {
          isPaid: false,
          startMonth: '',
          endMonth: '',
          hourlyAvailabilityTypeId: HotelServiceHourlyAvailabilityType.AllDay,
          startHour: '',
          endHour: '',
        },
        {
          isPaid: false,
          startMonth: '',
          endMonth: '',
          hourlyAvailabilityTypeId: HotelServiceHourlyAvailabilityType.Hours,
          startHour: '',
          endHour: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'availabilities',
  });

  const onSubmit = (data) => {
    addHotelServiceAvailability({ hotelServiceId: hotelServiceId, data })
    console.log('✅ Final Data:', data);
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {fields.map((field, index) => (
        <CardContainer className='rounded-md' key={index}>
          <div>
            <input type='checkbox' {...register(`availabilities.${index}.isPaid`)} />
          </div>
          <div className=''>
            <h3>Availability </h3>
            <RegisterInput
              type='date'
              register={register}
              name={`availabilities.${index}.startMonth`}
              label='Start Month'
            />
            <RegisterInput
              type='date'
              register={register}
              name={`availabilities.${index}.endMonth`}
              label='End Month'
            />

            <input type='checkbox' {...register(`availabilities.${index}.hourlyAvailabilityTypeId`)} />

            <Controller
              name={`availabilities.${index}.startHour`}
              control={control}
              render={({ field }) => <input type="time" {...field} />}
            />
            <Controller
              name={`availabilities.${index}.endHour`}
              control={control}
              render={({ field }) => <input type="time" step="60" {...field} />}
            />

          </div>

        </CardContainer>
      ))}


      <div className="flex justify-end gap-2">
        <Button
          onClick={() => { }}
        >
          {("buttons.save")}
        </Button>
      </div>
    </form>
  );
}


export default MakeServiceAvailabilityModalForm;

//         <div key={field.id} className="border p-3 rounded">
//   <h3 className="font-bold">Availability {index + 1}</h3>

//   <label>
//     <input type="checkbox" {...register(`availabilities.${index}.isPaid`)} />
//     Paid?
//   </label>

//   <input type="date" {...register(`availabilities.${index}.startMonth`)} />
//   {errors.availabilities?.[index]?.startMonth && (
//     <p>{errors.availabilities[index].startMonth.message}</p>
//   )}

//   <input type="date" {...register(`availabilities.${index}.endMonth`)} />
//   {errors.availabilities?.[index]?.endMonth && (
//     <p>{errors.availabilities[index].endMonth.message}</p>
//   )}

//   <select {...register(`availabilities.${index}.hourlyAvailabilityTypeId`)}>
//     {Object.values(HotelServiceHourlyAvailabilityType).map((type) => (
//       <option key={type} value={type}>{type}</option>
//     ))}
//   </select>
//   {errors.availabilities?.[index]?.hourlyAvailabilityTypeId && (
//     <p>{errors.availabilities[index].hourlyAvailabilityTypeId.message}</p>
//   )}

//   <input type="time" {...register(`availabilities.${index}.startHour`)} />
//   {errors.availabilities?.[index]?.startHour && (
//     <p>{errors.availabilities[index].startHour.message}</p>
//   )}

//   <input type="time" {...register(`availabilities.${index}.endHour`)} />
//   {errors.availabilities?.[index]?.endHour && (
//     <p>{errors.availabilities[index].endHour.message}</p>
//   )}

//   <button type="button" onClick={() => remove(index)}>Remove</button>
// </div>