import { useTranslation } from "../../../hooks/useTranslation";
import BlockContainer from "../../public/BlockContainer";


interface IRoomCardProps {
  room: Partial<any>
}

const RoomCard = ({ room }: IRoomCardProps) => {

  const { t } = useTranslation();

  return (
    <BlockContainer>
      <div className="grid grid-cols-2  items-center justify-between">
        <div className="flex flex-col gap-2">
          <h3>ekonom lchi tesaranov</h3>
          <p>{t("rooms.count_main_guest")}</p>
        </div>
        <div className="grid justify-items-end gap-2">
          <img src="/images/icons/edit-icon.svg" alt="edit icon" className="cursor-pointer" />
          <p>{t("rooms.room")}{12}</p>
        </div>
      </div>
    </BlockContainer>
  );
};

export default RoomCard;