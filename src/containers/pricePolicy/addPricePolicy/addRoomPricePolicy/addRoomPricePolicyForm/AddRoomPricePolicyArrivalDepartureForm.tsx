import React, { useState, useEffect } from "react";
import CardContainer from "../../../../public/CardContainer";
import { useGetAdditionalServicesQuery } from "../../../../../services/hotelService";
import { CreateHotelAdditionalServiceDto } from "../../../../../types/pricePolicyDto";

interface IAddRoomPricePolicyArrivalDepartureFormProps {
  hotelAvailabilityId: number;
  hotelRoomId?: number;
  onChange: (data: Omit<CreateHotelAdditionalServiceDto, 'hotelAvailabilityId' | 'hotelRoomId'>[]) => void;
  initialData?: any[];
}

interface RowData {
  id: number;
  serviceId: number;
  name: string;
  time: string;
  percentage: string;
}

const AddRoomPricePolicyArrivalDepartureForm: React.FC<IAddRoomPricePolicyArrivalDepartureFormProps> = ({ 
  onChange,
  initialData
}) => {
  const { data: additionalServicesData } = useGetAdditionalServicesQuery();

  const additionalServices = Array.isArray(additionalServicesData) 
    ? additionalServicesData 
    : additionalServicesData ? [additionalServicesData] : [];

  const arrivalService = additionalServices.find(s => s.name === "Arrival");
  const departureService = additionalServices.find(s => s.name === "Departure");

  const [rows, setRows] = useState<RowData[]>([]);

  useEffect(() => {
    if (initialData && initialData.length > 0 && (arrivalService || departureService)) {
      const loadedRows: RowData[] = initialData.map(item => {
        const timeMatch = item.startTime ? new Date(item.startTime).toISOString().match(/T(\d{2}:\d{2})/) : null;
        const time = timeMatch ? timeMatch[1] : '';

        return {
          id: Date.now() + Math.random(),
          serviceId: item.systemServiceId,
          name: item.serviceName,
          time,
          percentage: item.percentage?.toString() || ''
        };
      });
      setRows(loadedRows);
    }
  }, [initialData, arrivalService, departureService]);

  useEffect(() => {
    const formatted: Omit<CreateHotelAdditionalServiceDto, 'hotelAvailabilityId' | 'hotelRoomId'>[] = rows.map(r => {
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      const startTime = r.time ? `${today}T${r.time}:00.000Z` : '';
      
      return {
        systemServiceId: r.serviceId,
        isTimeLimited: true,
        startTime,
        percentage: Number(r.percentage) || 0,
        serviceName: r.name,
      };
    });

    onChange(formatted);
  }, [rows, onChange]);

  const addServiceRow = (service: any) => {
    if (!service) return; 
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
    <CardContainer className='rounded-md p-4'>

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
