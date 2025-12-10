import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/shared/Button";
import InfoBlock from "../../../../components/shared/InfoBlock";
import SelectRoomPartsModal from "../../../../modals/SelectRoomPartsModal";
import BlockContainer from "../../../public/BlockContainer";
import RoomTypeInformationCards from "./RoomTypeInformationCards";
import useModal from "../../../../hooks/useModal";
import { useTranslation } from "../../../../hooks/useTranslation";
import { useGetHotelRoomPartsQuery } from "../../../../services/rooms";
import RouteEnum from "../../../../enums/route.enum";

interface RoomTypeInformationProps {
  roomId?: string
}

const RoomTypeInformation: FC<RoomTypeInformationProps> = ({ roomId }) => {
  const { t } = useTranslation();
  const open = useModal();
  const navigate = useNavigate();

  const { data: hotelRoomParts } = useGetHotelRoomPartsQuery({ hotelRoomId: roomId ?? "0" }, { skip: !roomId });

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
              onClick={() => { navigate(RouteEnum.ROOMS) }}
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
            <RoomTypeInformationCards hotelRoomParts={hotelRoomParts} />
          </div>
        </div>
      </BlockContainer>

    </div>
  )
}

export default RoomTypeInformation