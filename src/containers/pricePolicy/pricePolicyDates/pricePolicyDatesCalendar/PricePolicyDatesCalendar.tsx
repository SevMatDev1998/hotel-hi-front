import { useState, useEffect, useCallback } from "react";
import { Trash2 } from "lucide-react";

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
  onDeleteDate?: (calendarId: string) => void;
  onDeleteMonth?: (monthIndex: number) => void;
  onDeleteWeekday?: (weekdayIndex: number) => void;
}

const PricePolicyDatesCalendar = ({
  year = 2025,
  initialSelectedDays = [],
  activeAvailability,
  onChange,
  onDeleteDate,
  onDeleteMonth,
  onDeleteWeekday,
}: PricePolicyDatesCalendarProps) => {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [colorMap, setColorMap] = useState<Record<string, string>>({});
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
  const [hoveredWeekday, setHoveredWeekday] = useState<number | null>(null);

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

  const getDaysInMonth = useCallback((m: number) => new Date(year, m + 1, 0).getDate(), [year]);
  const getFirstDayIndex = useCallback((m: number) => new Date(year, m, 1).getDay(), [year]);
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
    [year, updateAvailabilities, getDaysInMonth]
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
    [year, updateAvailabilities, getDaysInMonth]
  );

  // 🗑️ Обработчики удаления
  const handleDeleteDate = useCallback(
    (e: React.MouseEvent, calendarId: string) => {
      e.stopPropagation();
      onDeleteDate?.(calendarId);
    },
    [onDeleteDate]
  );

  const handleDeleteMonth = useCallback(
    (e: React.MouseEvent, monthIndex: number) => {
      e.stopPropagation();
      onDeleteMonth?.(monthIndex);
    },
    [onDeleteMonth]
  );

  const handleDeleteWeekday = useCallback(
    (e: React.MouseEvent, weekdayIndex: number) => {
      e.stopPropagation();
      onDeleteWeekday?.(weekdayIndex);
    },
    [onDeleteWeekday]
  );

  // Показываем trash icon только если НЕТ активного availability
  const canDelete = !activeAvailability;
  
  return (
    <div className=" overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="bg-teal-700 text-white px-2 py-1 rounded-l-md w-24">
              {year}
            </th>
            {Array.from({ length: maxDays }, (_, i) => {
              const weekdayIndex = i % 7;
              const hasSelectedDates = availabilities.some(a =>
                a.hotelAvailabilityDateCommissions.some(d => {
                  const date = new Date(d.date);
                  return date.getDay() === weekdayIndex;
                })
              );
              
              return (
                <th
                  key={i}
                  onClick={() => toggleWeekday(weekdayIndex)}
                  onMouseEnter={() => setHoveredWeekday(weekdayIndex)}
                  onMouseLeave={() => setHoveredWeekday(null)}
                  className="bg-gray-200 text-gray-800 font-medium px-2 py-1 border cursor-pointer hover:bg-gray-300 select-none relative"
                >
                  <div className="flex items-center justify-center gap-1">
                    {weekdays[weekdayIndex]}
                    {canDelete && hasSelectedDates && hoveredWeekday === weekdayIndex && (
                      <Trash2
                        size={14}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        onClick={(e) => handleDeleteWeekday(e, weekdayIndex)}
                      />
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {months.map((month, mIndex) => {
            const daysInMonth = getDaysInMonth(mIndex);
            const firstDay = getFirstDayIndex(mIndex);
            const cells: JSX.Element[] = [];

            // Проверяем есть ли выбранные даты в этом месяце
            const hasSelectedDatesInMonth = availabilities.some(a =>
              a.hotelAvailabilityDateCommissions.some(d => {
                const date = new Date(d.date);
                return date.getMonth() === mIndex;
              })
            );

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
                  onMouseEnter={() => setHoveredCell(calendarId)}
                  onMouseLeave={() => setHoveredCell(null)}
                  className={`border text-center cursor-pointer p-1 min-w-[30px] rounded transition-all relative ${
                    isSelected
                      ? "text-white font-semibold"
                      : "bg-white hover:bg-blue-100 text-gray-800"
                  }`}
                  style={{
                    backgroundColor: color || "white",
                  }}
                >
                  <div className="flex items-center justify-center gap-1">
                    {d}
                    {canDelete && isSelected && hoveredCell === calendarId && (
                      <Trash2
                        size={12}
                        className="text-red-500 hover:text-red-700 cursor-pointer absolute right-0.5 top-0.5"
                        onClick={(e) => handleDeleteDate(e, calendarId)}
                      />
                    )}
                  </div>
                </td>
              );
            }

            return (
              <tr key={month}>
                <td
                  onClick={() => toggleMonth(mIndex)}
                  onMouseEnter={() => setHoveredMonth(mIndex)}
                  onMouseLeave={() => setHoveredMonth(null)}
                  className="bg-gray-100 text-gray-700 font-semibold px-2 py-1 text-left sticky left-0 cursor-pointer hover:bg-gray-200 select-none"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span>{month}</span>
                    {canDelete && hasSelectedDatesInMonth && hoveredMonth === mIndex && (
                      <Trash2
                        size={14}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        onClick={(e) => handleDeleteMonth(e, mIndex)}
                      />
                    )}
                  </div>
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
