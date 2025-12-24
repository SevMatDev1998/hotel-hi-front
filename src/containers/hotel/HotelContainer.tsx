import BaseInfo from "./base-info/BaseInfo";
import LegalInfo from "./legal-info/LegalInfo";
import useAppSelector from "../../hooks/useAppSelector";
import { useTranslation } from "../../hooks/useTranslation";

const HotelContainer = () => {
  const { t } = useTranslation();

  const { user } = useAppSelector(state => state.auth);
    
  if (!user) return <div>{t("loading")}</div>;

  return (
    <div>
      <p className="mb-4">{t("user.email")} - {user.email}</p>
      <div className="flex gap-2">
        <img src="/images/icons/info-icon.svg" alt="hotel" />
        <p className="text-12">You will have the opportunity to receive reservations during the mentioned period. Also to make changes through price regulation</p>
      </div>
      <BaseInfo user={user} />
      <LegalInfo user={user} />
    </div>
  );
};

export default HotelContainer;