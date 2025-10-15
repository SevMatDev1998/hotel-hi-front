import { FC, useState } from "react"
import { HotelRoomPart, RoomBedSize, RoomBedType } from "../../../../types"
import { useTranslation } from "../../../../hooks/useTranslation";
import { Button } from "../../../../components/shared/Button";
import RoomTypeInformationCardRows from "./RoomTypeInformationCardRows";
import { useGetHotelRoomPartBedsByPartIdQuery } from "../../../../services/rooms";

interface RoomTypeInformationCardProps {
  roomPart: HotelRoomPart,
  roomBedTypes: RoomBedType[],
  roomBedSizes: RoomBedSize[]
}

type RoomPartBedType = {
  bedType: string;
  roomBedSizeId: number;
  roomBedTypeId: number;
}

const RoomTypeInformationCard: FC<RoomTypeInformationCardProps> = ({ roomPart, roomBedTypes, roomBedSizes }) => {
  const { t } = useTranslation();
  const [isBadAvailable, setIsBadAvailable] = useState(false);
  const { data: hotelRoomPartBeds } = useGetHotelRoomPartBedsByPartIdQuery({ roomPartId: roomPart.id });

  const [hotelRoomPartBedsState, setHotelRoomPartBedsState] = useState<RoomPartBedType[]>(hotelRoomPartBeds || []);

  const isRoomHasBeds = roomPart.beds && roomPart.beds.length > 0;




  const addHotelRoomPartBeds = (roomPartBed: RoomPartBedType) => {
    setHotelRoomPartBedsState((prev) => [
      ...prev,
      roomPartBed
    ]);
  }

  const handleRoomBadChange = () => {
    setIsBadAvailable(false);
  }


  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div>{t(`room_parts.${roomPart.roomPart.name}`)}</div>
        <div className="flex  justify-end mobile:justify-start gap-4">
          <p>{t("room_bad.bed_available")}</p>
          {
            isBadAvailable ?
              <div className="flex items-center justify-center mobile:justify-start gap-2">
                <Button variant="checkButton" checked={isBadAvailable} onClick={handleRoomBadChange}>
                  {t("buttons.save")}
                </Button>
                <Button variant="checkButton" onClick={() => setIsBadAvailable(false)}>
                  {t("buttons.cancel")}
                </Button>
              </div>
              :
              <Button variant="checkButton" checked={isBadAvailable} onClick={() => setIsBadAvailable(true)}>
                {isRoomHasBeds ? t("buttons.change") : t("buttons.add")}
              </Button>
          }
        </div>

      </div>
      {
        isBadAvailable &&
        <RoomTypeInformationCardRows
          hotelRoomPartBeds={hotelRoomPartBedsState}
          hendelAddHotelRoomPartBeds={addHotelRoomPartBeds}

          roomBedTypes={roomBedTypes}
          roomBedSizes={roomBedSizes}
        />

      }

    </div>

  )
}

export default RoomTypeInformationCard