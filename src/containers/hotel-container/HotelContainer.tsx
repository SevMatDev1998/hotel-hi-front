import { useTranslation } from "../../hooks/useTranslation";
import BaseInfoContainer from "./base-info/BaseInfoContainer";

const HotelContainer = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("hotel.name")}</h1>
      <p>{t("user.email")} - {"sevak@gmail.com"}</p>
      <div className="flex">
        <img src="/images/icons/info-icon.svg" alt="hotel" />
        <p className="text-12">You will have the opportunity to receive reservations during the mentioned period. Also to make changes through price regulation</p>
      </div>
      <BaseInfoContainer />
    </div>
  );
};

export default HotelContainer;