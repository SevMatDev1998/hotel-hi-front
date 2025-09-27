import BlockContainer from '../../public/BlockContainer';
import { useTranslation } from '../../../hooks/useTranslation';
import { FC } from 'react';
import RegisterInput from '../../../components/shared/RegisterInput';
import { useLoginMutation } from '../../../services/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSelect } from '../../../components/shared/RegisterSelect';
import { Button } from '../../../components/shared/Button';
import InfoBlock from '../../../components/shared/InfoBlock';
import { UpdateHotelBaseInfoFormData, UpdateHotelBaseInfoSchema } from '../../../yupValidation/HotelValidation';

interface BaseInfoEditnoContainerProps {
  setIsEditing: (value: boolean) => void;
}

const BaseInfoEditContainer: FC<BaseInfoEditnoContainerProps> = ({ setIsEditing }) => {
  const { t } = useTranslation();

  const [login, { isSuccess, isError, error, isLoading }] = useLoginMutation()

  const { register, handleSubmit, formState: { errors } } = useForm<UpdateHotelBaseInfoFormData>({
    resolver: yupResolver(UpdateHotelBaseInfoSchema),
  });
  const onSubmit = async (data: UpdateHotelBaseInfoFormData) => {
    
    await login(data)
  };

  const courseOptions = [
    { value: 'course1', label: 'Course 1' },
    { value: 'course2', label: 'Course 2' },
    { value: 'course3', label: 'Course 3' },
  ];


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
        <InfoBlock text={t("You will have the opportunity to receive reservations during the mentioned period. Also to make changes through price regulation")} />
        <div className="space-y-4 ml-5">
          {/* Hotel Name */}
          <div className="flex">
            <div className="w-48 flex items-center">
              <span className=" ">{t("hotel.hotel_address")} *</span>
            </div>
            <div className="flex">
              <div >
              <RegisterSelect
                name="countryId"
                options={courseOptions}
                register={register}
                // error={errors.courseId}
                required
              />
              </div>
              <div>
              <RegisterInput
                register={register}
                errors={errors}
                label="Email address"
                name="email"
                type="email"
                className='rounded-[5px]'
              />
              </div>
              <div>

              <RegisterInput
                register={register}
                errors={errors}
                label="Email address"
                name="email"
                type="email"
                className='rounded-[5px]'
              />
              </div>
            </div>
          </div>

          {/* Hotel Address */}
          <div className="flex">
            <div className="w-48 flex items-center">
              <span className="  ">{t("hotel.contact_person")} *</span>
            </div>
            <div className="flex-1">
              <RegisterInput
                register={register}
                errors={errors}
                label="Email address"
                name="email"
                type="email"
                className='rounded-[5px]'
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex">
            <div className="w-48 flex items-center">
              <span className="">{t("hotel.phone_number")} *</span>
            </div>
            <div className="flex-1 flex items-center">
              <RegisterSelect
                name="courseId"
                options={courseOptions}
                register={register}
                // error={errors.courseId}
                required
              />
              <RegisterInput
                register={register}
                errors={errors}
                label="Email address"
                name="email"
                type="email"
                className='rounded-[5px]'
              />
            </div>
          </div>

          {/* Currency */}
          <div className="flex">
            <div className="w-48 flex items-center">
              <span >{t("hotel.value")} *</span>
            </div>
            <div className="flex-1 flex items-center">
              <RegisterSelect
                name="courseId"
                options={courseOptions}
                register={register}
                // error={errors.courseId}
                required
              />
            </div>
          </div>

          {/* Logo */}

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