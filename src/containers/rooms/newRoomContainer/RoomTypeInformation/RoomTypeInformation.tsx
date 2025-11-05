import { FC } from "react";
import BlockContainer from "../../../public/BlockContainer";
import { useTranslation } from "../../../../hooks/useTranslation";
import InfoBlock from "../../../../components/shared/InfoBlock";
import { Button } from "../../../../components/shared/Button";
import useModal from "../../../../hooks/useModal";
import SelectRoomPartsModal from "../../../../modals/SelectRoomPartsModal";
import { useGetHotelRoomPartsQuery } from "../../../../services/rooms";

import RoomTypeInformationCards from "./RoomTypeInformationCards";

interface RoomTypeInformationProps {
  roomId?: string
}

const RoomTypeInformation: FC<RoomTypeInformationProps> = ({ roomId  }) => {
  const { t } = useTranslation();
  const open = useModal();


  // need to send hotelRoomId
  const { data: hotelRoomParts } = useGetHotelRoomPartsQuery({ hotelRoomId: roomId ?? "0" }, { skip: !roomId });


  const handleSubmit = (_payload: any) => {
    // handle the payload here
  };

  const handleSelectRoomParts = () => {
    open(SelectRoomPartsModal, {
      hotelRoomParts: hotelRoomParts,
      hotelRoomId: roomId ?? "0",
      onSubmit: handleSubmit,
    });
  };

  // Early returns после хуков
  if (!hotelRoomParts) return null;


  return (
    <BlockContainer shadow={false}>
      <div className="flex flex-col gap-6">
        <h2>{t("rooms.room_type_information")}</h2>
        <InfoBlock text={t("You will have the opportunity to receive reservations during the mentioned period. Also to make changes through price regulation")} />
        <Button
          variant="outline"
          onClick={() => { handleSelectRoomParts() }}
        >
          {t("rooms.add_room_part")}
        </Button>
        <div>
          <RoomTypeInformationCards hotelRoomParts={hotelRoomParts}/>
        </div>
      </div>
    </BlockContainer>
  )

}

export default RoomTypeInformation