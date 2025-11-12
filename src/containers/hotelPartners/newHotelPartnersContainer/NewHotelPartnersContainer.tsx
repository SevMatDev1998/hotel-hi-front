import useAppSelector from "../../../hooks/useAppSelector";
import { useGetCountriesQuery } from "../../../services/countries";
import { LegalEntityType, Partner } from "../../../types";
import NewHotelPartnersContainerForm from "./NewHotelPartnersContainerForm";
import { useLazyGetHotelPartnerByTinQuery } from "../../../services/partners";
import { useCallback, useState } from "react";

const NewHotelPartnersContainer = () => {

  const { data: countriesData } = useGetCountriesQuery();
  const { user } = useAppSelector(state => state.auth);
  const [getPartnerByTin] = useLazyGetHotelPartnerByTinQuery();
  const [partner, setPartner] = useState<Partner | null>(null);

  const countryOptions = countriesData?.map((country) => ({
    value: country.id,
    label: country.name,
  })) || [];

  const legalEntityOptions = Object.values(LegalEntityType).map((value) => ({
    label: value,
    value,
  }));

  const handleCheckPartnerByTin = useCallback(async (tin: string): Promise<Partner | null> => {
    try {
      const result = await getPartnerByTin({ tin }).unwrap();
      setPartner(result || null);
      return result || null;
    } catch {
      setPartner(null);
      return null;
    }
  }, [getPartnerByTin]);

  return (
    <NewHotelPartnersContainerForm
      countryOptions={countryOptions}
      legalEntityOptions={legalEntityOptions}
      hotelId={user?.hotelId}
      onCheckPartnerByTin={handleCheckPartnerByTin}
      partner={partner}
    />
  );
};

export default NewHotelPartnersContainer;