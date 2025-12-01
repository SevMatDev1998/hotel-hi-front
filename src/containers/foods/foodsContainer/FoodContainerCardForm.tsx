import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller,useForm } from 'react-hook-form';
import { Button } from '../../../components/shared/Button';
import CheckBox from '../../../components/shared/CheckBox';
import useAppSelector from '../../../hooks/useAppSelector';
import { useTranslation } from '../../../hooks/useTranslation';
import { useAddHotelFoodMutation } from '../../../services/foods';
import { foodFormSchema, FoodFormType } from '../../../yupValidation/FoodValidation';
import { FoodType, HotelFood } from '../../../types';

interface IFoodContainerCardFormProps {
  hotelFood?: HotelFood & {
    cuisineIds?: number[];
    foodOfferTypeIds?: number[];
  };
  selectedFoodType: FoodType;
  setSelectedFoodType: (foodType: FoodType | null) => void;
  foodOfferTypes?: any[];
  cuisines?: any[];
}

const FoodContainerCardForm: React.FC<IFoodContainerCardFormProps> = ({ hotelFood, selectedFoodType, setSelectedFoodType, foodOfferTypes = [], cuisines = [] }) => {


  const [addHotelFood] = useAddHotelFoodMutation();
  const { user } = useAppSelector(state => state.auth);
  const { t } = useTranslation()

  const getTimeString = (value: string | Date | undefined): string => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return '';
  };

  const { handleSubmit, control, formState: { errors } } = useForm<FoodFormType>({
    mode: 'onChange',
    resolver: yupResolver(foodFormSchema),
    defaultValues: {
      foodOfferTypeIds: hotelFood?.foodOfferTypeIds?.filter((id): id is number => id !== null) || [],
      cuisineIds: hotelFood?.cuisineIds?.filter((id): id is number => id !== null) || [],
      startDate: getTimeString(hotelFood?.startDate),
      endDate: getTimeString(hotelFood?.endDate),
    },
  });

  const onSubmit = (data: FoodFormType) => {
    const cleanedData = {
      ...data,
      foodType: selectedFoodType,
      isFoodAvailable: true,
    };
    if (user?.hotelId) {
      addHotelFood({ body: cleanedData, hotelId: user.hotelId }).unwrap();
      setSelectedFoodType(null);
    }
  };


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" space-y-6"
    >
      <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center' >
        <div >
          <p >{t("foods.delivery_times")}</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none max-w-[min-content] ">
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <input
                  type="time"
                  {...field}
                  step="300"
                />
              )}
            />
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <input
                  type="time"
                  {...field}
                  step="60"
                />
              )}
            />
          </div>
          {(errors.startDate || errors.endDate) && (
            <p className="text-red-500 text-sm">
              {errors.startDate?.message || errors.endDate?.message}
            </p>
          )}
        </div>
      </div>
      <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
        <p >
          {t("foods.delivery_methods")}
        </p>
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap gap-4">
            {foodOfferTypes.map((type) => (
              <Controller
                key={type.id}
                name="foodOfferTypeIds"
                control={control}
                render={({ field }) => {
                  const isChecked = field.value.includes(type.id);
                  const toggleValue = () =>
                    isChecked
                      ? field.onChange(field.value.filter((id) => id !== type.id))
                      : field.onChange([...field.value, type.id]);
                  return (
                    <CheckBox
                      options={type}
                      isChecked={isChecked}
                      toggleValue={toggleValue}
                    />
                  );
                }}
              />
            ))}
          </div>
          {errors.foodOfferTypeIds && (
            <p className="text-red-500 text-sm">{errors.foodOfferTypeIds.message}</p>
          )}
        </div>
      </div>
      <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 '>
        <p>{t("foods.food_types")}</p>
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap gap-4">
            {cuisines.map((cuisine) => (
              <Controller
                key={cuisine.id}
                name="cuisineIds"
                control={control}
                render={({ field }) => {
                  const isChecked = field.value.includes(cuisine.id);
                  const toggleValue = () =>
                    isChecked
                      ? field.onChange(field.value.filter((id) => id !== cuisine.id))
                      : field.onChange([...field.value, cuisine.id]);
                  return (
                    <CheckBox
                      options={cuisine}
                      isChecked={isChecked}
                      toggleValue={toggleValue}
                    />
                  );
                }}
              />
            ))}
          </div>
          {errors.cuisineIds && (
            <p className="text-red-500 text-sm">{errors.cuisineIds.message}</p>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">{t("buttons.save")}</Button>
      </div>
    </form>
  );
};

export default FoodContainerCardForm;
