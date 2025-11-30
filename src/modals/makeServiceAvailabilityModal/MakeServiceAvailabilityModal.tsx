import { useTranslation } from "../../hooks/useTranslation";
import { useGetHotelServiceAvailabilityQuery } from "../../services/hotelServiceAvailability";
import MakeServiceAvailabilityModalForm from "./MakeServiceAvailabilityModalForm";

interface IMakeServiceAvailabilityModalProps {
  hotelServiceId: string;
  onSubmit: (payload: any) => void;
  onCancel: () => void;
}

const MakeServiceAvailabilityModal: ModalFC<IMakeServiceAvailabilityModalProps> = ({
  hotelServiceId,
  onCancel,
}) => {

  const { data, isLoading } = useGetHotelServiceAvailabilityQuery({ hotelServiceId });
  const { t } = useTranslation();

  if (isLoading) return null;

  const availabilityData = data ?? {
    availabilities: [
      {
        isPaid: true,
        isActive: true,
        periods: [
          {
            startMonth: "",
            endMonth: "",
            hourlyAvailabilityTypeId: "AllDay",
            startHour: undefined,
            endHour: undefined,
          },
        ],
      },
      {
        isPaid: false,
        isActive: false,
        periods: [
          {
            startMonth: "",
            endMonth: "",
            hourlyAvailabilityTypeId: "Hours",
            startHour: "",
            endHour: "",
          },
        ],
      },
    ],
  };

  return (
    <div className="p-5 flex flex-col space-y-5 w-[900px]">
      <h3>{t("hotel_service.set_availability")}</h3>
      <MakeServiceAvailabilityModalForm
        hotelServiceAvailabilities={availabilityData}
        hotelServiceId={hotelServiceId}
        onCancel={onCancel}
      />
    </div>
  );
};

export default MakeServiceAvailabilityModal;

