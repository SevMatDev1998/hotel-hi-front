import React, { useEffect, useState } from "react";
import CardContainer from "../../../../public/CardContainer";
import CheckBox from "../../../../../components/shared/CheckBox";
import { Switch } from "../../../../../components/shared/Switch";
import { useTranslation } from "../../../../../hooks/useTranslation";
import { useGetAdditionalServicesQuery } from "../../../../../services/hotelService";
import { CreateOtherServiceDto } from "../../../../../types/pricePolicyDto";
import useAppSelector from "../../../../../hooks/useAppSelector";
import Input from "../../../../../components/shared/Input";

interface IAddRoomPricePolicyAdditionalServicesFormProps {
  onChange: (data: Omit<CreateOtherServiceDto, 'hotelAvailabilityId' | 'hotelRoomId'>[]) => void;
  initialData?: any[];
  hotelAvailabilityId?: number;
}

const AddRoomPricePolicyAdditionalServicesForm: React.FC<IAddRoomPricePolicyAdditionalServicesFormProps> = ({ 
  onChange,
  initialData,
  hotelAvailabilityId
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: additionalServicesData = [] } = useGetAdditionalServicesQuery({ 
    hotelId: user?.hotelId,
    availabilityId: hotelAvailabilityId
  });
  const { t } = useTranslation();

  // ✅ Backend уже фильтрует, показываем все что пришло
  const services = Array.isArray(additionalServicesData) ? additionalServicesData : [];

  // ✅ Create state indexed by serviceId (clean scalable structure)
  const [values, setValues] = useState<Record<number, { enabled: boolean; price: string; isNotFixed: boolean }>>({});

  // ✅ Initialize state when relevant services are fetched
  useEffect(() => {
    if (!services.length) return;

    setValues(prev => {
      const updated = { ...prev };
      services.forEach(s => {
        if (!updated[s.id]) {
          updated[s.id] = { enabled: false, price: "", isNotFixed: false };
        }
      });
      return updated;
    });
  }, [services]);

  useEffect(() => {
    if (initialData && initialData.length > 0 && services.length > 0) {
      setValues(prev => {
        const updated = { ...prev };
        initialData.forEach(item => {
          const serviceId = item.systemServiceId;
          if (updated[serviceId]) {
            updated[serviceId] = {
              enabled: true,
              price: item.price ? item.price.toString() : "",
              isNotFixed: item.notConstantValue || false
            };
          }
        });
        return updated;
      });
    }
  }, [initialData, services]);

  useEffect(() => {
    const formatted: Omit<CreateOtherServiceDto, 'hotelAvailabilityId' | 'hotelRoomId'>[] = services
      .filter(s => {
        const item = values[s.id];
        if (!item?.enabled) return false;
        const hasPrice = item.price && item.price !== '' && Number(item.price) > 0;
        const hasCheckbox = item.isNotFixed;
        return hasPrice || hasCheckbox;
      })
      .map(s => ({
        systemServiceId: s.id,
        price: values[s.id].price ? Number(values[s.id].price) : null,
        notConstantValue: values[s.id].isNotFixed,
        serviceName: s.name,
        isTimeLimited: false,
      }));

    onChange(formatted);
  }, [values, services, onChange]);

  const update = (id: number, field: "enabled" | "price" | "isNotFixed", value: any) => {
    setValues(prev => {
      const updated = { ...prev };
      if (field === "enabled" && value === false) {
        updated[id] = { enabled: false, price: "", isNotFixed: false };
      } else if (field === "isNotFixed" && value === true) {
        updated[id] = { ...prev[id], [field]: value, price: "" };
      } else {
        updated[id] = { ...prev[id], [field]: value };
      }
      return updated;
    });
  };

  return (
    <CardContainer className='rounded-md p-4'>
      <p >{t("price_policy.other_services")}</p>

      {services.map(service => {
        const item = values[service.id];
        if (!item) return null;

        return (
          <div key={service.id} className="flex justify-between items-center py-3 border-b last:border-none">

            <div className="flex items-center gap-3">
              <Switch
                checked={item.enabled}
                onCheckedChange={(checked) => update(service.id, "enabled", checked)}
              />
              <span>{service.name}</span>
            </div>

            <Input
              type="number"
              className="border p-1 w-24"
              disabled={!item.enabled || item.isNotFixed}
              placeholder="Արժեք"
              value={item.price}
              onChange={e => update(service.id, "price", e.target.value)}
            />

            <CheckBox
              options={{ id: service.id, name: t("price_policy.not_confirmed_value") }}
              isChecked={item.isNotFixed}
              toggleValue={() => update(service.id, "isNotFixed", !item.isNotFixed)}
              disabled={!item.enabled}
            />

          </div>
        );
      })}
    </CardContainer>
  );
};

export default AddRoomPricePolicyAdditionalServicesForm;
