import PricePolicyDatesCalendarContainer from './pricePolicyDates/pricePolicyDatesCalendar/PricePolicyDatesCalendarContainer';
import PricePolicyDatesTableContainer from './pricePolicyDates/pricePolicyDatesTable/PricePolicyDatesTableContainer';
import useQueryParam from '../../../hooks/useQueryParam';
import { useGetHotelAvailabilityWithDatesByPartneridQuery } from '../../../services/guests/guest.service';

const OfferPriceContainer = () => {
  const hotelId = useQueryParam('hotelId');

  const { data: hotelAvailabilityWithDates } = useGetHotelAvailabilityWithDatesByPartneridQuery({ hotelId: hotelId!, }, { skip: !hotelId  })
  
  if (!hotelAvailabilityWithDates) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <PricePolicyDatesCalendarContainer hotelAvailabilityWithDates={hotelAvailabilityWithDates} hotelId={hotelId!} />
      <PricePolicyDatesTableContainer hotelAvailabilityWithDates={hotelAvailabilityWithDates} />
    </div>
  );
};

export default OfferPriceContainer;