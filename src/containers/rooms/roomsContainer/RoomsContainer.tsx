import { useNavigate } from "react-router";
import { Button } from "../../../components/shared/Button";
import InfoBlock from "../../../components/shared/InfoBlock";
import { useTranslation } from "../../../hooks/useTranslation";
import RoomCard from "./RoomCard";
import RouteEnum from "../../../enums/route.enum";
import { useGetHotelRoomsByHotelIdQuery } from "../../../services/rooms";
import useAppSelector from "../../../hooks/useAppSelector";

const RoomsContainer = () => {

  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.auth);
  const { t } = useTranslation();
  const { data: roomsData } = useGetHotelRoomsByHotelIdQuery({ hotelId: user?.hotelId });

  return (
    <div className="flex flex-col gap-6">
      <h2>{t("rooms.rooms_types")}</h2>
      <InfoBlock text={t("You will have the opportunity to receive reservations during the mentioned period. Also to make changes through price regulation")} />
      <div className="grid grid-cols-2 mobile:grid-cols-1">
        <div>
          <p>{t("rooms.type_of_rooms_in_the_hotel")}- {4}</p>
          <p>{t("rooms.total_number_of_rooms")}-{4}</p>
        </div>
        <div className="grid justify-items-end mobile:justify-items-start">
          <Button>{t("rooms.approved_hotel_number_of_rooms")} </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Button variant="outline" onClick={() => { navigate(`${RouteEnum.ROOMS}/create`); }}>{t("rooms.add_new_room")}</Button>
        <div className="flex flex-col gap-4">
          {roomsData?.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default RoomsContainer;