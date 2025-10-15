import { FC, useState } from "react"
import { HotelRoomPart, HotelRoomPartBed, RoomBedSize, RoomBedType } from "../../../../types"
import { useTranslation } from "../../../../hooks/useTranslation";
import { Button } from "../../../../components/shared/Button";
import RoomTypeInformationCardRows from "./RoomTypeInformationCardRows";
import { useGetHotelRoomPartBedsByPartIdQuery } from "../../../../services/rooms";

interface RoomTypeInformationCardProps {
  hotelRoomPart: HotelRoomPart,
  roomBedTypes?: RoomBedType[],
  roomBedSizes?: RoomBedSize[]
}


const RoomTypeInformationCard: FC<RoomTypeInformationCardProps> = ({ hotelRoomPart, roomBedTypes, roomBedSizes }) => {
  const { t } = useTranslation();
  const [isBadAvailable, setIsBadAvailable] = useState(false);

  const { data: hotelRoomPartBeds } = useGetHotelRoomPartBedsByPartIdQuery({ roomPartId: hotelRoomPart?.id });

  const [hotelRoomPartBedsState, setHotelRoomPartBedsState] = useState<Partial<HotelRoomPartBed>[]>(hotelRoomPartBeds || []);

  const isRoomHasBeds = hotelRoomPart?.beds && hotelRoomPart?.beds.length > 0;




  const addHotelRoomPartBeds = (roomPartBed: Partial<HotelRoomPartBed>) => {
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
        <div>{t(`room_parts.${hotelRoomPart?.roomPart?.name}`)}</div>
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