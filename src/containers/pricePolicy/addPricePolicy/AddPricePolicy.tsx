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

interface IAddPricePolicyProps {
  hotelId?: string;
}

const AddPricePolicy: FC<IAddPricePolicyProps> = ({ hotelId }) => {
  const { t } = useTranslation();
  const [addHotelAvailability, { isLoading }] = useAddHotelAvailabilityMutation();

  const { register, handleSubmit, control, formState: { errors } } = useForm<CreateHotelAvailabilityFormData>({
    resolver: yupResolver(CreateHotelAvailabilitySchema),
    defaultValues: {
      ageThresholds: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ageThresholds",
  });

  const onSubmit = async (data: CreateHotelAvailabilityFormData) => {
    console.log(data);

    // addHotelAvailability({ body: data, hotelId }, { skip: !hotelId });
  };

  console.log(errors);

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

          {/* Ժամեր */}
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

          {/* Տարիքային շեմեր */}
          {/* Տարիքային շեմեր */}
          <div className='mt-6'>
            <h4 className="font-semibold mb-2">{t("hotel_availability.age_thresholds")}</h4>

            {fields.map((item, index) => (
              <div
                key={index}
              >
                <RegisterInput
                  register={register}
                  errors={errors}
                  name="name"
                  type="text"
                  className='rounded-[5px]'
                />

                <input
                  {...register(`ageThresholds.${index}.minAge`)}
                  type="number"
                  placeholder={t("age_threshold.min_age")}
                  className="border rounded-md px-2 py-1"
                />
                <input
                  {...register(`ageThresholds.${index}.maxAge`)}
                  type="number"
                  placeholder={t("age_threshold.max_age")}
                  className="border rounded-md px-2 py-1"
                />

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500"
                >
                  -
                </button>
              </div>
            ))}

            <Button
              variant='outline'
              onClick={() =>
                append({ minAge: 0, maxAge: 0, })
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
