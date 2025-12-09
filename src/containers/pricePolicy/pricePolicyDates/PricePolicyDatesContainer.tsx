import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/shared/Button";
import InfoBlock from "../../../components/shared/InfoBlock";
// import { useGetHotelAvailabilityQuery } from "../../../services/hotelAvailability/hotelAvailability.service";
// import { Select } from "../../../components/shared/Select";
// import { useState } from "react";
import PricePolicyDatesCalendarContainer from "./pricePolicyDatesCalendar/PricePolicyDatesCalendarContainer";
import PricePolicyDatesTableContainer from "./pricePolicyDatesTable/PricePolicyDatesTableContainer";
import useAppSelector from "../../../hooks/useAppSelector";
import { useSetNavigationAccessStepMutation } from "../../../services/auth";
import { useGetHotelAvailabilityWithDatesQuery } from "../../../services/hotelAvailability/hotelAvailability.service";
import { RouteEnum } from "../../../enums/route.enum";

const PricePolicyDatesContainer = () => {
  const [setNavigationAccessStep] = useSetNavigationAccessStepMutation()
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth)
  const navigate = useNavigate();

  const { data: hotelAvailabilityWithDates } = useGetHotelAvailabilityWithDatesQuery({ hotelId: user?.hotelId! }, { skip: !user?.hotelId })


  const handleSetNavigationAccessStep = () => {
    setNavigationAccessStep({ hotelId: user?.hotelId, stepNumber: 6 }).unwrap()
    navigate(RouteEnum.HOTEL_PARTNERS);
  }


  return (
    <div className="flex flex-col gap-6">
      <InfoBlock text={t("You will have the opportunity to receive reservations during the mentioned period. Also to make changes through price regulation")} />
      {hotelAvailabilityWithDates && (
        <PricePolicyDatesCalendarContainer hotelAvailabilityWithDates={hotelAvailabilityWithDates} hotelId={user?.hotelId!} />
      )}
      <PricePolicyDatesTableContainer hotelAvailabilityWithDates={hotelAvailabilityWithDates} />

      <Button onClick={handleSetNavigationAccessStep}>
        {t("price_policy.notify_to_partners")}
      </Button>
    </div>

  );
};

export default PricePolicyDatesContainer;