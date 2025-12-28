import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../../components/shared/Accordion';
import { Button } from '../../../../components/shared/Button';
import { Select } from '../../../../components/shared/Select';
import BlockContainer from '../../../public/BlockContainer';
import { useTranslation } from '../../../../hooks/useTranslation';
import { useCreateServicePricesMutation,useGetPaidServicesByHotelQuery } from '../../../../services/hotelService/hotelService.service';
import RouteEnum from '../../../../enums/route.enum';
import { PaidServiceItem } from '../../../../types';

interface ServicePriceFormData {
  hotelServiceId: number;
  hotelAvailabilityId: number;
  priceType: string;
  price: number;
  dateFrom: string;
  dateTo: string;
}

interface AddServicePricePolicyProps {
  hotelAvailabilityId?: number;
  dateFrom?: string;
  dateTo?: string;
  hotelId?: string;
}

const AddServicePricePolicy = ({ hotelAvailabilityId, dateFrom, dateTo, hotelId }: AddServicePricePolicyProps) => {
  const { t } = useTranslation();
    const navigate = useNavigate();

  const { data: paidServices, isLoading } = useGetPaidServicesByHotelQuery(
    { hotelId: Number(hotelId), availabilityId: Number(hotelAvailabilityId) },
    { skip: !hotelId || !hotelAvailabilityId }
  );
  
  
  const [createServicePrices, { isLoading: isSaving }] = useCreateServicePricesMutation();
  
  const [servicePrices, setServicePrices] = useState<Record<number, number>>({});
  const [servicePriceTypes, setServicePriceTypes] = useState<Record<number, string>>({});

  const priceTypeOptions = [
    { value: 'HourlyRate', label: 'HourlyRate' },
    { value: 'DailyRate', label: 'DailyRate' },
    { value: 'ByOrderRate', label: 'ByOrderRate' },
  ];

  const handlePriceChange = (serviceId: number, value: string) => {
    const numValue = parseFloat(value);
    setServicePrices(prev => ({
      ...prev,
      [serviceId]: isNaN(numValue) ? 0 : numValue,
    }));
  };

  const handlePriceTypeChange = (serviceId: number, priceType: string | number) => {
    setServicePriceTypes(prev => ({
      ...prev,
      [serviceId]: priceType as string,
    }));
  };

  const handleSubmit = async () => {
    
    if (!hotelAvailabilityId) {
      return;
    }
    
    const prices: ServicePriceFormData[] = [];

    paidServices?.forEach(group => {
      group.types.forEach(type => {
        type.services.forEach(service => {
          // Берём либо введённую цену, либо текущую
          const price = servicePrices[service.hotelServiceAvailabilityId] 
            ?? (service.currentPrice ? parseFloat(service.currentPrice.price) : null);
          
          // Берём либо выбранный тип, либо текущий
          const priceType = servicePriceTypes[service.hotelServiceAvailabilityId] 
            ?? service.currentPrice?.priceType;
          
          // Если есть и цена, и тип → добавляем
          if (price && price > 0 && priceType) {
            prices.push({
              hotelServiceId: service.hotelServiceId,
              hotelAvailabilityId,
              priceType,
              price,
              dateFrom:"Fri Nov 21 2025 17:39:08 GMT+0400",
              dateTo:"Fri Nov 21 2025 17:39:08 GMT+0400",
            });
          }
        });
      });
    });
    console.log(paidServices,prices);
      
    if (prices.length === 0) {
      return;
    }
    await createServicePrices({ prices }).unwrap();
    setServicePrices({});
    setServicePriceTypes({});
    navigate(`${RouteEnum.PRICE_POLICY}`);
  };

  if (isLoading) {
    return <div>{t('common.loading')}</div>;
  }

  if (!paidServices || paidServices.length === 0) {
    return 
  }

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full">
        {paidServices.map((group) => (
          <div key={group.groupId} className="mb-4">
            <BlockContainer shadow={false}>
              <AccordionItem value={`group-${group.groupId}`} className="border-none">
                <AccordionTrigger>{group.groupName}</AccordionTrigger>
                <AccordionContent>
                  <Accordion type="single" collapsible className="w-full pl-4">
                    {group.types.map((type) => (
                      <div key={type.typeId} className="mb-2">
                        <AccordionItem value={`type-${type.typeId}`} className="border-none">
                          <AccordionTrigger className="text-sm">
                            {type.typeName}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 pl-4">
                              {type.services.map((service: PaidServiceItem) => {
                                const displayPrice = servicePrices[service.hotelServiceAvailabilityId] ?? 
                                  (service.currentPrice ? parseFloat(service.currentPrice.price) : '');
                                
                                const displayPriceType = servicePriceTypes[service.hotelServiceAvailabilityId] ?? 
                                  (service.currentPrice?.priceType || '');
                                
                                return (
                                  <div key={service.hotelServiceAvailabilityId} className="flex items-center justify-between border-b pb-2 gap-2">
                                    <span className="text-sm flex-1">{service.systemServiceName}</span>
                                    <div className="flex items-center gap-2">
                                      <Select
                                        name={`priceType-${service.hotelServiceAvailabilityId}`}
                                        options={priceTypeOptions}
                                        tr_name="service_price_types"
                                        onSelect={(value) => handlePriceTypeChange(service.hotelServiceAvailabilityId, value)}
                                        value={displayPriceType}
                                        className="w-48"
                                      />
                                      <input
                                        type="number"
                                        className="w-24 px-2 py-1 border rounded"
                                        placeholder={t('price_policy.price')}
                                        value={displayPrice}
                                        onChange={(e) => handlePriceChange(service.hotelServiceAvailabilityId, e.target.value)}
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </div>
                    ))}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            </BlockContainer>
          </div>
        ))}
      </Accordion>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} isLoading={isSaving}>
          {t('buttons.save')}
        </Button>
      </div>
    </div>
  );
};

export default AddServicePricePolicy;