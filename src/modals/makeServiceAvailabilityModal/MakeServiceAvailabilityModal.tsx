import MakeServiceAvailabilityModalForm from "./MakeServiceAvailabilityModalForm";
import { useTranslation } from "../../hooks/useTranslation";
import { useGetHotelServiceAvailabilityQuery } from "../../services/hotelServiceAvailability";
import { HotelServicePeriodType } from "../../types";

interface IMakeServiceAvailabilityModalProps {
  hotelServiceId: string;
  onSubmit: (payload: any) => void;
  onCancel: () => void;
}

// Функция проверки, является ли период полным годом
const isFullYearPeriod = (startMonth: string, endMonth: string): boolean => {
  const start = new Date(startMonth);
  const end = new Date(endMonth);
  
  return (
    start.getMonth() === 0 && start.getDate() === 1 && // 1 января
    end.getMonth() === 11 && end.getDate() === 31      // 31 декабря
  );
};

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
    periodType: HotelServicePeriodType.FullYear,
    startMonth: `${new Date().getFullYear()}-01-01`,
    endMonth: `${new Date().getFullYear()}-12-31`,
    hourlyAvailabilityTypeId: isPaid ? "AllDay" : "Hours",
    startHour: isPaid ? undefined : "",
    endHour: isPaid ? undefined : "",
  });

  const availabilityData = data ? {
    availabilities: data.availabilities.map((group, index) => ({
      ...group,
      isPaid: index === 0, // Явно устанавливаем isPaid в зависимости от индекса
      periods: group.periods && group.periods.length > 0 
        ? group.periods.map(period => ({
            ...period,
            // Автоматически определяем periodType на основе дат
            periodType: isFullYearPeriod(period.startMonth, period.endMonth)
              ? HotelServicePeriodType.FullYear
              : HotelServicePeriodType.DateRange
          }))
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
    <div className="p-5 flex flex-col space-y-5 w-[950px] tablet:w-[800px] mobile:w-full">
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

