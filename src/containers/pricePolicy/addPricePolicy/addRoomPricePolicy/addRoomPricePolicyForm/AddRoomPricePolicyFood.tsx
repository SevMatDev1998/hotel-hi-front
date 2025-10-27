import React from 'react';
import { useGetHotelFoodsByHotelIdQuery } from '../../../../../services/foods';

interface IAddRoomPricePolicyFoodProps {
  hotelId?: string | null;
}

const AddRoomPricePolicyFood: React.FC<IAddRoomPricePolicyFoodProps> = ({ hotelId }) => {

  const { data: foods, isLoading, isError } = useGetHotelFoodsByHotelIdQuery({ hotelId: hotelId || '' }, { skip: !hotelId });
  console.log(foods);
  
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading foods</p>}
      {foods && (
        <ul>
          {foods.map(food => (
            <li key={food.id}>{food.foodType}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddRoomPricePolicyFood;