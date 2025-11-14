import { useTranslation } from "../../hooks/useTranslation";

interface AdditionalService {
  serviceName: string;
  hotelService: {
    service: {
      name: string;
    };
  };
  hotelRoom: {
    name: string;
  } | null;
  isTimeLimited: boolean;
  startTime: string | null;
  price: number | null;
  percentage: number | null;
}

interface AdditionalServicesSectionProps {
  additionalServices: AdditionalService[];
  formatTime: (date: string) => string;
}

const AdditionalServicesSection = ({ additionalServices, formatTime }: AdditionalServicesSectionProps) => {
  const { t } = useTranslation();

  if (!additionalServices || additionalServices.length === 0) return null;

  return (
    <div className="border rounded p-4">
      <h3 className="font-semibold text-lg mb-3">{t("services.additional_services")}</h3>
      <div className="space-y-3">
        {additionalServices.map((additionalService, index) => (
          <div key={index} className="border-l-4 border-orange-500 pl-4 py-2">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-medium">{additionalService.serviceName}</div>
                <div className="text-sm text-gray-600">
                  {additionalService.hotelService.service.name}
                </div>
                {additionalService.hotelRoom && (
                  <div className="text-xs text-gray-500">
                    {t("rooms.room")}: {additionalService.hotelRoom.name}
                  </div>
                )}
                {additionalService.isTimeLimited && additionalService.startTime && (
                  <div className="text-xs text-gray-500">
                    {t("services.time_limited")}: {formatTime(additionalService.startTime)}
                  </div>
                )}
              </div>
              <div className="text-right">
                {additionalService.price && (
                  <div className="text-lg font-bold text-orange-600">
                    {Number(additionalService.price).toFixed(2)}
                  </div>
                )}
                {additionalService.percentage && (
                  <div className="text-sm text-orange-600">
                    {additionalService.percentage}%
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdditionalServicesSection;
