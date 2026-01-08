import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Switch } from '../../../../components/shared/Switch';
import { useTranslation } from '../../../../hooks/useTranslation';
import {
  useGetRoomPricePolicyQuery,
  useDeactivateRoomPricePolicyMutation,
  useActivateRoomPricePolicyMutation,
} from '../../../../services/pricePolicy/pricePolicy.service';
import { HotelAgeAssignment, HotelFood, HotelRoom } from '../../../../types';
import AddRoomPricePolicyForm from './addRoomPricePolicyForm/AddRoomPricePolicyFormForm';

interface IAddRoomPricePolicyCardProps {
  room: HotelRoom;
  hotelFoods?: HotelFood[];
  hotelAvailabilityAgeAssessments?: HotelAgeAssignment[];
}

const AddRoomPricePolicyCard: FC<IAddRoomPricePolicyCardProps> = ({
  room,
  hotelFoods,
  hotelAvailabilityAgeAssessments,
}) => {
  const { t } = useTranslation();
  const { hotelAvailabilityId } = useParams<{ hotelAvailabilityId: string }>();

  const [isOpen, setIsOpen] = useState(false);

  // Check if this room already has saved data
  const { data: existingData, isLoading } = useGetRoomPricePolicyQuery(
    {
      hotelAvailabilityId: hotelAvailabilityId ? parseInt(hotelAvailabilityId) : 0,
      roomId: Number(room.id),
    },
    { skip: !hotelAvailabilityId }
  );

  const [deactivate, { isLoading: isDeactivating }] = useDeactivateRoomPricePolicyMutation();
  const [activate, { isLoading: isActivating }] = useActivateRoomPricePolicyMutation();

  // Determine if data exists and is active
  const isSaved = existingData?.data?.roomPrice !== null && existingData?.data?.roomPrice !== undefined;
  const isActive = existingData?.data?.roomPrice?.isActive === true;

  const handleToggleChange = async () => {
    if (!isSaved) {
      // If not saved, force open to fill the form
      setIsOpen(true);
      return;
    }

    // If saved, toggle active/inactive
    try {
      if (isActive) {
        await deactivate({
          hotelAvailabilityId: parseInt(hotelAvailabilityId || '0'),
          roomId: Number(room.id),
        }).unwrap();
      } else {
        await activate({
          hotelAvailabilityId: parseInt(hotelAvailabilityId || '0'),
          roomId: Number(room.id),
        }).unwrap();
      }
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  return (
    <div className={`border border-ash-gray p-4 rounded-md ${!isActive && isSaved ? 'opacity-60 bg-gray-50' : ''}`}>
      <div className='flex justify-between gap-3 mb-4 items-center'>
        <div className='flex gap-2 items-center'>
          <Switch
            checked={isActive}
            onCheckedChange={handleToggleChange}
            disabled={isLoading || isDeactivating || isActivating}
          />
          <div>
            <h3 className='text-14'>
              {t(`room_class_options.${room?.roomClass?.name}`)},{room?.roomView?.name && t(`room_view_options.${room.roomView.name}`)} - {room.area} մ²
            </h3>
          </div>
        </div>
        {isSaved && (
          <span onClick={() => setIsOpen(!isOpen)}>
            <img src='/images/icons/edit-icon.svg' alt='edit icon' className='cursor-pointer' />
          </span>
        )}
      </div>
      {isOpen && (
        <AddRoomPricePolicyForm
          room={room}
          hotelFoods={hotelFoods}
          hotelAvailabilityAgeAssessments={hotelAvailabilityAgeAssessments}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default AddRoomPricePolicyCard;