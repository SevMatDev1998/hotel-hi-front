import { useTranslation } from "../../hooks/useTranslation";
import { useGetPaidServicesByHotelQuery } from "../../services/hotelService/hotelService.service";
import { PaidServiceItem } from "../../types";

interface IMainServicesSectionProps {
  hotelId: number;
  availabilityId: number;
}

const MainServicesSection = ({ hotelId, availabilityId }: IMainServicesSectionProps) => {
  const { t } = useTranslation();
  
  const { data: paidServices, isLoading } = useGetPaidServicesByHotelQuery(
    { hotelId, availabilityId },
    { skip: !hotelId || !availabilityId }
  );
  
  if (isLoading) {
    return (
      <div className="bg-white p-4 rounded-lg border">
        <p className="text-sm text-gray-500">{t("common.loading")}</p>
      </div>
    );
  }

  if (!paidServices || paidServices.length === 0) {
    return null;
  }

  const hasAnyPrices = paidServices.some(group => 
    group.types.some(type => 
      type.services.some(service => service.currentPrice)
    )
  );

  if (!hasAnyPrices) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-lg border space-y-3">
      <h4 className="font-semibold text-base mb-3">{t("price_policy.service_prices")}</h4>
      
      {paidServices.map((group) => {
        const groupHasPrices = group.types.some(type => 
          type.services.some(service => service.currentPrice)
        );

        if (!groupHasPrices) return null;

        return (
          <div key={group.groupId} className="space-y-2">
            <h5 className="font-medium text-sm text-gray-700">{group.groupName}</h5>
            
            {group.types.map((type) => {
              const typeHasPrices = type.services.some(service => service.currentPrice);
              
              if (!typeHasPrices) return null;

              return (
                <div key={type.typeId} className="pl-3 space-y-1">
                  <h6 className="text-xs font-medium text-gray-600">{type.typeName}</h6>
                  
                  <div className="pl-3 space-y-1">
                    {type.services.map((service: PaidServiceItem) => {
                      if (!service.currentPrice) return null;

                      return (
                        <div key={service.hotelServiceAvailabilityId} className="flex justify-between items-center text-sm py-1">
                          <span className="text-gray-700">{service.systemServiceName}</span>
                          <span className="font-semibold text-blue-600">
                            {Number(service.currentPrice.price).toFixed(2)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default MainServicesSection;
