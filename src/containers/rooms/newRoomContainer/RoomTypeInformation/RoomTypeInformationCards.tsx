import { FC } from 'react';
import RoomTypeInformationCard from './RoomTypeInformationCard';
import { useGetRoomBedSizesQuery, useGetRoomBedTypesQuery } from '../../../../services/rooms';

interface RoomTypeInformationCardsProps {
  hotelRoomParts: any[];
}

const RoomTypeInformationCards: FC<RoomTypeInformationCardsProps> = ({ hotelRoomParts }) => {

    const { data: roomBedTypes } = useGetRoomBedTypesQuery();
  const { data: roomBedSizes } = useGetRoomBedSizesQuery();

  const hasRoomParts = Array.isArray(hotelRoomParts) && hotelRoomParts.length > 0;

  return (
    <div className="flex flex-col gap-4">
      {hasRoomParts && hotelRoomParts.map((roomPart) => (
        <div key={roomPart.id}>
          <RoomTypeInformationCard hotelRoomPart={roomPart} roomBedTypes={roomBedTypes} roomBedSizes={roomBedSizes} />
        </div>
      ))}
    </div>
  );
};

export default RoomTypeInformationCards;