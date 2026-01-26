import { FC } from "react";
import { Button } from "../../components/shared/Button";
import MakeServiceAvailabilityModal from "../../modals/makeServiceAvailabilityModal/MakeServiceAvailabilityModal";
import useModal from "../../hooks/useModal";
import { useTranslation } from "../../hooks/useTranslation";
import { useDeleteHotelServiceMutation } from "../../services/hotelService";
import { SystemService } from "../../types";

interface IExistingSystemServicesProps {
  existingSystemServices: SystemService[]
  serviceTypeName: string
}

const ExistingSystemServices: FC<IExistingSystemServicesProps> = ({ existingSystemServices, serviceTypeName }) => {

  const open = useModal();
  const { t } = useTranslation();

  const [deleteService] = useDeleteHotelServiceMutation()

  const hendleRemoveService = (serviceId: string) => {
    deleteService({ hotelServiceId: serviceId })
  }

  const handleLogOut = (systemService: SystemService) => {
    open(MakeServiceAvailabilityModal, {
      hotelServiceId: systemService.id,
      serviceName: t(`services_t.system_services.${systemService.service.name}`),
      serviceTypeName: serviceTypeName,
      className: "bg-white"
    });
  };



  return (
    <div className="space-y-2">
      {existingSystemServices.map((systemService) => (
        <div key={systemService.id} className="flex justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { hendleRemoveService(systemService.id) }}>
            <img
              src="/images/icons/remove-button-icon.svg"
              alt="add icon"
              className="cursor-pointer"
            />
            <div>{t(`services_t.system_services.${systemService.service.name}`)}</div>
          </div>
          <div>
            <Button
              variant="textUnderline"
              color={!!systemService.hotelServiceAvailabilities?.length > 0 ? "#C69A3C" : ""}
              onClick={() => handleLogOut(systemService)}
            >
              {!!systemService.hotelServiceAvailabilities?.length > 0
                ? t("hotel_service.see_availability")
                : t("hotel_service.set_availability")}
            </Button>
          </div>
        </div>
      ))}
    </div>

  );
};

export default ExistingSystemServices;