import React, { FC, useMemo } from 'react';
import { format, parseISO, isEqual, addDays } from 'date-fns';
import { HotelAvailabilityDateCommission } from '../../types/hotelAvailabilityDateCommission';

interface ICommissionDateViewProps {
  dateCommissions: HotelAvailabilityDateCommission[]
}

interface DateRange {
  start: Date;
  end: Date;
}

const CommissionDateView: FC<ICommissionDateViewProps> = ({ dateCommissions }) => {
  const dateRanges = useMemo(() => {
    if (!dateCommissions.length) return [];

    // Sort dates chronologically
    const sortedDates = [...dateCommissions]
      .map(dc => parseISO(dc.date))
      .sort((a, b) => a.getTime() - b.getTime());

    // Group consecutive dates into ranges
    const ranges: DateRange[] = [];
    let rangeStart = sortedDates[0];
    let rangeEnd = sortedDates[0];

    for (let i = 1; i < sortedDates.length; i++) {
      const currentDate = sortedDates[i];
      const expectedNextDay = addDays(rangeEnd, 1);

      // Check if current date is consecutive
      if (isEqual(currentDate, expectedNextDay)) {
        rangeEnd = currentDate;
      } else {
        // Save the current range and start a new one
        ranges.push({ start: rangeStart, end: rangeEnd });
        rangeStart = currentDate;
        rangeEnd = currentDate;
      }
    }

    // Add the last range
    ranges.push({ start: rangeStart, end: rangeEnd });

    return ranges;
  }, [dateCommissions]);

  const formatDateRange = (range: DateRange) => {
    const startFormatted = format(range.start, 'MMMM d, yyyy');
    
    // If start and end are the same, show single date
    if (isEqual(range.start, range.end)) {
      return startFormatted;
    }

    // If same month and year, show abbreviated format
    if (format(range.start, 'yyyy-MM') === format(range.end, 'yyyy-MM')) {
      return `${format(range.start, 'MMMM d')}-${format(range.end, 'd, yyyy')}`;
    }

    // If different months
    return `${startFormatted} - ${format(range.end, 'MMMM d, yyyy')}`;
  };

  if (!dateCommissions.length) {
    return (
      <div className="text-gray-500 text-sm">No dates available</div>
    );
  }

  return (
    <div className="space-y-3">
     
      <div >
        {dateRanges.map((range, index) => (
          <div
            key={index}
          >
            {formatDateRange(range)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommissionDateView;