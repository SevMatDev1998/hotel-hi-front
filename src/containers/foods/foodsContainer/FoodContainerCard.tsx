import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SegmentedControlButton from '../../../components/shared/SegmaentedControllButton';
import BlockContainer from '../../public/BlockContainer';
import FoodContainerCardForm from './FoodContainerCardForm';
import useAppSelector from '../../../hooks/useAppSelector';
import { useAddHotelFoodMutation, useGetCuisineQuery, useGetFoodOfferTypesQuery } from '../../../services/foods';
import { FoodType, HotelFood } from '../../../types';

interface IFoodContainerCardProps {
  mainFood: any;
  hotelFood?: HotelFood & {
    cuisineIds?: number[];
    foodOfferTypeIds?: number[];
  };
}

const FoodContainerCard: FC<IFoodContainerCardProps> = ({ mainFood, hotelFood }) => {
  const { t } = useTranslation();
  const [addHotelFood] = useAddHotelFoodMutation();
  const { user } = useAppSelector(state => state.auth);

  const [selectedFoodType, setSelectedFoodType] = useState<FoodType | null>(null);

  const { data: foodOfferTypes = [] } = useGetFoodOfferTypesQuery();
  const { data: cuisines = [] } = useGetCuisineQuery();


  const handleNoClick = async () => {
   await addHotelFood({
          body: {
            foodType: mainFood.type,
            startDate: '',
            endDate: '',
            cuisineIds: [],
            foodOfferTypeIds: [],
            isFoodAvailable: false,
          },
          hotelId: user?.hotelId,
        }).unwrap();
    setSelectedFoodType(null);
  };


  const isInactive = hotelFood === undefined
  const isBlockOpend = selectedFoodType === mainFood.type
    
  return (
    <BlockContainer shadow={false} className={`border-2 ${!hotelFood && !isInactive ? 'border-red-300' : 'border-white'}`}>
      <div className='flex flex-col gap-4'>
        <div className='flex justify-end items-start'>
          <div className={`flex flex-col w-full gap-3`}>
            <div className='grid grid-cols-2'>
              <h3>{t(`foods.${mainFood.type}`)}</h3>
             {!isBlockOpend && <p>{hotelFood?.startDate} - {hotelFood?.endDate}</p>} 
            </div>
            <span className={!isBlockOpend ? 'block' : 'hidden'}>
            <div className='grid grid-cols-2'>
              <p>{t("foods.food_types")}</p>
              <div className='flex gap-3'>
                {hotelFood?.cuisineIds && hotelFood.cuisineIds.map((id: number) => {
                  const cuisine = cuisines.find((c: any) => c.id === id);
                  return cuisine ? <span key={id}>{cuisine.name}</span> : null;
                })}
              </div>
            </div>
            <div className='grid grid-cols-2'>
              <p>{t("foods.delivery_methods")}</p>
              <div className='flex gap-3'>
                {hotelFood?.foodOfferTypeIds && hotelFood.foodOfferTypeIds.map((id: number) => {
                  const foodType = foodOfferTypes.find((f: any) => f.id === id);
                  return foodType ? <span key={id}>{foodType.name}</span> : null;
                })}
              </div>
            </div>
            </span>

          </div>
          <div >
            {hotelFood && hotelFood.isFoodAvailable && !selectedFoodType ? 
              <span onClick={() => setSelectedFoodType(hotelFood.foodType ? hotelFood.foodType : null)}>
                <img src="/images/icons/edit-icon.svg" alt="edit icon" className="cursor-pointer" />
              </span>
              :
              <div className="flex items-center justify-center mobile:justify-start gap-2">
                <SegmentedControlButton
                  label={t("buttons.yes")}
                  isActive={selectedFoodType === mainFood.type}
                  onClick={() => setSelectedFoodType(mainFood.type)}
                />
                <SegmentedControlButton
                  label={t("buttons.no")}
                  isActive={hotelFood && !hotelFood.isFoodAvailable && !selectedFoodType}
                  onClick={handleNoClick}
                />
              </div>
            }
          </div>
        </div>
        {selectedFoodType && (
          <div>
            <FoodContainerCardForm
              hotelFood={hotelFood}
              selectedFoodType={selectedFoodType}
              setSelectedFoodType={setSelectedFoodType}
              foodOfferTypes={foodOfferTypes}
              cuisines={cuisines}
            />
          </div>
        )}
      </div>

    </BlockContainer>
  );
};

export default FoodContainerCard;