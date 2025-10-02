import { useState } from 'react';
import BaseInfoContainer from './BaseInfoContainer';
import BaseInfoEditContainer from './BaseInfoEditContainer';
import { useGetHotelBaseInformationQuery } from '../../../services/hotel/hotel.service';
import { User } from '../../../types';
import { useGetCountriesQuery } from '../../../services/countries/countries.service';
import { useGetCurrenciesQuery } from '../../../services/currencies/currencies.service';

interface IBaseInfoProps {
  user: Partial<User>;
}

const BaseInfo = ({ user }: IBaseInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const { data: hotelBaseInformationData, error, isLoading } = useGetHotelBaseInformationQuery({ hotelId: user?.hotelId });

  const { data: countriesData } = useGetCountriesQuery();
  const { data: currenciesData } = useGetCurrenciesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading hotel information</div>;

  return (
    <div className='mt-6'>
      {
        isEditing ?
          <BaseInfoEditContainer
            setIsEditing={setIsEditing}
            hotelBaseInformationData={hotelBaseInformationData}
            countriesData={countriesData} 
            currenciesData={currenciesData}
            hotelId={user?.hotelId}
          />
          :
          <BaseInfoContainer setIsEditing={setIsEditing} hotelBaseInformationData={hotelBaseInformationData} />
      }
    </div>
  );
};

export default BaseInfo;