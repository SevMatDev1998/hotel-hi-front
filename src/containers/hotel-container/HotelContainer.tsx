import { useTranslation } from "../../hooks/useTranslation";
import BaseInfo from "./base-info/BaseInfo";

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
      <BaseInfo />
    </div>
  );
};

export default HotelContainer;