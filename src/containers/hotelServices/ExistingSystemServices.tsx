import { FC } from "react";
import { SystemService } from "../../types";
import { useDeleteHotelServiceMutation } from "../../services/hotelService";

interface IExistingSystemServicesProps {
  existingSystemServices: SystemService[]
}

const ExistingSystemServices: FC<IExistingSystemServicesProps> = ({ existingSystemServices }) => {

  const [deleteService] = useDeleteHotelServiceMutation()

  const hendleRemoveService = (serviceId: string) => {
    deleteService({ hotelServiceId: serviceId })
  }
  console.log(444,existingSystemServices);
  
  return (
    <div className="space-y-2">
      {existingSystemServices.map((systemService) => (
        <div key={systemService.id} className="flex justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => {hendleRemoveService(systemService.id) }}>
            <img
              src="/images/icons/remove-button-icon.svg"
              alt="add icon"
              className="cursor-pointer"
            />
            {systemService.service.name}
          </div>
          <div>
            asd
          </div>
        </div>
      ))}
    </div>

  );
};

export default ExistingSystemServices;