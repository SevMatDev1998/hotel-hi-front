import React, { FC, useState } from 'react';
import BlockContainer from '../../public/BlockContainer';
import FoodContainerCardForm from './FoodContainerCardForm';
import { Button } from '../../../components/shared/Button';
import { useTranslation } from 'react-i18next';
import { FoodType, HotelFood } from '../../../types';
import { useGetCuisineQuery, useGetFoodOfferTypesQuery } from '../../../services/foods';

interface IFoodContainerCardProps {
  mainFood: any;
  hotelFood?: HotelFood & {
    cuisineIds?: number[];
    foodOfferTypeIds?: number[];
  };
}

const FoodContainerCard: FC<IFoodContainerCardProps> = ({ mainFood, hotelFood }) => {
  const { t } = useTranslation();

  const [selectedFoodType, setSelectedFoodType] = useState<FoodType | null>(null);

  const { data: foodOfferTypes = [] } = useGetFoodOfferTypesQuery();
  const { data: cuisines = [] } = useGetCuisineQuery();


  return (
    <BlockContainer>
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between items-center'>
          <div className='flex flex-col w-full gap-3'>
            <div className='grid grid-cols-2'>
              <h3>{t(`foods.${mainFood.type}`)}</h3>
              <p>{hotelFood?.startDate} - {hotelFood?.endDate}</p>
            </div>
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
          </div>
          <div>
            {hotelFood ?
              <span onClick={() => setSelectedFoodType(hotelFood.foodType ? hotelFood.foodType : null)}>
                <img src="/images/icons/edit-icon.svg" alt="edit icon" className="cursor-pointer" />
              </span>
              :
              <div className="flex items-center justify-center mobile:justify-start gap-2">
                <Button variant="checkButton" checked={selectedFoodType === mainFood.id} onClick={() => setSelectedFoodType(mainFood.type)}>
                  {t("buttons.yes")}
                </Button>
                <Button variant="checkButton" checked={selectedFoodType !== mainFood.id} onClick={() => setSelectedFoodType(null)}>
                  {t("buttons.no")}
                </Button>
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