import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "../components/shared/Button";
import RegisterInput from "../components/shared/RegisterInput";
import BlockContainer from "../containers/public/BlockContainer";
import { useUpdateHotelAvailabilityDateCommissionsMutation } from "../services/hotelAvailability/hotelAvailability.service";
import { CommissionFormType, commissionSchema } from "../yupValidation/CommissionValidation";

interface ICommissionModalProps {
  commission: CommissionFormType;
  availabilityId: string;
  onCancel: () => void;
}
const EditCommissionModal: ModalFC<ICommissionModalProps> = ({ commission, availabilityId,  onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommissionFormType>({
    resolver: yupResolver(commissionSchema),
    defaultValues: commission
  });

  const [updateHotelAvailabilityDateCommissions] = useUpdateHotelAvailabilityDateCommissionsMutation();

  
  const handleFormSubmit = (data: CommissionFormType) => {
    updateHotelAvailabilityDateCommissions({ hotelAvailabilityId: availabilityId, body: data }).unwrap()
    onCancel()
  }



  return (
    <BlockContainer>
      <div className="flex flex-col items-center p-4 space-y-5">
        <form
          className="w-full flex flex-col gap-5"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <RegisterInput
            register={register}
            errors={errors}
            label="Room Fee"
            name="roomFee"
            type="number"
          />
          <RegisterInput
            register={register}
            errors={errors}
            label="Food Fee"
            name="foodFee"
            type="number"
          />
          <RegisterInput
            register={register}
            errors={errors}
            label="Additional Fee"
            name="additionalFee"
            type="number"
          />
          <RegisterInput
            register={register}
            errors={errors}
            label="Service Fee"
            name="serviceFee"
            type="number"
          />

          <div className="flex justify-end gap-3">
            <Button type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" >
              Save
            </Button>
          </div>
        </form>
      </div>
    </BlockContainer>
  );
};

export default EditCommissionModal;