import React, { useEffect, useState } from "react";
import PricePolicyDatesCalendar from "./PricePolicyDatesCalendar";
import { useUpdateHotelAvailabilitesWithDatesMutation } from "../../../services/hotelAvailability/hotelAvailability.service";

interface IPricePolicyDatesCalendarContainerProps {
  hotelAvailabilityWithDates?: any;
  hotelId: string;
}


const PricePolicyDatesCalendarContainer = ({ hotelAvailabilityWithDates, hotelId }: IPricePolicyDatesCalendarContainerProps) => {

  useEffect(() => {
    if (hotelAvailabilityWithDates) {
      setAvailabilities(hotelAvailabilityWithDates);
    }
  }, [hotelAvailabilityWithDates]);

  const [availabilities, setAvailabilities] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState({});
  const [updateHotelAvailabilitesWithDates] = useUpdateHotelAvailabilitesWithDatesMutation();


  const handleCalendarChange = (updatedData: any[]) => {
    setAvailabilities(updatedData);
  };

  const handleSubmit = async () => {


    try {
      updateHotelAvailabilitesWithDates({ hotelId: hotelId, body: availabilities });
      // В реальном коде можно использовать fetch или axios:
      // await fetch("/api/availabilities", { method: "POST", body: JSON.stringify(availabilities) });
    } catch (error) {
      console.error("Ошибка при отправке:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-gray-800">
        Управление календарём ценовой политики
      </h1>

      {/* 🔽 выбор активного availability */}
      <div className="flex items-center gap-4 mb-4">
        <label className="font-medium text-gray-700">Выбрать тип:</label>
        <select
          className="border border-gray-300 rounded px-2 py-1"
          value={selectedAvailability.id}
          onChange={(e) => {
            const id = Number(e.target.value);
            const found = hotelAvailabilityWithDates.find((a) => a.id === id);
            if (found) {
              setSelectedAvailability({
                id: found.id,
                color: found.color,
              });
            }
          }}
        >
          {hotelAvailabilityWithDates.map((a) => (
            <option key={a.id} value={a.id}>
              ID {a.id} ({a.color})
            </option>
          ))}
        </select>
      </div>

      {/* 🗓 сам календарь */}
      <PricePolicyDatesCalendar
        year={2025}
        initialSelectedDays={availabilities}
        activeAvailability={selectedAvailability}
        onChange={handleCalendarChange}
      />

      {/* 🔘 кнопка отправки */}
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          💾 Сохранить изменения
        </button>
      </div>
    </div>
  );
};

export default PricePolicyDatesCalendarContainer;
