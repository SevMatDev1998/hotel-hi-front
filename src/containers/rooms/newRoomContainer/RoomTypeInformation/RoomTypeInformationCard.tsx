import { FC, useState } from "react"
import { HotelRoomPart } from "../../../../types"
import { useTranslation } from "../../../../hooks/useTranslation";
import { Button } from "../../../../components/shared/Button";
import RoomTypeInformationCardRows, { RoomPartBedWithRowIndex } from "./RoomTypeInformationCardRows";
import { useEditHotelRoomPartBedsMutation } from "../../../../services/rooms";

interface RoomTypeInformationCardProps {
  hotelRoomPart: HotelRoomPart,
}


const RoomTypeInformationCard: FC<RoomTypeInformationCardProps> = ({ hotelRoomPart }) => {

  const { t } = useTranslation();
  const [isBadAvailable, setIsBadAvailable] = useState(false);
  const [roomPartBedsState, setRoomPartBedsState] = useState<RoomPartBedWithRowIndex[]>([]);

  const [editHotelRoomPartBedsMutation] = useEditHotelRoomPartBedsMutation();

  const isRoomHasBeds = hotelRoomPart?.beds && hotelRoomPart?.beds.length > 0;

  const addHotelRoomPartBeds = (roomPartBed:RoomPartBedWithRowIndex ) => {
    setRoomPartBedsState((prev) => [
      ...prev,
      roomPartBed
    ]);
  }

  const handleRoomBadChange = () => {
    setIsBadAvailable(false);
    editHotelRoomPartBedsMutation({hotelRoomPartId: hotelRoomPart?.id, bedConfigurations: roomPartBedsState});
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
          roomPartBedsState={roomPartBedsState}
          setRoomPartBedsState={setRoomPartBedsState}
          roomPartId={hotelRoomPart?.id}
          hendelAddHotelRoomPartBeds={addHotelRoomPartBeds}
        />
      }
    </div>
  )
}

export default RoomTypeInformationCard