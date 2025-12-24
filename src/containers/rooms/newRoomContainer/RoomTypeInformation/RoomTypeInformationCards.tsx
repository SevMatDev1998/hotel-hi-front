import { FC } from 'react';
import RoomTypeInformationCard from './RoomTypeInformationCard';
import { HotelRoomPartBed } from '../../../../types';

interface RoomTypeInformationCardsProps {
  hotelRoomParts: any[];
  roomPartsBedsState: Record<string, Partial<HotelRoomPartBed>[]>;
  onBedsChange: (hotelRoomPartId: string, beds: Partial<HotelRoomPartBed>[]) => void;
}

const RoomTypeInformationCards: FC<RoomTypeInformationCardsProps> = ({ 
  hotelRoomParts,
  roomPartsBedsState,
  onBedsChange 
}) => {
  const hasRoomParts = Array.isArray(hotelRoomParts) && hotelRoomParts.length > 0;

  return (
    <div className="flex flex-col gap-4">
      {hasRoomParts && hotelRoomParts.map((roomPart) => (
        <div key={roomPart.id}>
          <RoomTypeInformationCard 
            hotelRoomPart={roomPart}
            roomPartBedsState={roomPartsBedsState[roomPart.id] || []}
            onBedsChange={onBedsChange}
          />
        </div>
      ))}
    </div>
  );
};

export default RoomTypeInformationCards;