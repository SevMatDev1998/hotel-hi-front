import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Button } from '../../../../components/shared/Button';
import InfoBlock from '../../../../components/shared/InfoBlock';
import RegisterInput from '../../../../components/shared/RegisterInput';
import { RegisterSelect } from '../../../../components/shared/RegisterSelect';
import TimeInput from '../../../../components/shared/TimeInput';
import BlockContainer from '../../../public/BlockContainer';
import InputValidationLayout from '../../../../layouts/inputValidationLayout/InputValidationLayout';
import { useTranslation } from '../../../../hooks/useTranslation';
import { useAddHotelAvailabilityMutation } from '../../../../services/hotelAvailability/hotelAvailability.service';
import { CreateHotelAvailabilityFormData, CreateHotelAvailabilitySchema } from '../../../../yupValidation/HotelAvailabilityValidation';
import { HotelAvailability } from '../../../../types';

interface IAddPricePolicyProps {
  hotelId?: string;
  onSuccess?: (data: HotelAvailability) => void;
}

const AddPricePolicy: FC<IAddPricePolicyProps> = ({ hotelId, onSuccess }) => {
  const { t } = useTranslation();
  const [addHotelAvailability, { isLoading }] = useAddHotelAvailabilityMutation();


  // Используем значения из enum BedType, чтобы соответствовать валидации и бэкенду
  const roomBedTypeOptions = [
    { value: 'Main', label: 'Main' },
    { value: 'Cradle', label: 'Cradle' },
    { value: 'Additional', label: 'Additional' },
  ];

  const { register, handleSubmit, control, formState: { errors } } = useForm<CreateHotelAvailabilityFormData>({
    resolver: yupResolver(CreateHotelAvailabilitySchema),
    defaultValues: {
      hotelAgeAssignments: [{ fromAge: 0, toAge: 180, bedType: "Cradle" }],
    },
  });

  const { fields, remove, update, insert } = useFieldArray({
    control,
    name: "hotelAgeAssignments",
  });

  const handleAddAgeRange = () => {
    const lastIndex = fields.length - 1;
    // Все существующие (кроме последнего) становятся 0-0
    fields.forEach((field, index) => {
      if (index !== lastIndex) {
        update(index, {
          fromAge: 0,
          toAge: 0,
          bedType: field.bedType,
        });
      }
    });

    // Вставляем новую строку 0-0 ПЕРЕД последней (которая остаётся 0-180)
    insert(lastIndex, { fromAge: 0, toAge: 0, bedType: "Cradle" });
  };

  const onSubmit = async (data: CreateHotelAvailabilityFormData) => {
    if (!hotelId) return;
    console.log(data);

    try {
      const result = await addHotelAvailability({ body: data as unknown as HotelAvailability, hotelId }).unwrap();
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (error) {
      console.error('Failed to create hotel availability:', error);
    }
  };



  return (
    <div>
      <BlockContainer shadow={false}>
        <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
          <h3>{t("price_policy.price_offer_settings")}</h3>
          <InfoBlock text='Նշված ժամանակահատվածում վերապահումներ ստանալու հնարավորություն կունենաք։ Նաև գների կարգավորման միջոցով փոփոխություններ կատարել' />
          <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
            <div><span>{t("hotel_availability.price_offer_name")} *</span></div>
            <InputValidationLayout errors={errors} name="title">
              <RegisterInput
                register={register}
                name="title"
                type="text"
                className='rounded-[5px]'
              />
            </InputValidationLayout>
          </div>
          <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center mt-4'>
            <div><span>{t("hotel_availability.arrival_and_departure_times")} *</span></div>
            <div className="flex flex-col">
              <div className="flex items-center gap-3 border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none max-w-[min-content]">
                <Controller
                  name="checkInTime"
                  control={control}
                  render={({ field }) => <TimeInput value={field.value || ''} onChange={field.onChange} />}
                />
                <Controller
                  name="checkoutTime"
                  control={control}
                  render={({ field }) => <TimeInput value={field.value || ''} onChange={field.onChange} />}
                />
              </div>
              {(errors.checkInTime || errors.checkoutTime) && (
                <span className="text-red-700 mt-1 font-medium">
                  {errors.checkInTime?.message || errors.checkoutTime?.message}
                </span>
              )}
            </div>
          </div>
          <div className='flex flex-col gap-3 mt-6'>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className='flex items-center'
              >
                <div onClick={() => { if (fields.length > 1) remove(index) }}>
                  <img
                    src="/images/icons/remove-button-icon.svg"
                    alt="add icon"
                    className={fields.length > 1 ? "cursor-pointer" : "cursor-not-allowed opacity-50"}
                  />
                </div>
                <p className='text-12'>{t("price_policy.defined_intervals")}</p>
                <div>
                  <p className='text-12'>{t("price_policy.from_age")}</p>
                  <RegisterInput
                    register={register}
                    name={`hotelAgeAssignments.${index}.fromAge`}
                    type="number"
                    className='border-none'
                  />
                  {errors.hotelAgeAssignments?.[index]?.fromAge && (
                    <p className="text-[10px] text-red-700">
                      {errors.hotelAgeAssignments[index]?.fromAge?.message}
                    </p>
                  )}
                </div>
                <div>
                  <p className='text-12'>{t("price_policy.to_age")}</p>
                  <RegisterInput
                    register={register}
                    name={`hotelAgeAssignments.${index}.toAge`}
                    type="number"
                    className='border-none'
                  />
                  {errors.hotelAgeAssignments?.[index]?.toAge && (
                    <p className="text-[10px] text-red-700">
                      {errors.hotelAgeAssignments[index]?.toAge?.message}
                    </p>
                  )}
                </div>
                <div>
                  <p className='text-12'>{t("price_policy.available_beds")}</p>
                  <RegisterSelect
                    name={`hotelAgeAssignments.${index}.bedType`}
                    options={roomBedTypeOptions}
                    register={register}
                    className='border-none'
                  />
                  {errors.hotelAgeAssignments?.[index]?.bedType && (
                    <p className="text-[10px] text-red-700">
                      {errors.hotelAgeAssignments[index]?.bedType?.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
            <Button
              variant='outline'
              onClick={handleAddAgeRange}
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
