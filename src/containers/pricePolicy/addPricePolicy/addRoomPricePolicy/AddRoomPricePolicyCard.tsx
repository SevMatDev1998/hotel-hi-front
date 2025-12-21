import React, { FC, useState } from 'react';
import { Switch } from '../../../../components/shared/Switch';
import AddRoomPricePolicyForm from './addRoomPricePolicyForm/AddRoomPricePolicyFormForm';
import { useTranslation } from '../../../../hooks/useTranslation';
import { HotelAgeAssignment, HotelFood, HotelRoom } from '../../../../types';

interface IAddRoomPricePolicyCardProps {
  room: HotelRoom
  hotelFoods?: HotelFood[],
  hotelAvailabilityAgeAssessments?: HotelAgeAssignment[]
}

const AddRoomPricePolicyCard: FC<IAddRoomPricePolicyCardProps> = ({ room, hotelFoods, hotelAvailabilityAgeAssessments }) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  console.log(room);

  return (
    <div className='border border-ash-gray p-4 rounded-md'>
      <div className='flex gap-3 mb-4'>
        <Switch
          checked={isOpen}
          onCheckedChange={() => setIsOpen(!isOpen)}
        />
        <h3>{t(`room_class_options.${room?.roomClass?.name}`)},{room?.roomView?.name && t(`room_view_options.${room.roomView.name}`)}- {room.area}</h3>
      </div>
      {isOpen
        &&
        <AddRoomPricePolicyForm
          room={room}
          hotelFoods={hotelFoods}
          hotelAvailabilityAgeAssessments={hotelAvailabilityAgeAssessments}
          setIsOpen={setIsOpen}
        />}
    </div>
  );
};

export default AddRoomPricePolicyCard;