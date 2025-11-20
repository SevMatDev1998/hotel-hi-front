import { useTranslation } from "../../hooks/useTranslation";

interface RoomInfoSectionProps {
  room: {
    name: string;
    roomClass: { name: string };
    roomView: { name: string } | null;
    mainGuestQuantity: number;
    additionalGuestQuantity: number;
    area: string;
    hotelRoomParts: Array<{
      roomPart: { name: string };
      hotelRoomPartBeds: Array<{
        roomBedType: { name: string };
        roomBedSize: { name: string };
        quantity: number;
      }>;
    }>;
  };
}

const RoomInfoSection = ({ room }: RoomInfoSectionProps) => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-bold">{room.name}</h4>
        <span className="text-sm text-gray-600">{room.area} {t("rooms.square_meters")}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <span className="text-sm text-gray-600">{t("rooms.room_class")}: </span>
          <span className="font-medium">{t(`room_class_options.${room.roomClass.name}`)}</span>
        </div>
        {room.roomView && (
          <div>
            <span className="text-sm text-gray-600">{t("rooms.room_view")}: </span>
            <span className="font-medium">{t(`room_view_options.${room.roomView.name}`)}</span>
          </div>
        )}
        <div>
          <span className="text-sm text-gray-600">{t("rooms.main_guests")}: </span>
          <span className="font-medium">{room.mainGuestQuantity}</span>
        </div>
        <div>
          <span className="text-sm text-gray-600">{t("rooms.additional_guests")}: </span>
          <span className="font-medium">{room.additionalGuestQuantity}</span>
        </div>
      </div>

      {room.hotelRoomParts && room.hotelRoomParts.length > 0 && (
        <div className="mt-3 border-t pt-3">
          <h5 className="text-sm font-semibold mb-2">{t("rooms.room_parts")}</h5>
          <div className="space-y-2">
            {room.hotelRoomParts.map((part, partIndex) => (
              <div key={partIndex} className="pl-3 border-l-2 border-blue-300">
                <div className="text-sm font-medium text-blue-700">
                  {t(`room_part_options.${part.roomPart.name}`)}
                </div>
                {part.hotelRoomPartBeds && part.hotelRoomPartBeds.length > 0 && (
                  <div className="mt-1 space-y-1">
                    {part.hotelRoomPartBeds.map((bed, bedIndex) => (
                      <div key={bedIndex} className="text-xs text-gray-600">
                        {bed.quantity}x {t(`room_bed_type_options.${bed.roomBedType.name}`)} 
                        ({t(`room_bed_size_options.${bed.roomBedSize.name}`)})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomInfoSection;
