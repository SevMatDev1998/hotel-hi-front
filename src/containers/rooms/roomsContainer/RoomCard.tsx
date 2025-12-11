import { useNavigate } from "react-router-dom";
import BlockContainer from "../../public/BlockContainer";
import { useTranslation } from "../../../hooks/useTranslation";
import { HotelRoom } from "../../../types";

interface IRoomCardProps {
  room: Partial<HotelRoom>
}

const RoomCard = ({ room }: IRoomCardProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  return (
    <BlockContainer shadow={false} className={`${!room.hotelRoomParts || room.hotelRoomParts.length === 0 ? 'border border-red-300' : ''}`}> 
      <div className="grid grid-cols-2  items-center justify-between">
        <div className="flex flex-col gap-2">
          <h3>{t(`room_class_options.${room?.roomClass?.name}`)},{room?.roomView?.name && t(`room_view_options.${room?.roomView?.name}`)}- {room.area}</h3>
          <p>{t("rooms.count_main_guest")}-{room.mainGuestQuantity}</p>
          <p>{t("rooms.count_additional_guest")}-{room.additionalGuestQuantity}</p>
        </div>
        <div className="grid justify-items-end gap-2">
          <div onClick={() => navigate(`/rooms/${room.id}`)}>
          <img src="/images/icons/edit-icon.svg" alt="edit icon" className="cursor-pointer" />
          </div>
          <p>{t("rooms.room")}-{room.roomNumberQuantity}</p>
        </div>
      </div>
    </BlockContainer>
  );
};

export default RoomCard;