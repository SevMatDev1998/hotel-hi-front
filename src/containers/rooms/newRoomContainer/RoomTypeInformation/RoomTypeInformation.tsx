import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/shared/Button";
import InfoBlock from "../../../../components/shared/InfoBlock";
import SelectRoomPartsModal from "../../../../modals/SelectRoomPartsModal";
import BlockContainer from "../../../public/BlockContainer";
import RoomTypeInformationCards from "./RoomTypeInformationCards";
import useModal from "../../../../hooks/useModal";
import { useTranslation } from "../../../../hooks/useTranslation";
import { useGetHotelRoomPartsQuery, useBatchEditHotelRoomPartBedsMutation } from "../../../../services/rooms";
import RouteEnum from "../../../../enums/route.enum";
import { HotelRoomPartBed } from "../../../../types";

interface RoomTypeInformationProps {
  roomId?: string
}

const RoomTypeInformation: FC<RoomTypeInformationProps> = ({ roomId }) => {
  const { t } = useTranslation();
  const open = useModal();
  const navigate = useNavigate();

  const { data: hotelRoomParts } = useGetHotelRoomPartsQuery({ hotelRoomId: roomId ?? "0" }, { skip: !roomId });
  const [batchEditHotelRoomPartBeds] = useBatchEditHotelRoomPartBedsMutation();

  const [roomPartsBedsState, setRoomPartsBedsState] = useState<Record<string, Partial<HotelRoomPartBed>[]>>({});

  const handleBedsChange = (hotelRoomPartId: string, beds: Partial<HotelRoomPartBed>[]) => {
    setRoomPartsBedsState(prev => ({
      ...prev,
      [hotelRoomPartId]: beds
    }));
  };

  const handleSaveAllRoomTypes = async () => {
    try {
      // Собираем конфигурации для ВСЕХ room parts (отредактированные + существующие)
      const roomPartBeds = hotelRoomParts?.map(roomPart => {
        const editedBeds = roomPartsBedsState[roomPart.id];
        
        // Если есть отредактированные кровати, используем их
        if (editedBeds && editedBeds.length > 0) {
          const validBeds = editedBeds.filter(bed => 
            bed.bedType && bed.roomBedSizeId && bed.roomBedTypeId
          );

          // Только если есть валидные кровати, отправляем
          if (validBeds.length > 0) {
            return {
              hotelRoomPartId: Number(roomPart.id),
              bedConfigurations: validBeds.map(bed => ({
                bedType: bed.bedType!,
                roomBedSizeId: Number(bed.roomBedSizeId!),
                roomBedTypeId: Number(bed.roomBedTypeId!)
              }))
            };
          }
        }
        
        // Если не редактировали И есть существующие кровати, используем их
        if (roomPart.hotelRoomPartBeds && roomPart.hotelRoomPartBeds.length > 0) {
          return {
            hotelRoomPartId: Number(roomPart.id),
            bedConfigurations: roomPart.hotelRoomPartBeds.map(bed => ({
              bedType: bed.bedType,
              roomBedSizeId: Number(bed.roomBedSizeId!),
              roomBedTypeId: Number(bed.roomBedTypeId!)
            }))
          };
        }
        
        // Если нет кроватей вообще, НЕ отправляем этот room part
        return null;
      }).filter(item => item !== null) || [];

      if (roomPartBeds.length > 0) {
        await batchEditHotelRoomPartBeds({ roomPartBeds }).unwrap();
      }
      
      // После успешного сохранения переходим на страницу rooms
      navigate(RouteEnum.ROOMS);
    } catch (error) {
      console.error('Error saving room types:', error);
    }
  };

  const handleSelectRoomParts = () => {
    open(SelectRoomPartsModal, {
      hotelRoomParts: hotelRoomParts,
      hotelRoomId: roomId ?? "0",
      className: "w-full h-full max-w-md"
    },);
  };

  if (!hotelRoomParts) return null;


  return (
    <div>
      <BlockContainer shadow={false}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2>{t("rooms.room_type_information")}</h2>
            <Button
              onClick={handleSaveAllRoomTypes}
              disabled={!hotelRoomParts.length}
            >
              {t("rooms.save_room_types")}
            </Button>
          </div>
          <InfoBlock text={t("You will have the opportunity to receive reservations during the mentioned period. Also to make changes through price regulation")} />
          <Button
            variant="outline"
            onClick={() => { handleSelectRoomParts() }}
          >
            {t("rooms.add_room_part")}
          </Button>
          <div>
            <RoomTypeInformationCards 
              hotelRoomParts={hotelRoomParts}
              roomPartsBedsState={roomPartsBedsState}
              onBedsChange={handleBedsChange}
            />
          </div>
        </div>
      </BlockContainer>

    </div>
  )
}

export default RoomTypeInformation