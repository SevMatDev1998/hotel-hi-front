import { useGetCountriesQuery } from '../../../services/countries';
import { LegalEntityType } from '../../../types';
import EditHotelPartnerForm from './EditHotelPartnerForm';
import { useGetHotelPartnerQuery } from '../../../services/partners';
import { useParams } from 'react-router-dom';

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