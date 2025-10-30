import React from 'react';
import PricePolicyDatesCalendar from './PricePolicyDatesCalendar';

const PricePolicyDatesCalendarContainer = () => {
  const mockSelectedDays = [
  { id: "m1-d5", date: "2024-01-05" },
  { id: "m1-d12", date: "2024-01-12" },
  { id: "m4-d21", date: "2024-04-21" },
  { id: "m7-d3", date: "2024-07-03" },
  { id: "m12-d25", date: "2024-12-25" },
];

  return (
    <PricePolicyDatesCalendar initialSelectedDays={mockSelectedDays} />
  );
};

export default PricePolicyDatesCalendarContainer;