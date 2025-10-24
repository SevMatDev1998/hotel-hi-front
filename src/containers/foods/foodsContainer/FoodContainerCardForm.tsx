import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAddHotelFoodMutation, useGetCuisineQuery, useGetFoodOfferTypesQuery } from '../../../services/foods';
import {  FoodType, HotelFood } from '../../../types';
import { Button } from '../../../components/shared/Button';
import CheckBox from '../../../components/shared/CheckBox';
import useAppSelector from '../../../hooks/useAppSelector';

interface IFoodContainerCardFormProps {
  hotelFood?: HotelFood;
  selectedFoodType: FoodType;
}

interface FoodFormValues {
  foodOfferTypeIds: number[];
  cuisineIds: number[];
  startDate: string;
  endDate: string;
  foodType?: string;
}

const FoodContainerCardForm: React.FC<IFoodContainerCardFormProps> = ({ hotelFood,selectedFoodType }) => {
  const { data: foodOfferTypes = [] } = useGetFoodOfferTypesQuery();
  const { data: cuisines = [] } = useGetCuisineQuery();
  const [addHotelFood] = useAddHotelFoodMutation();
 const { user } = useAppSelector(state => state.auth);

 console.log(hotelFood, 'hotelFood');
 

  const { handleSubmit, control } = useForm<FoodFormValues>({
    mode: 'onChange',
    defaultValues: {
      foodOfferTypeIds: hotelFood?.foodOfferTypeIds || [],
      cuisineIds: hotelFood?.cuisineIds || [],
      startDate: hotelFood?.startDate || '',
      endDate: hotelFood?.endDate ||  '',
    },
  });

  const onSubmit = (data: FoodFormValues) => {
    addHotelFood({ body: { ...data, foodType: selectedFoodType }, hotelId: user?.hotelId });
  };


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" space-y-6"
    >
      {/* --- Time Range Section --- */}
      <div >
        <div >
          <h3>Ժամանակի միջակայք</h3>
        </div>
        <div className="flex items-center gap-3 border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none ">
            
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <input
                type="time"
                {...field}
                step="60"
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

      {/* --- Food Offer Types --- */}
      <div className="space-y-3">
        <h3 >
          Սննդի տեսակ
        </h3>
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

      {/* --- Cuisine Types --- */}
      <div className="space-y-3">
        <h3>Խոհանոց</h3>
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
      <Button type="submit">Հաստատել  </Button>

      </div>
      {/* --- Submit Button --- */}
    </form>
  );
};

export default FoodContainerCardForm;
