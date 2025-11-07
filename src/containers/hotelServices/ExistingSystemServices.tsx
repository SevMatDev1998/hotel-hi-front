import { FC } from "react";
import { SystemService } from "../../types";
import { useDeleteHotelServiceMutation } from "../../services/hotelService";
import MakeServiceAvailabilityModal from "../../modals/makeServiceAvailabilityModal/MakeServiceAvailabilityModal";
import useModal from "../../hooks/useModal";
import { Button } from "../../components/shared/Button";
import { useTranslation } from "../../hooks/useTranslation";

interface IExistingSystemServicesProps {
  existingSystemServices: SystemService[]
}

const ExistingSystemServices: FC<IExistingSystemServicesProps> = ({ existingSystemServices }) => {

  const open = useModal();
  const { t } = useTranslation();

  const [deleteService] = useDeleteHotelServiceMutation()

  const hendleRemoveService = (serviceId: string) => {
    deleteService({ hotelServiceId: serviceId })
  }

  const handleLogOut = (hotelServiceId: string) => {
    // You must provide a valid hotelRoomId (replace 0 with the actual id if available)
    open(MakeServiceAvailabilityModal, {
      hotelServiceId: hotelServiceId
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
            {systemService.service.name}
          </div>

          <div>
            <Button
              variant="textUnderline"
              color={!!systemService.hotelServiceAvailabilities?.length > 0 ? "#C69A3C" : ""}
              onClick={() => handleLogOut(systemService.id)}
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