import { useNavigate, useParams } from "react-router-dom";
import AcceptPartnerForm from "./AcceptPartnerForm";
import { useGetCountriesQuery } from "../../../services/countries";
import { useGetPartnerInformationQuery } from "../../../services/guests/guest.service";
import RouteEnum from "../../../enums/route.enum";
import { LegalEntityType, PartnerStatus } from "../../../types";

const AcceptPartnerContainer = () => {

  const { partnerId } = useParams();
  const navigate = useNavigate();

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

  if(partnerData && partnerData.status === PartnerStatus.Approved){
    navigate(`${RouteEnum.GUEST_ACCEPT_PARTNER_ACCEPTED}`);
    return
  }
  
  return (
    <div>
      {partnerData && countryOptions.length > 0 &&
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