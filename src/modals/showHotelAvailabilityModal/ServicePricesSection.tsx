import { useTranslation } from "../../hooks/useTranslation";

interface ServicePrice {
  hotelService: {
    service: {
      name: string;
      systemServiceType: {
        systemServiceGroup: {
          name: string;
        };
      };
    };
    description: string | null;
  };
  price: number;
  dateFrom: string;
  dateTo: string;
}

interface ServicePricesSectionProps {
  servicePrices: ServicePrice[];
  formatDate: (date: string) => string;
}

const ServicePricesSection = ({ servicePrices, formatDate }: ServicePricesSectionProps) => {
  const { t } = useTranslation();

  if (!servicePrices || servicePrices.length === 0) return null;

  return (
    <div className="border rounded p-4">
      <h3 className="font-semibold text-lg mb-3">{t("services.services")}</h3>
      <div className="space-y-3">
        {servicePrices.map((servicePrice, index) => (
          <div key={index} className="border-l-4 border-purple-500 pl-4 py-2">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium">{servicePrice.hotelService.service.name}</div>
                {servicePrice.hotelService.description && (
                  <div className="text-sm text-gray-600">{servicePrice.hotelService.description}</div>
                )}
                <div className="text-xs text-gray-500">
                  {t("services.group")}: {servicePrice.hotelService.service.systemServiceType.systemServiceGroup.name}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-purple-600">
                  {Number(servicePrice.price).toFixed(2)} 
                </div>
                <div className="text-xs text-gray-500">
                  {formatDate(servicePrice.dateFrom)} - {formatDate(servicePrice.dateTo)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePricesSection;
