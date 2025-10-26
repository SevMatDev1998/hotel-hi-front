import BlockContainer from '../../public/BlockContainer';
import { useTranslation } from '../../../hooks/useTranslation';
import InfoBlock from '../../../components/shared/InfoBlock';
import RegisterInput from '../../../components/shared/RegisterInput';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { CreateHotelAvailabilityFormData, CreateHotelAvailabilitySchema } from '../../../yupValidation/PriceValidation';
import { useAddHotelAvailabilityMutation } from '../../../services/hotelAvailability/hotelAvailability.service';
import { Button } from '../../../components/shared/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useGetRoomBedTypesQuery } from '../../../services/rooms';
import { RegisterSelect } from '../../../components/shared/RegisterSelect';

interface IAddPricePolicyProps {
  hotelId?: string;
}

const AddPricePolicy: FC<IAddPricePolicyProps> = ({ hotelId }) => {
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
    console.log("submit data", data);

    addHotelAvailability({ body: data, hotelId }, { skip: !hotelId });
  };

  console.log(roomBedTypeOptions);

  return (
    <div>
      <BlockContainer shadow={false}>
        <form onSubmit={handleSubmit(onSubmit)}>

          <h3>{t("price_policy.price_offer_settings")}</h3>
          <InfoBlock text='Նշված ժամանակահատվածում վերապահումներ ստանալու հնարավորություն կունենաք։ Նաև գների կարգավորման միջոցով փոփոխություններ կատարել' />

          {/* Գնային առաջարկի անուն */}
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
            <div className="flex items-center gap-3 border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none">
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
            <h4 className="font-semibold mb-2">{t("hotel_availability.age_thresholds")}</h4>

            {fields.map((item, index) => (
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
                <div>
                  <p className='text-12'>{t("price_policy.defined_intervals")}</p>
                  <RegisterInput
                    register={register}
                    errors={errors}
                    name={`hotelAgeAssignments.${index}.name`}
                    type="text"
                    className='border-none'
                  />
                </div>

                <div>
                  <p className='text-12'>{t("price_policy.from_age")}</p>
                  <RegisterInput
                    register={register}
                    errors={errors}
                    name={`hotelAgeAssignments.${index}.fromAge`}
                    type="number"
                    className='border-none'
                  />
                </div>

                <div>
                  <p className='text-12'>{t("price_policy.to_age")}</p>
                  <RegisterInput
                    register={register}
                    errors={errors}
                    name={`hotelAgeAssignments.${index}.toAge`}
                    type="number"
                    className='border-none'
                  />
                </div>

                <div>
                  <p className='text-12'>{t("price_policy.available_beds")}</p>
                  <RegisterSelect
                    name={`hotelAgeAssignments.${index}.bedType`}
                    options={roomBedTypeOptions}
                    register={register}
                    // error={errors.courseId}
                    required
                    className='border-none'
                  />
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
