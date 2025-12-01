import { useParams } from 'react-router-dom';
import EditHotelPartnerForm from './EditHotelPartnerForm';
import { useGetCountriesQuery } from '../../../services/countries';
import { useGetHotelPartnerQuery } from '../../../services/partners';
import { LegalEntityType } from '../../../types';

const EditHotelPartnerContainer = () => {


  const { partnerId } = useParams<{ partnerId: string }>();


  const { data: countriesData } = useGetCountriesQuery();

  const { data: partnerData } = useGetHotelPartnerQuery({partnerId: partnerId!});

  const countryOptions = countriesData?.map((country) => ({
    value: country.id,
    label: country.name,
  })) || [];

  const legalEntityOptions = Object.values(LegalEntityType).map((value) => ({
    label: value,
    value,
  }));


  return (
    partnerData &&
    <EditHotelPartnerForm
      countryOptions={countryOptions}
      legalEntityOptions={legalEntityOptions}
      partnerData={partnerData}
    />
  );
};

export default EditHotelPartnerContainer;