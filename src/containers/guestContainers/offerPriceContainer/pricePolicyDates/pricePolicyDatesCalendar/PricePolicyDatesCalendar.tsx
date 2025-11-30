import { useCallback,useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

const months = [
  "Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս",
  "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր",
];
const weekdays = ["Կիր", "Երկ", "Երք", "Չրք", "Հնգ", "Ուրբ", "Շբթ"];

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
}

const PricePolicyDatesCalendar = ({
  year = 2025,
  initialSelectedDays = [],
  activeAvailability,
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
                  onMouseEnter={() => setHoveredWeekday(weekdayIndex)}
                  onMouseLeave={() => setHoveredWeekday(null)}
                  className={`bg-gray-200 text-gray-800 font-medium px-2 py-1 border cursor-pointer select-none relative ${
                    canDelete && hasSelectedDates && hoveredWeekday === weekdayIndex
                      ? "bg-red-200 hover:bg-red-300"
                      : "hover:bg-gray-300"
                  }`}
                >
                  {weekdays[weekdayIndex]}
                  {canDelete && hasSelectedDates && hoveredWeekday === weekdayIndex && (
                    <Trash2
                      size={14}
                      className="text-red-600 cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                  )}
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
                  onMouseEnter={() => setHoveredCell(calendarId)}
                  onMouseLeave={() => setHoveredCell(null)}
                  className={`border text-center cursor-pointer p-1 min-w-[30px] rounded transition-all relative ${
                    isSelected
                      ? "text-white font-semibold"
                      : "bg-white hover:bg-blue-100 text-gray-800"
                  } ${canDelete && isSelected && hoveredCell === calendarId ? "brightness-90" : ""}`}
                  style={{
                    backgroundColor: color || "white",
                  }}
                >
                  {d}
                </td>
              );
            }
            return (
              <tr key={month}>
                <td
                  onMouseEnter={() => setHoveredMonth(mIndex)}
                  onMouseLeave={() => setHoveredMonth(null)}
                  className={`bg-gray-100 text-gray-700 font-semibold px-2 py-1 text-left sticky left-0 cursor-pointer select-none ${
                    canDelete && hasSelectedDatesInMonth && hoveredMonth === mIndex
                      ? "bg-red-200 hover:bg-red-300"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <div className="relative">
                    {month}
                   
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
