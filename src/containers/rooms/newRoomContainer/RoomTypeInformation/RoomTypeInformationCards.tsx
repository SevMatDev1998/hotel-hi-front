import { FC } from 'react';
import RoomTypeInformationCard from './RoomTypeInformationCard';

interface RoomTypeInformationCardsProps {
  hotelRoomParts: any[];
}

const RoomTypeInformationCards: FC<RoomTypeInformationCardsProps> = ({ hotelRoomParts }) => {
  const hasRoomParts = Array.isArray(hotelRoomParts) && hotelRoomParts.length > 0;

  return (
    <div className="flex flex-col gap-4">
      {hasRoomParts && hotelRoomParts.map((roomPart) => (
        <div key={roomPart.id}>
          <RoomTypeInformationCard hotelRoomPart={roomPart} />
        </div>
      ))}
    </div>
  );
};

export default RoomTypeInformationCards;