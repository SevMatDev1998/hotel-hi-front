import React, { FC, useState } from 'react';
import BlockContainer from '../../public/BlockContainer';
import FoodContainerCardForm from './FoodContainerCardForm';
import { Button } from '../../../components/shared/Button';
import { useTranslation } from 'react-i18next';
import { FoodType, HotelFood } from '../../../types';

interface IFoodContainerCardProps {
  mainFood: any
  hotelFood?: HotelFood
}

const FoodContainerCard: FC<IFoodContainerCardProps> = ({ mainFood, hotelFood }) => {
  const { t } = useTranslation();

  const [selectedFoodType, setSelectedFoodType] = useState<FoodType | null>(null);
  
  return (
    <BlockContainer>
      <div className='flex flex-col gap-4'>

        <div className='flex justify-between items-center'>
          <p>{mainFood.type}</p>
          {hotelFood ?
            <span onClick={() => setSelectedFoodType(hotelFood.foodType? hotelFood.foodType : null)}>
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
          {selectedFoodType && (
          <div>
            <FoodContainerCardForm hotelFood={hotelFood} selectedFoodType={selectedFoodType} />
          </div>
        )}
      </div>

    </BlockContainer>
  );
};

export default FoodContainerCard;