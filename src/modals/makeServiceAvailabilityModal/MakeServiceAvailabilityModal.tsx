import { Button } from "../../components/shared/Button";
import { useTranslation } from "../../hooks/useTranslation";
import InfoBlock from "../../components/shared/InfoBlock";
import { useGetHotelServiceAvailabilityQuery } from "../../services/hotelServiceAvailability";
import MakeServiceAvailabilityModalForm from "./MakeServiceAvailabilityModalForm";

interface IMakeServiceAvailabilityModalProps {
  hotelServiceId: string;
  onSubmit: (payload: any) => void;
  onCancel?: () => void;
}

const MakeServiceAvailabilityModal: ModalFC<IMakeServiceAvailabilityModalProps> = ({ hotelServiceId, onSubmit, onCancel }) => {
 
    console.log(hotelServiceId);
    const {data:hotelServiceAvailabilities} = useGetHotelServiceAvailabilityQuery({hotelServiceId})

    
  const { t } = useTranslation();

  return (
    <div className="p-5 flex flex-col space-y-5 ">
      <h3 >
        {t("shamanel hasaneliutyun")}
      </h3>

      <MakeServiceAvailabilityModalForm   hotelServiceAvailabilities={hotelServiceAvailabilities} hotelServiceId={hotelServiceId}/>

    </div>
  );
};

export default MakeServiceAvailabilityModal;
