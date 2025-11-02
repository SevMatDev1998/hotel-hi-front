import React, { useState, useEffect, useCallback } from "react";

const months = [
  "Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս",
  "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր",
];
const weekdays = ["Կիր", "Երկ", "Երք", "Չրք", "Հնգ", "Ուրբ", "Շբթ"];

interface Day {
  id: string;
  date: Date;
  calendarId: string;
}
interface Availability {
  id: number;
  color: string;
  hotelAvailabilityDateCommissions: { id: string; date: string | Date; calendarId: string }[];
}
interface ActiveAvailability {
  id: number;
  color: string;
}
interface PricePolicyDatesCalendarProps {
  year?: number;
  initialSelectedDays?: Availability[];
  activeAvailability?: ActiveAvailability;
  onChange?: (updated: Availability[]) => void;
}

const PricePolicyDatesCalendar = ({
  year = 2025,
  initialSelectedDays = [],
  activeAvailability,
  onChange,
}: PricePolicyDatesCalendarProps) => {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [colorMap, setColorMap] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialSelectedDays.length) {
      setAvailabilities(initialSelectedDays);
      const map: Record<string, string> = {};
      initialSelectedDays.forEach((a) =>
        a.hotelAvailabilityDateCommissions.forEach((d) => (map[d.calendarId || d.id] = a.color))
      );
      setColorMap(map);
    }
  }, [initialSelectedDays]);

  const getDaysInMonth = (m: number) => new Date(year, m + 1, 0).getDate();
  const getFirstDayIndex = (m: number) => new Date(year, m, 1).getDay();
  const maxDays = Math.max(
    ...months.map((_, i) => getDaysInMonth(i) + getFirstDayIndex(i))
  );

  // ✅ отдельный чистый метод обновления availabilities
  const computeUpdatedAvailabilities = useCallback(
    (prev: Availability[], cells: Day[]): Availability[] => {
      if (!activeAvailability) return prev;

      // Обновляем выбранный availability
      const updated = prev.map((a) => {
        if (a.id === activeAvailability.id) {
          const allSelected = cells.every((c) =>
            a.hotelAvailabilityDateCommissions.some((d) => d.calendarId === c.calendarId)
          );
          const newDays = allSelected
            ? a.hotelAvailabilityDateCommissions.filter(
                (d) => !cells.some((c) => c.calendarId === d.calendarId)
              )
            : [
                ...a.hotelAvailabilityDateCommissions,
                ...cells.filter(
                  (c) => !a.hotelAvailabilityDateCommissions.some((d) => d.calendarId === c.calendarId)
                ),
              ];
          return { ...a, hotelAvailabilityDateCommissions: newDays };
        }
        return a;
      });

      // Удаляем эти даты из других availability
      const cleaned = updated.map((a) =>
        a.id !== activeAvailability.id
          ? {
              ...a,
              hotelAvailabilityDateCommissions: a.hotelAvailabilityDateCommissions.filter(
                (d) => !cells.some((c) => c.calendarId === d.calendarId)
              ),
            }
          : a
      );

      return cleaned;
    },
    [activeAvailability]
  );

  // ✅ универсальный метод обновления состояния
  const updateAvailabilities = useCallback(
    (cells: Day[]) => {
      setAvailabilities((prev) => {
        const newState = computeUpdatedAvailabilities(prev, cells);

        // обновляем карту цветов
        const map: Record<string, string> = {};
        newState.forEach((a) =>
          a.hotelAvailabilityDateCommissions.forEach((d) => (map[d.calendarId] = a.color))
        );
        setColorMap(map);

        onChange?.(newState);
        return newState;
      });
    },
    [computeUpdatedAvailabilities, onChange]
  );

  // 🔹 Обработчики
  const toggleDay = useCallback(
    (monthIndex: number, day: number) => {
      const calendarId = `m${monthIndex + 1}-d${day}`;
      const date = new Date(year, monthIndex, day);
      updateAvailabilities([{ id: `${Date.now()}-${calendarId}`, date, calendarId }]);
    },
    [year, updateAvailabilities]
  );

  const toggleMonth = useCallback(
    (monthIndex: number) => {
      const daysInMonth = getDaysInMonth(monthIndex);
      const cells: Day[] = [];
      for (let i = 1; i <= daysInMonth; i++) {
        const calendarId = `m${monthIndex + 1}-d${i}`;
        cells.push({
          id: `${Date.now()}-${calendarId}`,
          date: new Date(year, monthIndex, i),
          calendarId,
        });
      }
      updateAvailabilities(cells);
    },
    [year, updateAvailabilities]
  );

  const toggleWeekday = useCallback(
    (weekdayIndex: number) => {
      const cells: Day[] = [];
      months.forEach((_, mIndex) => {
        const daysInMonth = getDaysInMonth(mIndex);
        for (let d = 1; d <= daysInMonth; d++) {
          const date = new Date(year, mIndex, d);
          if (date.getDay() === weekdayIndex) {
            const calendarId = `m${mIndex + 1}-d${d}`;
            cells.push({
              id: `${Date.now()}-${calendarId}`,
              date,
              calendarId,
            });
          }
        }
      });
      updateAvailabilities(cells);
    },
    [year, updateAvailabilities]
  );

  console.log(123);
  
  return (
    <div className=" overflow-x-auto">
      <h2 className="text-lg font-semibold mb-3 text-gray-700">
        Գնային քաղաքականության օրացույց {year}
      </h2>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="bg-teal-700 text-white px-2 py-1 rounded-l-md w-24">
              {year}
            </th>
            {Array.from({ length: maxDays }, (_, i) => (
              <th
                key={i}
                onClick={() => toggleWeekday(i % 7)}
                className="bg-gray-200 text-gray-800 font-medium px-2 py-1 border cursor-pointer hover:bg-gray-300 select-none"
              >
                {weekdays[i % 7]}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {months.map((month, mIndex) => {
            const daysInMonth = getDaysInMonth(mIndex);
            const firstDay = getFirstDayIndex(mIndex);
            const cells: JSX.Element[] = [];

            for (let i = 0; i < firstDay; i++) {
              cells.push(<td key={`empty-${i}`} className="border p-1" />);
            }

            for (let d = 1; d <= daysInMonth; d++) {
              const calendarId = `m${mIndex + 1}-d${d}`;
              const color = colorMap[calendarId];
              const isSelected = !!color;

              cells.push(
                <td
                  key={calendarId}
                  onClick={() => toggleDay(mIndex, d)}
                  className={`border text-center cursor-pointer p-1 min-w-[30px] rounded transition-all ${
                    isSelected
                      ? "text-white font-semibold"
                      : "bg-white hover:bg-blue-100 text-gray-800"
                  }`}
                  style={{
                    backgroundColor: color || "white",
                    borderColor: color || "#ccc",
                  }}
                >
                  {d}
                </td>
              );
            }

            return (
              <tr key={month}>
                <td
                  onClick={() => toggleMonth(mIndex)}
                  className="bg-gray-100 text-gray-700 font-semibold px-2 py-1 text-left sticky left-0 cursor-pointer hover:bg-gray-200 select-none"
                >
                  {month}
                </td>
                {cells}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PricePolicyDatesCalendar;
