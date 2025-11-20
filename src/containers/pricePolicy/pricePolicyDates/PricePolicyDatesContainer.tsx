import { useTranslation } from "react-i18next";
import InfoBlock from "../../../components/shared/InfoBlock";
import useAppSelector from "../../../hooks/useAppSelector";
// import { useGetHotelAvailabilityQuery } from "../../../services/hotelAvailability/hotelAvailability.service";
// import { Select } from "../../../components/shared/Select";
// import { useState } from "react";
import PricePolicyDatesCalendarContainer from "./pricePolicyDatesCalendar/PricePolicyDatesCalendarContainer";
import { useGetHotelAvailabilityWithDatesQuery } from "../../../services/hotelAvailability/hotelAvailability.service";
import PricePolicyDatesTableContainer from "./pricePolicyDatesTable/PricePolicyDatesTableContainer";
import { Button } from "../../../components/shared/Button";
import { useSetNavigationAccessStepMutation } from "../../../services/auth";

const PricePolicyDatesContainer = () => {
  const [setNavigationAccessStep] = useSetNavigationAccessStepMutation()
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth)

  const { data: hotelAvailabilityWithDates } = useGetHotelAvailabilityWithDatesQuery({ hotelId: user?.hotelId! }, { skip: !user?.hotelId })

  
  return (
    <div className="flex flex-col gap-6">
      <h2>{t("rooms.rooms_types")}</h2>
      <InfoBlock text={t("You will have the opportunity to receive reservations during the mentioned period. Also to make changes through price regulation")} />
      {hotelAvailabilityWithDates && (
        <PricePolicyDatesCalendarContainer hotelAvailabilityWithDates={hotelAvailabilityWithDates} hotelId={user?.hotelId!} />
      )}
      <PricePolicyDatesTableContainer hotelAvailabilityWithDates={hotelAvailabilityWithDates} />

      <Button onClick={() => setNavigationAccessStep({ hotelId: user?.hotelId, stepNumber: 6 })}>
        {t("price_policy.notify_to_partners")}
      </Button>
    </div>

  );
};

export default PricePolicyDatesContainer;