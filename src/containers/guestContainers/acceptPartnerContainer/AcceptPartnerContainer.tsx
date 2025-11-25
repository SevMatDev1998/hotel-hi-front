import { useParams } from "react-router-dom";
import { useGetPartnerInformationQuery } from "../../../services/guests/guest.service";
import { useGetCountriesQuery } from "../../../services/countries";
import { LegalEntityType } from "../../../types";
import AcceptPartnerForm from "./AcceptPartnerForm";

const AcceptPartnerContainer = () => {

  const { partnerId } = useParams();

  const { data: partnerData } = useGetPartnerInformationQuery({ partnerId: partnerId! }, { refetchOnMountOrArgChange: true });


  const { data: countriesData } = useGetCountriesQuery();

  const countryOptions = countriesData?.map((country) => ({
    value: country.id,
    label: country.name,
  })) || [];

  const legalEntityOptions = Object.values(LegalEntityType).map((value) => ({
    label: value,
    value,
  }));

 
  return (
    <div>
      {partnerData &&
        <AcceptPartnerForm
          countryOptions={countryOptions}
          legalEntityOptions={legalEntityOptions}
          partnerData={partnerData}
        />
      }

    </div>
  );
};

export default AcceptPartnerContainer;