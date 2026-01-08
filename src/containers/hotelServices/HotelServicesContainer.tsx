import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/shared/Button';
import InfoBlock from '../../components/shared/InfoBlock';
import HotelSericeGroups from './HotelSericeGroups';
import useAppSelector from '../../hooks/useAppSelector';
import { useSetNavigationAccessStepMutation } from '../../services/auth';
import { useGetHotelServicesCountsQuery,useGetSystemServiceGroupsQuery } from '../../services/hotelService';
import { RouteEnum } from '../../enums/route.enum';

const HotelServicesContainer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: serviceGroups } = useGetSystemServiceGroupsQuery();
  const { user } = useAppSelector(state => state.auth);
  const [setNavigationAccessStep] = useSetNavigationAccessStepMutation();
  const { data: serviceCounts } = useGetHotelServicesCountsQuery(
    { hotelId: user?.hotelId },
    { skip: !user?.hotelId }
  );

  const handleSetNavigationAccessStep = () => {
    setNavigationAccessStep({ hotelId: user?.hotelId, stepNumber: 5 }).unwrap()
    navigate(RouteEnum.PRICE_POLICY);
  }

  const hasServices = (serviceCounts?.paidCount || 0) + (serviceCounts?.freeCount || 0) > 0;
  
  return (
    <div>
      <div className="flex flex-col gap-6">
        <h2>{t("hotel_service.services")}</h2>
        <InfoBlock text={t("You will have the opportunity to receive reservations during the mentioned period. Also to make changes through price regulation")} />
        <div className="grid grid-cols-2 mobile:grid-cols-1 gap-5">
          <div className='flex flex-col gap-2'>
            <p>{t("hotel_service.hotel_provided_services")}</p>
            <div className='flex gap-3'>
              <p>{t("hotel_service.paid_service")} {serviceCounts?.paidCount || 0}</p>
              <p>{t("hotel_service.free_service")} {serviceCounts?.freeCount || 0}</p>
            </div>
          </div>
          <div className="justify-items-end mobile:justify-items-start">
            <Button onClick={handleSetNavigationAccessStep} disabled={!hasServices}>
              {t("hotel_service.approve_services")}
            </Button>
          </div>
        </div>
        <HotelSericeGroups serviceGroups={serviceGroups} />
      </div>
    </div>
  );
};

export default HotelServicesContainer;