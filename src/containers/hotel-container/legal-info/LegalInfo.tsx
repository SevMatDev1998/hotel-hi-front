import { FC, useState } from "react";
import LegalInfoContainer from "./LegalInfoContainer";
import LegalInfoEditContainer from "./LegalInfoEditContainer";
import { useGetHotelLegalInformationQuery } from "../../../services/hotel";
import { User } from "../../../types";
import { useGetCountriesQuery } from "../../../services/countries";
import { useGetCurrenciesQuery } from "../../../services/currencies/currencies.service";

interface ILegalInfoProps {
  user: Partial<User>;
}

const LegalInfo:FC<ILegalInfoProps> = ({ user } ) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const { data: hotelLegalInformationData, error, isLoading } = useGetHotelLegalInformationQuery({ hotelId: user?.hotelId });
  
    const { data: countriesData } = useGetCountriesQuery();
  

  return (
 <div className='mt-6'>
      {
        isEditing ?
         <LegalInfoEditContainer 
         setIsEditing={setIsEditing}
         hotelLegalInformationData={hotelLegalInformationData}
         countriesData={countriesData}
            hotelId={user?.hotelId}

         />
         :
          <LegalInfoContainer 
          setIsEditing={setIsEditing}
          hotelLegalInformationData={hotelLegalInformationData}
          />
      }
    </div>  )
}

export default LegalInfo