import { useTranslation } from "react-i18next";
import InfoBlock from "../../components/shared/InfoBlock";
import BlockContainer from "../public/BlockContainer";
import NotifiacationsTable from "./notificationsTable/NotificationsTable";
import useAppSelector from "../../hooks/useAppSelector";

  
const NotificationsContainer = () => {
  const { t } = useTranslation();
  const {user} = useAppSelector(state => state.auth);
  return (
    <div>
      <h2>{t("notifications.notifications")}</h2>
      <InfoBlock text={t("You will have the opportunity to receive notifications during the mentioned period. Also to make changes through notification settings")} />
      <BlockContainer shadow={false} >
        <NotifiacationsTable hotelId={user?.hotelId} />
      </BlockContainer>
  
    </div>
  );
}
export default NotificationsContainer;