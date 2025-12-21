import { FC, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button } from '../../../../components/shared/Button';
import InfoBlock from '../../../../components/shared/InfoBlock';
import RegisterInput from '../../../../components/shared/RegisterInput';
import TimeInput from '../../../../components/shared/TimeInput';
import BlockContainer from '../../../public/BlockContainer';
import InputValidationLayout from '../../../../layouts/inputValidationLayout/InputValidationLayout';
import { useTranslation } from '../../../../hooks/useTranslation';
import { useUpdateHotelAvailabilityMutation } from '../../../../services/hotelAvailability/hotelAvailability.service';
import tv from '../../../../helpers/tv';

// Simplified schema for editing (no age assignments)
const EditHotelAvailabilitySchema = yup.object({
  title: yup.string().required(tv('required')),
  checkInTime: yup
    .string()
    .required(tv('required'))
    .test('before-checkout', tv("min_greater_than_max"), function (value) {
      const { checkoutTime } = this.parent;
      if (!value || !checkoutTime) return true;
      return value < checkoutTime;
    }),
  checkoutTime: yup
    .string()
    .required(tv('required'))
    .test('after-checkin', tv("min_greater_than_max"), function (value) {
      const { checkInTime } = this.parent;
      if (!value || !checkInTime) return true;
      return value > checkInTime;
    }),
});

type EditFormData = yup.InferType<typeof EditHotelAvailabilitySchema>;

interface IEditPricePolicyProps {
  availabilityData: {
    id: number;
    title: string;
    checkInTime: string;
    checkoutTime: string;
    hotelAgeAssignments?: any[];
  };
  onSuccess?: () => void;
  onCancel?: () => void;
}

const EditPricePolicy: FC<IEditPricePolicyProps> = ({ availabilityData, onSuccess, onCancel }) => {
  const { t } = useTranslation();
  const [updateHotelAvailability, { isLoading }] = useUpdateHotelAvailabilityMutation();

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<EditFormData>({
    resolver: yupResolver(EditHotelAvailabilitySchema),
    defaultValues: {
      title: '',
      checkInTime: '',
      checkoutTime: '',
    },
  });

  // Load data for editing
  useEffect(() => {
    if (availabilityData) {
      reset({
        title: availabilityData.title || '',
        checkInTime: availabilityData.checkInTime || '',
        checkoutTime: availabilityData.checkoutTime || '',
      });
    }
  }, [availabilityData, reset]);

  const onSubmit = async (data: EditFormData) => {
    try {
      await updateHotelAvailability({
        body: data as unknown as any,
        availabilityId: availabilityData.id.toString()
      }).unwrap();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Failed to update hotel availability:', error);
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

          {/* Display current age assignments (read-only) */}
          {availabilityData.hotelAgeAssignments && availabilityData.hotelAgeAssignments.length > 0 && (
            <div className='mt-4 p-4 bg-gray-50 rounded-md'>
              <p className='text-sm font-medium mb-2'>{t("price_policy.defined_intervals")}:</p>
              <div className='flex flex-col gap-2'>
                {availabilityData.hotelAgeAssignments.map((assignment: any, index: number) => (
                  <div key={index} className='text-sm flex flex-col'>
                    <p>{assignment.fromAge} - {assignment.toAge}</p>
                    <p>{t("price_policy.available_beds")}: {t(`${assignment.bedType}`)}</p>
                  </div>
                ))}
              </div>
              <p className='text-xs text-red-600 mt-2'>
                {t("price_policy.age_ranges_cannot_be_edited")}
              </p>
            </div>
          )}

          <div className='flex justify-end gap-3 mt-4'>
            {onCancel && (
              <Button
                type="button"
                variant="text"
                onClick={onCancel}
              >
                {t("buttons.cancel")}
              </Button>
            )}
            <Button type="submit" isLoading={isLoading}>
              {t("buttons.save")}
            </Button>
          </div>
        </form>
      </BlockContainer>
    </div>
  );
};

export default EditPricePolicy;
