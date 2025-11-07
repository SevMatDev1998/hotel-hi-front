import InfoBlock from '../../components/shared/InfoBlock';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/shared/Button';
import { useGetSystemServiceGroupsQuery } from '../../services/hotelService';
import HotelSericeGroups from './HotelSericeGroups';

const HotelServicesContainer = () => {
  const { t } = useTranslation();
  const { data: serviceGroups } = useGetSystemServiceGroupsQuery();

  return (
    <div>
      <div className="flex flex-col gap-6">
        <h2>{t("hotel_service.services")}</h2>
        <InfoBlock text={t("You will have the opportunity to receive reservations during the mentioned period. Also to make changes through price regulation")} />
        <div className="grid grid-cols-2 mobile:grid-cols-1 gap-5">
          <div className='flex flex-col gap-2'>
            <p>{t("hotel_service.hotel_provided_services")}</p>
            <div className='flex gap-3'>
              <p>{t("hotel_service.paid_service")}- {4}</p>
              <p>{t("hotel_service.free_service")}-{4}</p>
            </div>
          </div>

          <div className=" justify-items-end mobile:justify-items-start">
            <Button>{t("hotel_service.approve_services")} </Button>
          </div>
        </div>
        <HotelSericeGroups serviceGroups={serviceGroups} />
      </div>
    </div>
  );
};

export default HotelServicesContainer;