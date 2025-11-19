import React from 'react';
import useQueryParam from '../../../hooks/useQueryParam';
import PricePolicyDatesTableContainer from '../../pricePolicy/pricePolicyDates/pricePolicyDatesTable/PricePolicyDatesTableContainer';
import { useGetHotelAvailabilityWithDatesByPartneridQuery } from '../../../services/guests/guest.service';
import OfferPriceDatesTable from './OfferPriceDatesTable';

const OfferPriceContainer = () => {
  const hotelId = useQueryParam('hotelId');
  const partnerId = useQueryParam('partnerId');

  const { data: hotelAvailabilityWithDates } = useGetHotelAvailabilityWithDatesByPartneridQuery({ hotelId: hotelId!, partnerId: partnerId! }, { skip: !hotelId || !partnerId })
  
  console.log(hotelAvailabilityWithDates);
  
  return (
    <div>
      OfferPriceContainer
      <p>Hotel ID: {hotelId}</p>
      <p>Partner ID: {partnerId}</p>
      <OfferPriceDatesTable hotelAvailabilityWithDates={hotelAvailabilityWithDates} />

    </div>
  );
};

export default OfferPriceContainer;