import MakeServiceAvailabilityModalForm from "./MakeServiceAvailabilityModalForm";
import { useTranslation } from "../../hooks/useTranslation";
import { useGetHotelServiceAvailabilityQuery } from "../../services/hotelServiceAvailability";

interface IMakeServiceAvailabilityModalProps {
  hotelServiceId: string;
  onSubmit: (payload: any) => void;
  onCancel: () => void;
}

const MakeServiceAvailabilityModal: ModalFC<IMakeServiceAvailabilityModalProps> = ({
  hotelServiceId,
  onCancel,
}) => {

  const { data, isLoading } = useGetHotelServiceAvailabilityQuery(
    { hotelServiceId },
    { refetchOnMountOrArgChange: true }
  );
  const { t } = useTranslation();

  if (isLoading) return null;

  const defaultPeriod = (isPaid: boolean) => ({
    startMonth: "",
    endMonth: "",
    hourlyAvailabilityTypeId: isPaid ? "AllDay" : "Hours",
    startHour: isPaid ? undefined : "",
    endHour: isPaid ? undefined : "",
  });

  const availabilityData = data ? {
    availabilities: data.availabilities.map((group, index) => ({
      ...group,
      isPaid: index === 0, // Явно устанавливаем isPaid в зависимости от индекса
      periods: group.periods && group.periods.length > 0 
        ? group.periods 
        : [defaultPeriod(index === 0)]
    }))
  } : {
    availabilities: [
      {
        isPaid: true,
        isActive: true,
        periods: [defaultPeriod(true)],
      },
      {
        isPaid: false,
        isActive: false,
        periods: [defaultPeriod(false)],
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

