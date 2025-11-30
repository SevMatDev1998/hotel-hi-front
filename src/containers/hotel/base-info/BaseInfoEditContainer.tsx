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
import { changeHotelInfoType } from '../../../store/slices/hotel.slice';
import useAppDispatch from '../../../hooks/useAppDisaptch';
import useAppSelector from '../../../hooks/useAppSelector';
import InputValidationLayout from '../../../layouts/inputValidationLayout/InputValidationLayout';

interface BaseInfoEditnoContainerProps {
  hotelBaseInformationData?: Partial<Hotel>
  countriesData?: Country[]
  currenciesData?: Currency[],
  hotelId?: string
}

const BaseInfoEditContainer: FC<BaseInfoEditnoContainerProps> = ({ hotelBaseInformationData, countriesData, currenciesData, hotelId }) => {
  const { t } = useTranslation();

  const [updateHotelBaseInformation, { isLoading }] = useUpdateHotelBaseInformationMutation()

  const { hotelInfoType } = useAppSelector((state) => state.hotelSlice);

  const { register, formState: { errors }, handleSubmit } = useForm<UpdateHotelBaseInfoFormData>({
    resolver: yupResolver(UpdateHotelBaseInfoSchema),
    defaultValues: { ...hotelBaseInformationData }
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: UpdateHotelBaseInfoFormData) => {
    console.log(data);

    await updateHotelBaseInformation({ id: hotelId!, data }).unwrap();
    dispatch(changeHotelInfoType("legal"));
  };


  const countryOptions = countriesData?.map((country) => ({
    value: country.id,
    label: country.name,
  })) || [];

  const currencyOptions = currenciesData?.map((currency) => ({
    value: currency.id,
    label: currency.name,
  })) || [];

  console.log(countryOptions);



  return (
    <BlockContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='text-14 text-charcoal-gray'>
          {hotelInfoType !== "base" && <div className='flex items-center justify-between mb-6'>
            <h3 >{t("hotel.hotel_base_info")}</h3>
            <span onClick={() => dispatch(changeHotelInfoType("base"))}>
              <img src="/images/icons/edit-icon.svg" alt="edit icon" className="cursor-pointer" />
            </span>
          </div>}
          <div className='mb-6'>

            <InfoBlock text={t("You will have the opportunity to receive reservations during the mentioned period. Also to make changes through price regulation")} />
          </div>

          <div className="space-y-4 ml-5">

            <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
              <div >
                <span >{t("hotel.hotel_name")} *</span>
              </div>
              <InputValidationLayout errors={errors} name="name">
                <RegisterInput
                  register={register}
                  name="name"
                  type="text"
                  className='rounded-[5px]'
                />
              </InputValidationLayout>
            </div>
            <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
              <div >
                <span >{t("hotel.hotel_address")} *</span>
              </div>
              <div className='grid grid-cols-2 mobile:grid-cols-1 gap-6'>
                <InputValidationLayout errors={errors} name="countryId">
                  <RegisterSelect
                    name="countryId"
                    options={countryOptions}
                    register={register}
                  />
                </InputValidationLayout>
                <InputValidationLayout errors={errors} name="city">
                  <RegisterInput
                    register={register}
                    name="city"
                    type="text"
                    className='rounded-[5px]'
                  />
                </InputValidationLayout>
              </div>
            </div>
            <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
              <div >
                <span >{t("hotel.contact_person")} *</span>
              </div>
              <InputValidationLayout errors={errors} name="contactPerson">
                <RegisterInput
                  register={register}
                  name="contactPerson"
                  type="text"
                  className='rounded-[5px]'
                />
              </InputValidationLayout>
            </div>
            <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
              <div >
                <span >{t("hotel.phone_number")} *</span>
              </div>
                <InputValidationLayout errors={errors} name="phoneNumber">
                  <RegisterInput
                    register={register}
                    name="phoneNumber"
                    type="text"
                    className='rounded-[5px]'
                  />
                </InputValidationLayout>
            </div>
            <div className="grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center">
              <div>
                <span>{t("hotel.curency")} *</span>
              </div>
              <div className="grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-6 items-center">
                <InputValidationLayout errors={errors} name="currencyId">
                  <RegisterSelect
                    name="currencyId"
                    options={currencyOptions}
                    register={register}
                  />
                </InputValidationLayout>
                <div>
                  <p>{t("hotel.selected_currency")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-end mt-3 '>
          <Button type="submit" isLoading={isLoading}>{t("buttons.save")}</Button>
        </div>
      </form>
    </BlockContainer>
  );
};

export default BaseInfoEditContainer;