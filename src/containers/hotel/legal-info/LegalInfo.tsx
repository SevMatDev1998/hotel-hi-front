import { FC } from "react";
import LegalInfoContainer from "./LegalInfoContainer";
import LegalInfoEditContainer from "./LegalInfoEditContainer";
import { useGetHotelLegalInformationQuery } from "../../../services/hotel";
import { User } from "../../../types";
import { useGetCountriesQuery } from "../../../services/countries";
import useAppSelector from "../../../hooks/useAppSelector";
import { Button } from "../../../components/shared/Button";
import { useSetNavigationAccessStepMutation } from "../../../services/auth";
import { useTranslation } from "react-i18next";

interface ILegalInfoProps {
  user: Partial<User>;
}

const LegalInfo: FC<ILegalInfoProps> = ({ user }) => {
  const { t } = useTranslation();

  const { data: hotelLegalInformationData, error, isLoading } = useGetHotelLegalInformationQuery({ hotelId: user?.hotelId });

  const { data: countriesData } = useGetCountriesQuery();

  const { hotelInfoType } = useAppSelector((state) => state.hotelSlice);

  return (
    <div className='mt-6'>
      {
        hotelInfoType === "legal" ?
          <LegalInfoEditContainer
            hotelLegalInformationData={hotelLegalInformationData}
            countriesData={countriesData}
            hotelId={user?.hotelId}
          />
          :
          <LegalInfoContainer
            hotelLegalInformationData={hotelLegalInformationData}
          />
      }
    </div>)
}

export default LegalInfo