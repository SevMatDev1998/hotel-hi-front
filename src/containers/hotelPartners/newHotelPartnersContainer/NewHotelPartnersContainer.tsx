import useAppSelector from "../../../hooks/useAppSelector";
import { useGetCountriesQuery } from "../../../services/countries";
import { LegalEntityType } from "../../../types";
import NewHotelPartnersContainerForm from "./NewHotelPartnersContainerForm";

const NewHotelPartnersContainer = () => {

  const { data: countriesData } = useGetCountriesQuery();
  const { user } = useAppSelector(state => state.auth)

  const countryOptions = countriesData?.map((country) => ({
    value: country.id,
    label: country.name,
  })) || [];

  const legalEntityOptions = Object.values(LegalEntityType).map((value) => ({
    label: value,
    value,
  }));


  return (
    <NewHotelPartnersContainerForm countryOptions={countryOptions} legalEntityOptions={legalEntityOptions} hotelId={user?.hotelId} />
  );
};

export default NewHotelPartnersContainer;