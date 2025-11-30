import { useEffect, useState } from "react";
import BlockContainer from "../../../../public/BlockContainer";
import PricePolicyDatesCalendar from "./PricePolicyDatesCalendar";

interface IAvailabilityDate {
  id: string;
  date: string | Date;
  calendarId: string;
}

interface IAvailability {
  id: number;
  color: string;
  title?: string;
  checkInTime?: string | Date;
  checkoutTime?: string | Date;
  confirmed?: boolean;
  hotelAvailabilityDateCommissions: IAvailabilityDate[];
}


interface IPricePolicyDatesCalendarContainerProps {
  hotelAvailabilityWithDates?: IAvailability[];
  hotelId: string;
}


const PricePolicyDatesCalendarContainer = ({ hotelAvailabilityWithDates, hotelId }: IPricePolicyDatesCalendarContainerProps) => {


  useEffect(() => {
    if (hotelAvailabilityWithDates) {
      setAvailabilities(hotelAvailabilityWithDates);
    }
  }, [hotelAvailabilityWithDates]);

  const [availabilities, setAvailabilities] = useState<IAvailability[]>([]);

  return (
    <BlockContainer  >
      <div className="flex justify-end gap-4 mb-4">
      <PricePolicyDatesCalendar
        year={2025}
        initialSelectedDays={availabilities}
      />
    </div>

    </BlockContainer>
  );
};

export default PricePolicyDatesCalendarContainer;
