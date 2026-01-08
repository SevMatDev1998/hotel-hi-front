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
  const isBlockOpened = selectedFoodType === mainFood.type
   
  
  return (
    <BlockContainer shadow={false} className={`border-2 ${isInactive ? 'border-red-300' : 'border-white'}`}>
      <div className='flex flex-col gap-4'>
        <div className='flex justify-end items-start'>
          <div className={`flex flex-col w-full gap-3`}>
            <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1  text-11' >
              <h3 className='text-13'>{t(`foods.${mainFood.type}`)}</h3>
             {!isBlockOpened && hotelFood?.isFoodAvailable && <p className='text-12'>{hotelFood?.startDate} - {hotelFood?.endDate}</p>} 
            </div>
            {!isBlockOpened && hotelFood && hotelFood.isFoodAvailable && (
              <>
                <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2'>
                  <p className='text-12'>{t("foods.food_types")}</p>
                  <div className='flex gap-3 flex-wrap'>
                    {hotelFood.cuisineIds && hotelFood.cuisineIds.map((id: number) => {
                      const cuisine = cuisines.find((c: any) => c.id === id);
                      return cuisine ? <span key={id} className='text-11'>{t(`cuisines.${cuisine.name}`)}</span> : null;
                    })}
                  </div>
                </div>
                <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2'>
                  <p className='text-12'>{t("foods.delivery_methods")}</p>
                  <div className='flex gap-3 flex-wrap'>
                    {hotelFood.foodOfferTypeIds && hotelFood.foodOfferTypeIds.map((id: number) => {
                      const foodType = foodOfferTypes.find((f: any) => f.id === id);
                      return foodType ? <span key={id} className='text-11'>{t(`food_offer_types.${foodType.name}`)}</span> : null;
                    })}
                  </div>
                </div>
              </>
            )}

          </div>
          <div >
            {hotelFood && hotelFood.isFoodAvailable && !selectedFoodType ? (
              <span onClick={() => setSelectedFoodType(hotelFood.foodType ? hotelFood.foodType : null)}>
                <img src="/images/icons/edit-icon.svg" alt="edit icon" className="cursor-pointer" />
              </span>
            ) : isInactive || selectedFoodType || (hotelFood && !hotelFood.isFoodAvailable) ? (
              <div className="flex items-center justify-center mobile:justify-start gap-2">
                <SegmentedControlButton
                  label={t("buttons.yes")}
                  isActive={selectedFoodType === mainFood.type}
                  onClick={() => setSelectedFoodType(mainFood.type)}
                />
                <SegmentedControlButton
                  label={t("buttons.no")}
                  isActive={hotelFood?.isFoodAvailable === false && !selectedFoodType}
                  onClick={handleNoClick}
                />
              </div>
            ) : null}
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