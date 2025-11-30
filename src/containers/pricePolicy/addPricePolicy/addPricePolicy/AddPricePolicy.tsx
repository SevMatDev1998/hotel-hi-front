import BlockContainer from '../../../public/BlockContainer';
import { useTranslation } from '../../../../hooks/useTranslation';
import InfoBlock from '../../../../components/shared/InfoBlock';
import RegisterInput from '../../../../components/shared/RegisterInput';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { CreateHotelAvailabilityFormData, CreateHotelAvailabilitySchema } from '../../../../yupValidation/PriceValidation';
import { useAddHotelAvailabilityMutation } from '../../../../services/hotelAvailability/hotelAvailability.service';
import { Button } from '../../../../components/shared/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useGetRoomBedTypesQuery } from '../../../../services/rooms';
import { RegisterSelect } from '../../../../components/shared/RegisterSelect';
import { HotelAvailability } from '../../../../types';
import InputValidationLayout from '../../../../layouts/inputValidationLayout/InputValidationLayout';

interface IAddPricePolicyProps {
  hotelId?: string;
  onSuccess?: (data: HotelAvailability) => void;
}

const AddPricePolicy: FC<IAddPricePolicyProps> = ({ hotelId, onSuccess }) => {
  const { t } = useTranslation();
  const [addHotelAvailability, { isLoading }] = useAddHotelAvailabilityMutation();

  const { data: roomBedTypes } = useGetRoomBedTypesQuery();

  const roomBedTypeOptions = roomBedTypes?.map((bedType) => ({
    value: bedType.name,
    label: bedType.name,
  })) || [];


  const { register, handleSubmit, control, formState: { errors } } = useForm<CreateHotelAvailabilityFormData>({
    resolver: yupResolver(CreateHotelAvailabilitySchema),
    defaultValues: {
      hotelAgeAssignments: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "hotelAgeAssignments",
  });

  const onSubmit = async (data: CreateHotelAvailabilityFormData) => {
    if (!hotelId) return;

    try {
      const result = await addHotelAvailability({ body: data as unknown as HotelAvailability, hotelId }).unwrap();
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (error) {
      console.error('Failed to create hotel availability:', error);
    }
  };
  console.log(errors);
  

  return (
    <div>
      <BlockContainer shadow={false}>
        <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
          <h3>{t("price_policy.price_offer_settings")}</h3>
          <InfoBlock text='Նշված ժամանակահատվածում վերապահումներ ստանալու հնարավորություն կունենաք։ Նաև գների կարգավորման միջոցով փոփոխություններ կատարել' />
          <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
            <div><span>{t("hotel_availability.price_offer_name")} *</span></div>
            <div>
              <RegisterInput
                register={register}
                errors={errors}
                name="title"
                type="text"
                className='rounded-[5px]'
              />
            </div>
          </div>

          <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center mt-4'>
            <div><span>{t("hotel_availability.arrival_and_departure_times")} *</span></div>
            <div className="flex items-center gap-3 border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none max-w-[min-content]">
              <Controller
                name="checkInTime"
                control={control}
                render={({ field }) => <input type="time" {...field} />}
              />
              <Controller
                name="checkoutTime"
                control={control}
                render={({ field }) => <input type="time" step="60" {...field} />}
              />
            </div>
          </div>

          <div className='flex flex-col gap-3 mt-6'>
            {fields.map((_, index) => (
              <div
                key={index}
                className='flex items-center'
              >

                <div onClick={() => { remove(index) }}>
                  <img
                    src="/images/icons/remove-button-icon.svg"
                    alt="add icon"
                    className="cursor-pointer"
                  />
                </div>
                <p className='text-12'>{t("price_policy.defined_intervals")}</p>
                <InputValidationLayout errors={errors} name={`hotelAgeAssignments.${index}.name`}>
                  <RegisterInput
                    register={register}
                    name={`hotelAgeAssignments.${index}.name`}
                    type="text"
                    className='border-none'
                  />
                </InputValidationLayout>
                <div>
                  <p className='text-12'>{t("price_policy.from_age")}</p>
                  <InputValidationLayout errors={errors} name={`hotelAgeAssignments.${index}.fromAge`}>
                    <RegisterInput
                      register={register}
                      name={`hotelAgeAssignments.${index}.fromAge`}
                      type="number"
                      className='border-none'
                    />
                  </InputValidationLayout>
                </div>
                <div>
                  <p className='text-12'>{t("price_policy.to_age")}</p>
                  <InputValidationLayout errors={errors} name={`hotelAgeAssignments`}>
                    <RegisterInput
                      register={register}
                      name={`hotelAgeAssignments.${index}.toAge`}
                      type="number"
                      className='border-none'
                    />
                  </InputValidationLayout>
                </div>
                <div>
                  <p className='text-12'>{t("price_policy.available_beds")}</p>
                  <InputValidationLayout errors={errors} name={`hotelAgeAssignments.${index}.bedType`}>
                    <RegisterSelect
                      name={`hotelAgeAssignments.${index}.bedType`}
                      options={roomBedTypeOptions}
                      register={register}
                      className='border-none'
                    />
                  </InputValidationLayout>
                </div>
              </div>
            ))}
            <Button
              variant='outline'
              onClick={() =>
                append({ name: '', fromAge: 0, toAge: 0, bedType: '' })
              }
            >
              {t("hotel_availability.add_age_range")}
            </Button>
          </div>
          <div className='flex justify-end mt-4'>
            <Button type="submit" isLoading={isLoading}>{t("buttons.save")}</Button>
          </div>
        </form>
      </BlockContainer>
    </div>
  );
};

export default AddPricePolicy;
