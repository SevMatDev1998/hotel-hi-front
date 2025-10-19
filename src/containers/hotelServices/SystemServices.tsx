import useAppSelector from "../../hooks/useAppSelector";
import {
  useGetHotelServicesQuery,
  useGetSystemServicesByTypeIdQuery,
} from "../../services/hotelService";
import AvailableServices from "./AvailableServices";
import ExistingSystemServices from "./ExistingSystemServices";

interface Props {
  typeId: number;
}

const SystemServices = ({ typeId }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: services } = useGetSystemServicesByTypeIdQuery(
    { typeId },
    { refetchOnMountOrArgChange: true }
  );
  const { data: hotelServiceData } = useGetHotelServicesQuery({
    hotelId: user?.hotelId,
  });

  if (!services || !hotelServiceData) return null;

  
  // Extract all hotel service IDs for quick lookup
  const hotelServiceIds = hotelServiceData.map((hs) => hs.serviceId);


  const availableServices = services.filter(
    (s) => !hotelServiceIds.includes(s.id)
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Already added services */}

      {/* Services not yet added */}
      <AvailableServices availableServices={availableServices} hotelId={ user?.hotelId} />
      
      <ExistingSystemServices existingSystemServices={hotelServiceData} />
    </div>
  );
};

export default SystemServices;
