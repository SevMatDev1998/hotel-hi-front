import React, { FC, useState } from 'react';
import { HotelAgeAssignment, HotelFood, HotelRoom } from '../../../../types';
import AddRoomPricePolicyForm from './addRoomPricePolicyForm/AddRoomPricePolicyFormForm';

interface IAddRoomPricePolicyCardProps {
  room: HotelRoom
  hotelFoods?: HotelFood[],
  hotelAvailabilityAgeAssessments?: HotelAgeAssignment[]
}

const AddRoomPricePolicyCard: FC<IAddRoomPricePolicyCardProps> = ({ room, hotelFoods, hotelAvailabilityAgeAssessments }) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      <h3 className="text-lg font-medium mb-2">Room: {room.name}</h3>
      {isOpen && <AddRoomPricePolicyForm room={room} hotelFoods={hotelFoods} hotelAvailabilityAgeAssessments={hotelAvailabilityAgeAssessments} />}
    </div>
  );
};

export default AddRoomPricePolicyCard;