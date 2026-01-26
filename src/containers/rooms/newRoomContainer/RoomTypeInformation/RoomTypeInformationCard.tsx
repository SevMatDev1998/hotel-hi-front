import { FC, useState } from "react"
import RoomTypeInformationCardRows from "./RoomTypeInformationCardRows";
import { useTranslation } from "../../../../hooks/useTranslation";
import { HotelRoomPart, HotelRoomPartBed } from "../../../../types"
import SegmentedControlButton from "../../../../components/shared/SegmaentedControllButton";
import { useEditHotelRoomPartBedsMutation } from "../../../../services/rooms";

interface RoomTypeInformationCardProps {
  hotelRoomPart: HotelRoomPart;
  roomPartBedsState: Partial<HotelRoomPartBed>[];
  onBedsChange: (hotelRoomPartId: string, beds: Partial<HotelRoomPartBed>[]) => void;
}


const RoomTypeInformationCard: FC<RoomTypeInformationCardProps> = ({ 
  hotelRoomPart, 
  roomPartBedsState,
  onBedsChange 
}) => {

  const { t } = useTranslation();
  const [isBadAvailable, setIsBadAvailable] = useState(false);
  const [editHotelRoomPartBeds] = useEditHotelRoomPartBedsMutation();

  const isRoomHasBeds = hotelRoomPart?.hotelRoomPartBeds && hotelRoomPart?.hotelRoomPartBeds.length > 0;

  const addHotelRoomPartBeds = (roomPartBed: Partial<HotelRoomPartBed>) => {
    const updatedBeds = [...roomPartBedsState, roomPartBed];
    onBedsChange(hotelRoomPart?.id, updatedBeds);
  }

  const setRoomPartBedsState = (beds: Partial<HotelRoomPartBed>[] | ((prev: Partial<HotelRoomPartBed>[]) => Partial<HotelRoomPartBed>[])) => {
    if (typeof beds === 'function') {
      const updatedBeds = beds(roomPartBedsState);
      onBedsChange(hotelRoomPart?.id, updatedBeds);
    } else {
      onBedsChange(hotelRoomPart?.id, beds);
    }
  }

  const handleNoClick = async () => {
    // Удаляем все кровати из этой части комнаты (отправляем пустой массив)
    await editHotelRoomPartBeds({ 
      hotelRoomPartId: Number(hotelRoomPart?.id), 
      bedConfigurations: [] 
    });
    onBedsChange(hotelRoomPart?.id, []);
    setIsBadAvailable(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid grid-cols-2">
          <div> {t(`room_parts_options.${hotelRoomPart?.roomPart?.name}`)} </div>
          <div>
            {!isBadAvailable && hotelRoomPart.hotelRoomPartBeds?.map((bed) => (
              <div key={bed.id} className="flex gap-2 text-sm">
                <p>{t(`room_bed_types.${bed.bedType}`)}</p>
                <p className="whitespace-nowrap"> {t(`room_bed_types_names_options.${bed.roomBedType?.name}`)} {t("room_bad.size")} {bed.roomBedSize?.size}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex  justify-end mobile:justify-start gap-4">
          {isRoomHasBeds && !isBadAvailable ? 
            <span onClick={() => setIsBadAvailable(true)}>
              <img src="/images/icons/edit-icon.svg" alt="edit icon" className="cursor-pointer" />
            </span>
            :
            <div className="flex items-center justify-center mobile:justify-start gap-2">
              <SegmentedControlButton
                label={t("buttons.yes")}
                isActive={isBadAvailable}
                onClick={() => setIsBadAvailable(true)}
              />
              <SegmentedControlButton
                label={t("buttons.no")}
                isActive={!isRoomHasBeds && !isBadAvailable}
                onClick={handleNoClick}
              />
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