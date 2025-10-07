import BaseInfoContainer from './BaseInfoContainer';
import BaseInfoEditContainer from './BaseInfoEditContainer';
import { useGetHotelBaseInformationQuery } from '../../../services/hotel/hotel.service';
import { User } from '../../../types';
import { useGetCountriesQuery } from '../../../services/countries/countries.service';
import { useGetCurrenciesQuery } from '../../../services/currencies/currencies.service';
import useAppSelector from '../../../hooks/useAppSelector';

interface IBaseInfoProps {
  user: Partial<User>;
}

const BaseInfo = ({ user }: IBaseInfoProps) => {

  const { data: hotelBaseInformationData, error, isLoading } = useGetHotelBaseInformationQuery({ hotelId: user?.hotelId });

  const { data: countriesData } = useGetCountriesQuery();
  const { data: currenciesData } = useGetCurrenciesQuery();

  const { hotelInfoType } = useAppSelector((state) => state.hotelSlice);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading hotel information</div>;

  return (
    <div className='mt-6'>
      {
        hotelInfoType === "base" ?
          <BaseInfoEditContainer
            hotelBaseInformationData={hotelBaseInformationData}
            countriesData={countriesData} 
            currenciesData={currenciesData}
            hotelId={user?.hotelId}
          />
          :
          <BaseInfoContainer hotelBaseInformationData={hotelBaseInformationData} />
      }
    </div>
  );
};

export default BaseInfo;