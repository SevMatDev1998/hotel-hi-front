import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../../hooks/useTranslation";
import { HotelRoom } from "../../../types";
import BlockContainer from "../../public/BlockContainer";


interface IRoomCardProps {
  room: Partial<HotelRoom>
}

const RoomCard = ({ room }: IRoomCardProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <BlockContainer>
      <div className="grid grid-cols-2  items-center justify-between">
        <div className="flex flex-col gap-2">
          <h3>{t(`room_class_options.${room.roomClass.name}`)},{t(`room_view_options.${room.roomView.name}`)}- {room.area}</h3>
          <p>{t("rooms.count_main_guest")}-{room.mainGuestQuantity}</p>
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