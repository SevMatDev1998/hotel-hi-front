import React, { FC, useState } from 'react';
import { HotelRoom } from '../../../../types';
import AddRoomPricePolicyForm from './addRoomPricePolicyForm/AddRoomPricePolicyForm';

interface IAddRoomPricePolicyCardProps {
  room: HotelRoom
}

const AddRoomPricePolicyCard: FC<IAddRoomPricePolicyCardProps> = ({ room }) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      <h3 className="text-lg font-medium mb-2">Room: {room.name}</h3>
      { isOpen && <AddRoomPricePolicyForm roomId={room.id} /> }
    </div>
  );
};

export default AddRoomPricePolicyCard;