import BlockContainer from '../../public/BlockContainer';
import { useTranslation } from '../../../hooks/useTranslation';
import { FC } from 'react';
import RegisterInput from '../../../components/shared/RegisterInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSelect } from '../../../components/shared/RegisterSelect';
import { Button } from '../../../components/shared/Button';
import InfoBlock from '../../../components/shared/InfoBlock';
import { UpdateHotelBaseInfoFormData, UpdateHotelBaseInfoSchema } from '../../../yupValidation/HotelValidation';
import { Country, Currency, Hotel } from '../../../types';
import { useUpdateHotelBaseInformationMutation } from '../../../services/hotel/hotel.service';

interface BaseInfoEditnoContainerProps {
  setIsEditing: (value: boolean) => void;
  hotelBaseInformationData?: Partial<Hotel> 
  countriesData?:Country[]
  currenciesData?: Currency[],
  hotelId?: string
}

const BaseInfoEditContainer: FC<BaseInfoEditnoContainerProps> = ({ setIsEditing, hotelBaseInformationData,countriesData,currenciesData, hotelId }) => {
  const { t } = useTranslation();

  const [updateHotelBaseInformation, {  isLoading }] = useUpdateHotelBaseInformationMutation()

  const { register, handleSubmit, formState: { errors } } = useForm<UpdateHotelBaseInfoFormData>({
    resolver: yupResolver(UpdateHotelBaseInfoSchema),
    defaultValues: { ...hotelBaseInformationData }
  });
  
  const onSubmit = async (data: UpdateHotelBaseInfoFormData) => {

    await updateHotelBaseInformation({ id: hotelId!, data })
  };


    const countryOptions = countriesData?.map((country) => ({
    value: country.id,
    label: country.name,
  })) || [];

  const currencyOptions = currenciesData?.map((currency) => ({
    value: currency.id,
    label: currency.name,
  })) || [];


  

  return (
    <BlockContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='text-14 text-charcoal-gray'>
          <div className='flex items-center justify-between mb-6'>
            <h3 className="">{t("hotel.hotel_base_info")}</h3>
            <span onClick={() => setIsEditing(true)}>
              <img src="/images/icons/edit-icon.svg" alt="edit icon" className="cursor-pointer" />
            </span>
          </div>
          <div className='mb-6'>

          <InfoBlock text={t("You will have the opportunity to receive reservations during the mentioned period. Also to make changes through price regulation")} />
          </div>

          <div className="space-y-4 ml-5">

            <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
              <div >
                <span >{t("hotel.hotel_name")} *</span>
              </div>
              <div >
                <RegisterInput
                  register={register}
                  errors={errors}
                  label="Hotel Name"
                  name="name"
                  type="text"
                  className='rounded-[5px]'
                />
              </div>
            </div>
            <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
              <div >
                <span >{t("hotel.hotel_address")} *</span>
              </div>
              <div className='grid grid-cols-2 mobile:grid-cols-1 gap-6'>
                <div  >
                  <RegisterSelect
                    name="countryId"
                    options={countryOptions}
                    register={register}
                    // error={errors.courseId}
                    required
                  />
                </div>
                <div className='' >
                  <RegisterInput
                    register={register}
                    errors={errors}
                    label="City"
                    name="city"
                    type="text"
                    className='rounded-[5px]'
                  />
                </div>
              </div>
            </div>
            <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
              <div >
                <span >{t("hotel.contact_person")} *</span>
              </div>
              <div  >
                <RegisterInput
                  register={register}
                  errors={errors}
                  label="Contact Person"
                  name="contactPerson"
                  type="text"
                  className='rounded-[5px]'
                />
              </div>
            </div>
            <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
              <div >
                <span >{t("hotel.phone_number")} *</span>
              </div>
              <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-4'>
                <RegisterSelect
                  name="phoneCode"
                  options={countryOptions}
                  register={register}
                  // error={errors.courseId}
                  required
                />
                <RegisterInput
                  register={register}
                  errors={errors}
                  label="Phone Number"
                  name="phoneNumber"
                  type="text"
                  className='rounded-[5px]'
                />
              </div>
            </div>
            <div className="grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center">
              <div>
                <span>{t("hotel.currency")} *</span>
              </div>
              <div className="grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-6 items-center">
                <div>
                  <RegisterSelect
                    name="currencyId"
                    options={currencyOptions}
                    register={register}
                    required
                  />
                </div>
                <div>
                  <p>Համակարգը կընդունի ձեր գնային քաղաքականությունը տվյալ արժույթով:</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-end '>
          <Button type="submit" isLoading={isLoading}>{t("buttons.save")}</Button>
        </div>
      </form>
    </BlockContainer>
  );
};

export default BaseInfoEditContainer;