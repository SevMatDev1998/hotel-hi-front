import { Button } from "../components/shared/Button";
import { useTranslation } from "../hooks/useTranslation";
import InfoBlock from "../components/shared/InfoBlock";
import { useGetHotelServiceAvailabilityQuery } from "../services/hotelServiceAvailability";

interface IMakeServiceAvailabilityModalProps {
  hotelServiceId: string;
  onSubmit: (payload: any) => void;
  onCancel?: () => void;
}

const MakeServiceAvailabilityModal: ModalFC<IMakeServiceAvailabilityModalProps> = ({ hotelServiceId, onSubmit, onCancel }) => {
 
    console.log(hotelServiceId);
    const {data:hotelServiceAvailability} = useGetHotelServiceAvailabilityQuery({hotelServiceId})

    console.log(hotelServiceAvailability);
    
  const { t } = useTranslation();

  return (
    <div className="p-5 flex flex-col space-y-5 ">
      <h3 >
        {t("rooms.select_room_parts")}
      </h3>
      <InfoBlock text="You will have the opportunity to receive reservations during the mentioned period. Also to make changes through price regulation." />
     
      <div className="flex justify-end gap-2">
        <Button
          onClick={()=>{}}
        >
          {t("buttons.save")}
        </Button>
      </div>
    </div>
  );
};

export default MakeServiceAvailabilityModal;
