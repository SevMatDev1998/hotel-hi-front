import { useParams } from 'react-router-dom';
import HotelPartnerContainerBlock from './HotelPartnerContainerBlock';
import { useGetHotelPartnerQuery } from '../../../services/partners';

const HotelPartnerContainer = () => {

  const { partnerId } = useParams<{ partnerId: string }>();

  const { data: partner } = useGetHotelPartnerQuery({ partnerId: partnerId! }, { skip: !partnerId })


  return partner &&  <HotelPartnerContainerBlock partner={partner} />
};

export default HotelPartnerContainer; 