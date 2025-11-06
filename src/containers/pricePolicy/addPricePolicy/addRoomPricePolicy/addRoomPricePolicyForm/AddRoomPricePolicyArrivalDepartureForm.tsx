import React, { useState, useEffect } from "react";
import CardContainer from "../../../../public/CardContainer";
import { useGetAdditionalServicesQuery } from "../../../../../services/hotelService";

interface IAddRoomPricePolicyArrivalDepartureFormProps {
  onChange: (data: { serviceId: number; time: string; percentage: number }[]) => void; // ✅ добавили
}

const AddRoomPricePolicyArrivalDepartureForm: React.FC<IAddRoomPricePolicyArrivalDepartureFormProps> = ({ onChange }) => {
  const { data: additionalServices } = useGetAdditionalServicesQuery();

  const arrivalService = additionalServices?.find(s => s.name === "Arrival");
  const departureService = additionalServices?.find(s => s.name === "Departure");

  const [rows, setRows] = useState<any[]>([]);

  // ✅ каждый раз, когда rows меняется → отправляем наверх
  useEffect(() => {
    const formatted = rows.map(r => ({
      serviceId: r.serviceId,
      time: r.time,
      percentage: Number(r.percentage) || 0,
    }));

    onChange(formatted);
  }, [rows, onChange]);

  const addServiceRow = (service: any) => {
    if (!service) return; // защита если сервисы не загружены
    setRows(prev => [
      ...prev,
      {
        id: Date.now(),
        serviceId: service.id,
        name: service.name,
        time: "",
        percentage: ""
      }
    ]);
  };

  const updateRow = (id: number, field: string, value: string) => {
    setRows(prev => prev.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const deleteRow = (id: number) => {
    setRows(prev => prev.filter(row => row.id !== id));
  };

  return (
    <CardContainer>

      <div style={{ display: "flex", gap: 20 }}>
        <button onClick={() => addServiceRow(arrivalService)}>
          + Добавить ранний заезд
        </button>

        <button onClick={() => addServiceRow(departureService)}>
          + Добавить поздний выезд
        </button>
      </div>

      <br />

      {rows.map(row => (
        <div key={row.id} style={{ display: "flex", gap: 15, alignItems: "center", marginBottom: 10 }}>
          <span>{row.name}</span>

          <input 
            type="time"
            value={row.time}
            onChange={e => updateRow(row.id, "time", e.target.value)}
          />

          <input 
            type="number"
            placeholder="%"
            value={row.percentage}
            onChange={e => updateRow(row.id, "percentage", e.target.value)}
          />

          <button onClick={() => deleteRow(row.id)}>Удалить</button>
        </div>
      ))}

    </CardContainer>
  );
};

export default AddRoomPricePolicyArrivalDepartureForm;
