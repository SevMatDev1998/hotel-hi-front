import BlockContainer from '../../public/BlockContainer';
import { Button } from '../../../components/shared/Button';
import InfoBlock from '../../../components/shared/InfoBlock';
import { FC } from 'react';
import { UpdateHotelLegalInfoFormData, UpdateHotelLegalInfoSchema } from '../../../yupValidation/HotelValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from '../../../hooks/useTranslation';
import RegisterInput from '../../../components/shared/RegisterInput';
import { RegisterSelect } from '../../../components/shared/RegisterSelect';
import { Country, Hotel } from '../../../types';
import { useUpdateHotelLegalInformationMutation } from '../../../services/hotel';
import useAppDispatch from '../../../hooks/useAppDisaptch';
import { changeHotelInfoType } from '../../../store/slices/hotel.slice';
import { useNavigate } from 'react-router-dom';
import RouteEnum from '../../../enums/route.enum';

interface ILegalInfoEditContainerProps {
  hotelLegalInformationData?: Partial<Hotel>
  hotelId?: string
  countriesData?: Country[]
}

const LegalInfoEditContainer: FC<ILegalInfoEditContainerProps> = ({ hotelLegalInformationData, countriesData, hotelId }) => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [updateHotelLegalInformation, {  isLoading }] = useUpdateHotelLegalInformationMutation()

  const { register, handleSubmit, formState: { errors } } = useForm<UpdateHotelLegalInfoFormData>({
    resolver: yupResolver(UpdateHotelLegalInfoSchema),
    defaultValues: { ...hotelLegalInformationData }
  });

  const onSubmit = async (data: UpdateHotelLegalInfoFormData) => {
    await updateHotelLegalInformation({ id: hotelId!, data }).unwrap();
    navigate(RouteEnum.ROOMS);
  };


  const countryOptions = countriesData?.map((country) => ({
    value: country.id,
    label: country.name,
  })) || [];  

  return (
    <BlockContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='text-14 text-charcoal-gray'>
          <div className='flex items-center justify-between mb-6'>
            <h3 className="">{t("hotel.hotel_legal_info")}</h3>
            <span onClick={() => dispatch(changeHotelInfoType("none"))}>
              <img src="/images/icons/edit-icon.svg" alt="edit icon" className="cursor-pointer" />
            </span>
          </div>
          <div className='mb-6'>
            <InfoBlock text={t("You will have the opportunity to receive reservations during the mentioned period. Also to make changes through price regulation")} />
          </div>
          <div className="space-y-4 ml-5">
            <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
              <div >
                <span >{t("hotel.legal_name")} *</span>
              </div>
              <div >
                <RegisterInput
                  register={register}
                  name="legalPerson"
                  type="text"
                  className='rounded-[5px]'
                  errors={errors}
                />
              </div>
            </div>
            <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
              <div >
                <span >{t("hotel.legal_address")} *</span>
              </div>
              <div className='grid grid-cols-2 mobile:grid-cols-1 gap-6'>
                <div  >
                  <RegisterSelect
                    name="registerCountryId"
                    options={countryOptions}
                    register={register}
                    errors={errors.registerCountryId}
                    className='rounded-[5px]'
                    tr_name="countries"
                  />
                </div>
                <div className='' >
                  <RegisterInput
                    register={register}
                    errors={errors}
                    name="registerCity"
                    type="text"
                    className='rounded-[5px]'
                  />
                </div>
              </div>
            </div>

            <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
              <div >
                <span >{t("hotel.tax_id")} *</span>
              </div>
              <div >
                <RegisterInput
                  register={register}
                  errors={errors}
                  name="tinNumber"
                  type="text"
                  className='rounded-[5px]'
                />
              </div>
            </div>

            <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
              <div >
                <span >{t("hotel.director")} *</span>
              </div>
              <div >
                <RegisterInput
                  register={register}
                  errors={errors}
                  name="director"
                  type="text"
                  className='rounded-[5px]'
                />
              </div>
            </div>
            
            <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
              <div >
                <span >{t("hotel.phone_number")} *</span>
              </div>
              <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-6'>
                {/* <div  >
                  <RegisterSelect
                    name="countryId"
                    options={courseOptions}
                    register={register}
                    // error={errors.courseId}
                    required
                    className='rounded-[5px]'

                  />
                </div> */}
                <div>
                  <RegisterInput
                    register={register}
                    errors={errors}
                    name="phoneNumber"
                    className='rounded-[5px]'
                  />
                </div>
              </div>
            </div>

            <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
              <div >
                <span >{t("hotel.adress_to_get_emails")} *</span>
              </div>
              <div >
                <RegisterInput
                  register={register}
                  errors={errors}
                  name="priceSendEmail"
                  type="text"
                  className='rounded-[5px]'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-end '>
          <Button type="submit" isLoading={isLoading}>{t("buttons.save")}</Button>
        </div>
      </form>
    </BlockContainer>
  )
}

export default LegalInfoEditContainer