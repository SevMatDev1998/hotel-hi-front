import { FC, useState } from "react"
import { HotelRoomPart } from "../../../../types"
import { useTranslation } from "../../../../hooks/useTranslation";
import { Button } from "../../../../components/shared/Button";

interface RoomTypeInformationCardProps {
  hotelRoomPart: HotelRoomPart
}

const RoomTypeInformationCard: FC<RoomTypeInformationCardProps> = () => {
  const { t } = useTranslation();
  const [isBadAvailable, setIsBadAvailable] = useState(false);
  return (
    <div className="flex flex-col gap-4">

      <div className="grid grid-cols-2 mobile:grid-cols-1 gap-4">
        <div>naxasrah</div>
        <div className="flex items-center justify-center mobile:justify-start gap-2">
          <p>{t("room_bad.bed_available")}</p>
          <Button variant="checkButton" checked={isBadAvailable} onClick={() => setIsBadAvailable(true)}>
            {t("buttons.yes")}
          </Button>
          <Button variant="checkButton" onClick={() => setIsBadAvailable(false)}>
            {t("buttons.no")}
          </Button>
        </div>
      </div>
      {
        isBadAvailable &&
        <div className="grid grid-cols-2 mobile:grid-cols-1 gap-4">
          <Button variant="outline">{t("room_bad.add_base_bed")}</Button>
          <Button variant="outline">{t("room_bad.add_additional_bed")}</Button>
        </div>
      }

    </div>

  )
}

export default RoomTypeInformationCard