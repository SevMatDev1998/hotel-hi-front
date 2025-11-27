import useQueryParam from '../../../hooks/useQueryParam';
import { useGetHotelAvailabilityWithDatesByPartneridQuery } from '../../../services/guests/guest.service';
import PricePolicyDatesCalendarContainer from './pricePolicyDates/pricePolicyDatesCalendar/PricePolicyDatesCalendarContainer';
import PricePolicyDatesTableContainer from './pricePolicyDates/pricePolicyDatesTable/PricePolicyDatesTableContainer';

const OfferPriceContainer = () => {
  const hotelId = useQueryParam('hotelId');

  const { data: hotelAvailabilityWithDates } = useGetHotelAvailabilityWithDatesByPartneridQuery({ hotelId: hotelId!, }, { skip: !hotelId  })
  
  if (!hotelAvailabilityWithDates) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      OfferPriceContainer
      <p>Hotel ID: {hotelId}</p>
      <PricePolicyDatesCalendarContainer hotelAvailabilityWithDates={hotelAvailabilityWithDates} hotelId={hotelId!} />
      <PricePolicyDatesTableContainer hotelAvailabilityWithDates={hotelAvailabilityWithDates} />
    </div>
  );
};

export default OfferPriceContainer;