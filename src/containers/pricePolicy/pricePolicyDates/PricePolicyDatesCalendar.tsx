import React, { useState, useEffect } from "react";

const months = [
  "Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս",
  "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր"
];

const weekdays = ["Կիր", "Երկ", "Երք", "Չրք", "Հնգ", "Ուրբ", "Շբթ"];

const PricePolicyDatesCalendar = ({ year = 2025, initialSelectedDays = [] }) => {
  const [selectedDays, setSelectedDays] = useState([]);

  // ✅ Load preselected data when component mounts or updates
  useEffect(() => {
    if (initialSelectedDays && initialSelectedDays.length > 0) {
      setSelectedDays(
        initialSelectedDays.map((d) => ({
          id: d.id,
          date: new Date(d.date),
        }))
      );
    }
  }, [initialSelectedDays]);

  const getDaysInMonth = (monthIndex) =>
    new Date(year, monthIndex + 1, 0).getDate();

  const getFirstDayIndex = (monthIndex) =>
    new Date(year, monthIndex, 1).getDay();

  const maxDays = Math.max(
    ...months.map((_, i) => getDaysInMonth(i) + getFirstDayIndex(i))
  );

  const toggleDay = (monthIndex, day) => {
    const id = `m${monthIndex + 1}-d${day}`;
    const date = new Date(year, monthIndex, day);
    const exists = selectedDays.find((d) => d.id === id);
    if (exists) {
      setSelectedDays(selectedDays.filter((d) => d.id !== id));
    } else {
      setSelectedDays([...selectedDays, { id, date }]);
    }
  };

  const toggleMonth = (monthIndex) => {
    const daysInMonth = getDaysInMonth(monthIndex);
    const monthCells = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const id = `m${monthIndex + 1}-d${i}`;
      const date = new Date(year, monthIndex, i);
      monthCells.push({ id, date });
    }

    const allSelected = monthCells.every((cell) =>
      selectedDays.some((d) => d.id === cell.id)
    );

    if (allSelected) {
      setSelectedDays(
        selectedDays.filter((d) => !monthCells.some((cell) => cell.id === d.id))
      );
    } else {
      const newSelected = [
        ...selectedDays.filter(
          (d) => !monthCells.some((cell) => cell.id === d.id)
        ),
        ...monthCells,
      ];
      setSelectedDays(newSelected);
    }
  };

  const toggleWeekday = (weekdayIndex) => {
    const allCells = [];
    months.forEach((_, mIndex) => {
      const daysInMonth = getDaysInMonth(mIndex);
      for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, mIndex, d);
        if (date.getDay() === weekdayIndex) {
          allCells.push({ id: `m${mIndex + 1}-d${d}`, date });
        }
      }
    });

    const allSelected = allCells.every((cell) =>
      selectedDays.some((d) => d.id === cell.id)
    );

    if (allSelected) {
      setSelectedDays(
        selectedDays.filter((d) => !allCells.some((cell) => cell.id === d.id))
      );
    } else {
      const newSelected = [
        ...selectedDays.filter(
          (d) => !allCells.some((cell) => cell.id === d.id)
        ),
        ...allCells,
      ];
      setSelectedDays(newSelected);
    }
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
            const cells = [];

            for (let i = 0; i < firstDay; i++) {
              cells.push(<td key={`empty-${i}`} className="border p-1"></td>);
            }

            for (let d = 1; d <= daysInMonth; d++) {
              const id = `m${mIndex + 1}-d${d}`;
              const isSelected = selectedDays.some((x) => x.id === id);
              cells.push(
                <td
                  key={id}
                  onClick={() => toggleDay(mIndex, d)}
                  className={`border text-center cursor-pointer p-1 min-w-[30px] rounded transition-all ${
                    isSelected
                      ? "bg-blue-500 text-white border-blue-600"
                      : "bg-white hover:bg-blue-100"
                  }`}
                >
                  {d}
                </td>
              );
            }

            while (cells.length < maxDays) {
              cells.push(<td key={`end-${cells.length}`} className="border p-1"></td>);
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

      {selectedDays.length > 0 && (
        <div className="mt-4 text-gray-700">
          <h3 className="font-semibold">
            Ընտրված օրեր ({selectedDays.length}):
          </h3>
          <ul className="list-disc ml-5 mt-2 max-h-40 overflow-y-auto">
            {selectedDays.map((d) => (
              <li key={d.id}>
                {d.date.toLocaleDateString("hy-AM")}{" "}
                <span className="text-xs text-gray-500">{d.id}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PricePolicyDatesCalendar;
