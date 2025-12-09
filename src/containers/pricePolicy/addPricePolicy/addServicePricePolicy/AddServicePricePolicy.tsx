import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../../components/shared/Accordion';
import { Button } from '../../../../components/shared/Button';
import BlockContainer from '../../../public/BlockContainer';
import { useTranslation } from '../../../../hooks/useTranslation';
import { useCreateServicePricesMutation,useGetPaidServicesByHotelQuery } from '../../../../services/hotelService/hotelService.service';
import { PaidServiceItem } from '../../../../types';

interface ServicePriceFormData {
  hotelServiceId: number;
  hotelAvailabilityId: number;
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
  
  const { data: paidServices, isLoading } = useGetPaidServicesByHotelQuery(
    { hotelId: Number(hotelId), availabilityId: Number(hotelAvailabilityId) },
    { skip: !hotelId || !hotelAvailabilityId }
  );
  
  
  const [createServicePrices, { isLoading: isSaving }] = useCreateServicePricesMutation();
  
  const [servicePrices, setServicePrices] = useState<Record<number, number>>({});

  const handlePriceChange = (serviceId: number, value: string) => {
    const numValue = parseFloat(value);
    setServicePrices(prev => ({
      ...prev,
      [serviceId]: isNaN(numValue) ? 0 : numValue,
    }));
  };

  const handleSubmit = async () => {
    console.log(hotelAvailabilityId || !dateFrom || !dateTo);
    
    if (!hotelAvailabilityId) {
      return;
    }

    const prices: ServicePriceFormData[] = [];

    paidServices?.forEach(group => {
      group.types.forEach(type => {
        type.services.forEach(service => {
          const price = servicePrices[service.hotelServiceAvailabilityId];
          if (price && price > 0) {
            prices.push({
              hotelServiceId: service.hotelServiceId,
              hotelAvailabilityId,
              price,
              dateFrom:"Fri Nov 21 2025 17:39:08 GMT+0400",
              dateTo:"Fri Nov 21 2025 17:39:08 GMT+0400",
            });
          }
        });
      });
    });

    if (prices.length === 0) {
      return;
    }

    await createServicePrices({ prices }).unwrap();
    setServicePrices({});
  };

  if (isLoading) {
    return <div>{t('common.loading')}</div>;
  }

  if (!paidServices || paidServices.length === 0) {
    return (
      <BlockContainer>
        <p>{t('price_policy.no_paid_services')}</p>
      </BlockContainer>
    );
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
                                
                                return (
                                  <div key={service.hotelServiceAvailabilityId} className="flex items-center justify-between border-b pb-2">
                                    <span className="text-sm">{service.systemServiceName}</span>
                                    <div className="flex items-center gap-2">
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