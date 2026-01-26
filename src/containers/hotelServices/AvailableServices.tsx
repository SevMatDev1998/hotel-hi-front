import { FC } from 'react';
import { useAddHotelServiceMutation } from '../../services/hotelService';
import { SystemService } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';


interface IAvailableServicesProps {
  availableServices?: SystemService[],
  hotelId?: string
}

const AvailableServices: FC<IAvailableServicesProps> = ({ availableServices, hotelId }) => {

  const [addHotelService] = useAddHotelServiceMutation({})
  const { t } = useTranslation();

  const hendleAddHotelSevice = (serviceId: string) => {
    addHotelService({ hotelId: hotelId!, hotelServiceId: serviceId })
  }

  return (
    <div className="grid grid-cols-3 mobile:grid-cols-2 gap-3">
      {!!availableServices && availableServices?.map((service) => (
        <div key={service.id} className="flex gap-2 cursor-pointer" onClick={() => { hendleAddHotelSevice(service.id) }}>
          <img
            src="/images/icons/add-button-icon.svg"
            alt="add icon"
            className="cursor-pointer h-4 w-4"

          />
          <div>{t(`services_t.system_services.${service.name}`)}</div>
        </div>
      ))}
    </div>
  );
};

export default AvailableServices;