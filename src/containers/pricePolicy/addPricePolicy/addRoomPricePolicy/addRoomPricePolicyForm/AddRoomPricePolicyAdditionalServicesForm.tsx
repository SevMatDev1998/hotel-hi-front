import React, { useEffect, useMemo, useState } from "react";
import CardContainer from "../../../../public/CardContainer";
import { useGetAdditionalServicesQuery } from "../../../../../services/hotelService";

interface IAdditionalServiceFormOutput {
  serviceId: number;
  price: number | null;
  isNotFixed: boolean;
}

interface IAddRoomPricePolicyAdditionalServicesFormProps {
  onChange: (data: IAdditionalServiceFormOutput[]) => void;
}

const TARGET_SERVICE_NAMES = ["Food delivery", "Provision of a crib"];

const AddRoomPricePolicyAdditionalServicesForm: React.FC<IAddRoomPricePolicyAdditionalServicesFormProps> = ({ onChange }) => {
  const { data: additionalServices } = useGetAdditionalServicesQuery();

  // ✅ Filter only required services safely and memoized
  const services = useMemo(
    () => additionalServices?.filter(s => TARGET_SERVICE_NAMES.includes(s.name)) ?? [],
    [additionalServices]
  );

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

  // ✅ Emit formatted data upward
  useEffect(() => {
    const formatted = services
      .filter(s => values[s.id]?.enabled)
      .map(s => ({
        serviceId: s.id,
        price: values[s.id].price ? Number(values[s.id].price) : null,
        isNotFixed: values[s.id].isNotFixed,
      }));

    onChange(formatted);
  }, [values, services, onChange]);

  const update = (id: number, field: "enabled" | "price" | "isNotFixed", value: any) => {
    setValues(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  return (
    <CardContainer>
      <h3 className="text-lg font-semibold mb-3">Այլ ծառայություններ</h3>

      {services.map(service => {
        const item = values[service.id];
        if (!item) return null;

        return (
          <div key={service.id} className="flex justify-between items-center py-3 border-b last:border-none">

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={item.enabled}
                onChange={() => update(service.id, "enabled", !item.enabled)}
              />
              <span>{service.name}</span>
            </label>

            <input
              type="number"
              className="border p-1 w-24"
              disabled={!item.enabled}
              placeholder="Արժեք"
              value={item.price}
              onChange={e => update(service.id, "price", e.target.value)}
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                disabled={!item.enabled}
                checked={item.isNotFixed}
                onChange={e => update(service.id, "isNotFixed", e.target.checked)}
              />
              <span>ոչ հաստատված արժեք</span>
            </label>

          </div>
        );
      })}
    </CardContainer>
  );
};

export default AddRoomPricePolicyAdditionalServicesForm;
