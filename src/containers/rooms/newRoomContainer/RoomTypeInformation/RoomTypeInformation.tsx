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
  hotelId?: number
}

const RoomTypeInformation: FC<RoomTypeInformationProps> = ({ hotelId }) => {
  // Все хуки должны быть в начале компонента
  const { t } = useTranslation();
  const open = useModal();
  const { data: hotelRoomParts } = useGetHotelRoomPartsQuery({ hotelRoomId: hotelId ?? 0 }, { skip: !hotelId });


  // Adjust handleSubmit to accept the payload expected by the modal
  const handleSubmit = (_payload: any) => {
    // handle the payload here
  };

  const handleLogOut = () => {
    // You must provide a valid hotelRoomId (replace 0 with the actual id if available)
    open(SelectRoomPartsModal, {
      hotelRoomParts: hotelRoomParts,
      hotelRoomId: hotelId ?? 0,
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
          onClick={() => { handleLogOut() }}
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