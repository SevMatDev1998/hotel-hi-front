import AvailableServices from "./AvailableServices";
import ExistingSystemServices from "./ExistingSystemServices";
import useAppSelector from "../../hooks/useAppSelector";
import {
  useGetHotelServicesQuery,
  useGetSystemServicesByTypeIdQuery,
} from "../../services/hotelService";

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
    serviceTypeId: typeId
  });

  if (!services || !hotelServiceData) return null;


  return (
    <div className="flex flex-col gap-4">
      <AvailableServices availableServices={services} hotelId={user?.hotelId} />
      <ExistingSystemServices existingSystemServices={hotelServiceData} />
    </div>
  );
};

export default SystemServices;
