import { FC, useState } from "react"
import { Button } from "../../../../components/shared/Button";
import RoomTypeInformationCardRows from "./RoomTypeInformationCardRows";
import { useTranslation } from "../../../../hooks/useTranslation";
import { useEditHotelRoomPartBedsMutation } from "../../../../services/rooms";
import { HotelRoomPart, HotelRoomPartBed } from "../../../../types"

interface RoomTypeInformationCardProps {
  hotelRoomPart: HotelRoomPart,
}


const RoomTypeInformationCard: FC<RoomTypeInformationCardProps> = ({ hotelRoomPart }) => {

  const { t } = useTranslation();
  const [isBadAvailable, setIsBadAvailable] = useState(false);
  const [roomPartBedsState, setRoomPartBedsState] = useState<Partial<HotelRoomPartBed>[]>([]);

  const [editHotelRoomPartBeds] = useEditHotelRoomPartBedsMutation();

  const isRoomHasBeds = hotelRoomPart?.hotelRoomPartBeds && hotelRoomPart?.hotelRoomPartBeds.length > 0;

  const addHotelRoomPartBeds = (roomPartBed: Partial<HotelRoomPartBed>) => {
    setRoomPartBedsState((prev) => [
      ...prev,
      roomPartBed
    ]);
  }

  const handleRoomBadChange = () => {
    setIsBadAvailable(false);
    editHotelRoomPartBeds({ hotelRoomPartId: hotelRoomPart?.id, bedConfigurations: roomPartBedsState });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid grid-cols-2">
          <div> {t(`room_parts_options.${hotelRoomPart?.roomPart?.name}`)} </div>
          <div>
            {hotelRoomPart.hotelRoomPartBeds?.map((bed) => (
              <div key={bed.id} className="flex gap-2 text-sm">
                <p>{t(`room_bed_types.${bed.bedType}`)}</p>
                <p> {t(`room_bed_types_names_options.${bed.roomBedType.name}`)}-{bed.roomBedSize.size}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex  justify-end mobile:justify-start gap-4">
          {
            isBadAvailable ?
              <div className="flex items-center justify-center mobile:justify-start gap-2">
                <Button variant="text" onClick={() => setIsBadAvailable(false)}>
                  {t("buttons.cancel")}
                </Button>
                <Button variant="checkButton" checked={isBadAvailable} onClick={handleRoomBadChange}>
                  {t("buttons.save")}
                </Button>
              </div>
              :
              <div onClick={() => setIsBadAvailable(true)}>
                {
                  isRoomHasBeds ?
                    <img src="/images/icons/edit-icon.svg" alt="edit icon" className="cursor-pointer" />
                    :
                    <img src="/images/icons/add-button-icon.svg" alt="edit icon" className="cursor-pointer" />
                }
              </div>
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