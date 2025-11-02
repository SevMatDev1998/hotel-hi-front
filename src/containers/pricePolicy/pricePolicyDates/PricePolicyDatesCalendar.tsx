import React, { useState, useEffect } from "react";

const months = [
  "Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս",
  "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր",
];
const weekdays = ["Կիր", "Երկ", "Երք", "Չրք", "Հնգ", "Ուրբ", "Շբթ"];

interface Day {
  id: string;
  date: Date;
}
interface Availability {
  id: number;
  color: string;
  dates: { id: string; date: string | Date }[];
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
  // локальный state для availabilities
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  // мапа для быстрого отображения цвета ячейки
  const [colorMap, setColorMap] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialSelectedDays.length) {
      setAvailabilities(initialSelectedDays);
      const map: Record<string, string> = {};
      initialSelectedDays.forEach((a) => {
        a.dates.forEach((d) => {
          map[d.id] = a.color;
        });
      });
      setColorMap(map);
    }
  }, [initialSelectedDays]);

  const getDaysInMonth = (m: number) => new Date(year, m + 1, 0).getDate();
  const getFirstDayIndex = (m: number) => new Date(year, m, 1).getDay();
  const maxDays = Math.max(
    ...months.map((_, i) => getDaysInMonth(i) + getFirstDayIndex(i))
  );

  // 🔹 клик по отдельному дню
  const toggleDay = (monthIndex: number, day: number) => {
    if (!activeAvailability) return;
    const id = `m${monthIndex + 1}-d${day}`;
    const date = new Date(year, monthIndex, day);

    setAvailabilities((prev) => {
      const updated = prev.map((a) => {
        if (a.id === activeAvailability.id) {
          const exists = a.dates.some((d) => d.id === id);
          return {
            ...a,
            dates: exists
              ? a.dates.filter((d) => d.id !== id)
              : [...a.dates, { id, date }],
          };
        } else {
          return a;
        }
      });

      // если этот день был в другом availability — удалить оттуда
      updated.forEach((a) => {
        if (
          a.id !== activeAvailability.id &&
          a.dates.some((d) => d.id === id)
        ) {
          a.dates = a.dates.filter((d) => d.id !== id);
        }
      });

      // обновляем карту цветов
      const map: Record<string, string> = {};
      updated.forEach((a) =>
        a.dates.forEach((d) => (map[d.id] = a.color))
      );
      setColorMap(map);

      onChange?.(updated);
      return [...updated];
    });
  };

  // 🔹 клик по месяцу
  const toggleMonth = (monthIndex: number) => {
    if (!activeAvailability) return;
    const daysInMonth = getDaysInMonth(monthIndex);
    const cells: Day[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const id = `m${monthIndex + 1}-d${i}`;
      const date = new Date(year, monthIndex, i);
      cells.push({ id, date });
    }

    setAvailabilities((prev) => {
      const updated = prev.map((a) => {
        if (a.id === activeAvailability.id) {
          const allSelected = cells.every((c) =>
            a.dates.some((d) => d.id === c.id)
          );
          const newDays = allSelected
            ? a.dates.filter((d) => !cells.some((c) => c.id === d.id))
            : [...a.dates, ...cells.filter((c) => !a.dates.some((d) => d.id === c.id))];
          return { ...a, dates: newDays };
        }
        return a;
      });

      const map: Record<string, string> = {};
      updated.forEach((a) =>
        a.dates.forEach((d) => (map[d.id] = a.color))
      );
      setColorMap(map);
      onChange?.(updated);
      return [...updated];
    });
  };

  // 🔹 клик по дню недели
  const toggleWeekday = (weekdayIndex: number) => {
    if (!activeAvailability) return;
    const cells: Day[] = [];
    months.forEach((_, mIndex) => {
      const daysInMonth = getDaysInMonth(mIndex);
      for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, mIndex, d);
        if (date.getDay() === weekdayIndex) {
          cells.push({ id: `m${mIndex + 1}-d${d}`, date });
        }
      }
    });

    setAvailabilities((prev) => {
      const updated = prev.map((a) => {
        if (a.id === activeAvailability.id) {
          const allSelected = cells.every((c) =>
            a.dates.some((d) => d.id === c.id)
          );
          const newDays = allSelected
            ? a.dates.filter((d) => !cells.some((c) => c.id === d.id))
            : [...a.dates, ...cells.filter((c) => !a.dates.some((d) => d.id === c.id))];
          return { ...a, dates: newDays };
        }
        return a;
      });

      const map: Record<string, string> = {};
      updated.forEach((a) =>
        a.dates.forEach((d) => (map[d.id] = a.color))
      );
      setColorMap(map);
      onChange?.(updated);
      return [...updated];
    });
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md overflow-x-auto">
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
              cells.push(<td key={`empty-${i}`} className="border p-1"></td>);
            }

            for (let d = 1; d <= daysInMonth; d++) {
              const id = `m${mIndex + 1}-d${d}`;
              const color = colorMap[id];
              const isSelected = !!color;
              cells.push(
                <td
                  key={id}
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

            while (cells.length < maxDays) {
              cells.push(
                <td key={`end-${cells.length}`} className="border p-1"></td>
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
