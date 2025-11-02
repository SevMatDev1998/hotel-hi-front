import { Button } from "../components/shared/Button";
import { useDeleteHotelAvailabilityDateCommissionsMutation } from "../services/hotelAvailability/hotelAvailability.service";

interface IDeleteCommissionModalProps {
  availabilityId: string;
  onCancel: () => void;
}
const DeleteCommissionModal: ModalFC<IDeleteCommissionModalProps> = ({  onCancel, availabilityId }) => {
  console.log(availabilityId);

  const [deleteHotelAvailabilityDateCommissions] = useDeleteHotelAvailabilityDateCommissionsMutation();

  const handleDelete = () => {
    deleteHotelAvailabilityDateCommissions({ hotelAvailabilityId: availabilityId });
  };

  return (
      <div className="flex flex-col items-center p-4 space-y-5">
        <p className="text-18 font-semibold ">You are about to delete a commission</p>
        <p className="text-14">Are you sure you want to delete this commission?</p>
        <div className="flex justify-between  w-[100%] space-x-2">
          <Button onClick={onCancel} className="bg-ash-gray text-dusty-teal" >Cancel</Button>
          <Button onClick={() => { handleDelete(); if (onCancel) onCancel() }} >Confirm</Button>
        </div>
      </div>
  )
}
export default DeleteCommissionModal