import { useTranslation } from 'react-i18next';
import HotelContainer from '../../containers/hotelContainer/HotelContainer';

const Hotel = () => {
  const { t } = useTranslation();

  return (
    <div className='main-title'>
      <HotelContainer/>
    </div>
  );
};

export default Hotel;