import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAddHotelFoodMutation } from '../../../services/foods';
import { FoodType, HotelFood } from '../../../types';
import { Button } from '../../../components/shared/Button';
import CheckBox from '../../../components/shared/CheckBox';
import useAppSelector from '../../../hooks/useAppSelector';
import { useTranslation } from '../../../hooks/useTranslation';

interface IFoodContainerCardFormProps {
  hotelFood?: HotelFood;
  selectedFoodType: FoodType;
  setSelectedFoodType: (foodType: FoodType | null) => void;
  foodOfferTypes?: any[];
  cuisines?: any[];
}
interface FoodFormValues {
  foodOfferTypeIds: number[];
  cuisineIds: number[];
  startDate: string;
  endDate: string;
  foodType?: string;
}

const FoodContainerCardForm: React.FC<IFoodContainerCardFormProps> = ({ hotelFood, selectedFoodType, setSelectedFoodType, foodOfferTypes = [], cuisines = [] }) => {


  const [addHotelFood] = useAddHotelFoodMutation();
  const { user } = useAppSelector(state => state.auth);
  const { t } = useTranslation()


  const { handleSubmit, control } = useForm<FoodFormValues>({
    mode: 'onChange',
    defaultValues: {
      foodOfferTypeIds: hotelFood?.foodOfferTypeIds?.filter((id) => id !== null) || [],
      cuisineIds: hotelFood?.cuisineIds?.filter((id) => id !== null) || [],
      startDate: hotelFood?.startDate || '',
      endDate: hotelFood?.endDate || '',
    },
  });

  const onSubmit = (data: FoodFormValues) => {
    const cleanedData = {
      ...data,
      foodOfferTypeIds: data.foodOfferTypeIds.filter((id) => id !== null),
      cuisineIds: data.cuisineIds.filter((id) => id !== null),
      foodType: selectedFoodType,
    };
    addHotelFood({ body: cleanedData, hotelId: user?.hotelId }).unwrap();
    setSelectedFoodType(null);
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
      </div>
      <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
        <p >
          {t("foods.delivery_methods")}
        </p>
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
      </div>
      <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 '>
        <p>{t("foods.food_types")}</p>
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
      </div>
      <div className="flex justify-end">
        <Button type="submit">{t("buttons.save")}</Button>
      </div>
    </form>
  );
};

export default FoodContainerCardForm;
