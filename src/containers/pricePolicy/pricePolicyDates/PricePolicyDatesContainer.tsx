import { useTranslation } from "react-i18next";
import InfoBlock from "../../../components/shared/InfoBlock";
import useAppSelector from "../../../hooks/useAppSelector";
import { useGetHotelAvailabilityQuery } from "../../../services/hotelAvailability/hotelAvailability.service";
import { Select } from "../../../components/shared/Select";
import { useState } from "react";
import PricePolicyDatesCalendarContainer from "./PricePolicyDatesCalendarContainer";

const PricePolicyDatesContainer = () => {

  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth)
  const { data: hotelAvailabilites } = useGetHotelAvailabilityQuery({ hotelId: user?.hotelId },{skip:!user?.hotelId})
  const [selectedAvailabilityItem, setSelectedAvailabilityItem] = useState<number | undefined>(undefined)

  const handleBedTypeChange = (e?: number) => {
    console.log(e);
    setSelectedAvailabilityItem(e)
  }


  return (
    <div className="flex flex-col gap-6">
      <h2>{t("rooms.rooms_types")}</h2>
      <InfoBlock text={t("You will have the opportunity to receive reservations during the mentioned period. Also to make changes through price regulation")} />
      <Select
        name="test"
        options={hotelAvailabilites?.map(type => ({ value: type.id, label: type.title })) || []}
        onSelect={(e) => { handleBedTypeChange(e) }}
        value={selectedAvailabilityItem}
      />
      <PricePolicyDatesCalendarContainer />
    </div>

  );
};

export default PricePolicyDatesContainer;