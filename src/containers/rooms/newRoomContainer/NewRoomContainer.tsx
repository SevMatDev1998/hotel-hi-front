import useAppSelector from "../../../hooks/useAppSelector";
import { useTranslation } from "../../../hooks/useTranslation";
import RoomTypeDescription from "./RoomTypeDescription";
import RoomTypeInformation from "./RoomTypeInformation/RoomTypeInformation";

const NewRoomContainer = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);


  
  return (
    <div className="flex flex-col gap-6">
      <h2>{t("rooms.rooms_types")}</h2>
      <RoomTypeDescription hotelId={user?.hotelId} />
      <RoomTypeInformation hotelId={user?.hotelId} />

    </div>
  )
}

export default NewRoomContainer;