import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "../components/shared/Button";
import RegisterInput from "../components/shared/RegisterInput";
import BlockContainer from "../containers/public/BlockContainer";
import { CommissionFormType, commissionSchema } from "../yupValidation/CommissionValidation";

interface ICommissionModalProps {
  onSubmit: (data: CommissionFormType) => void
}
const AddCommissionModal: ModalFC<ICommissionModalProps> = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommissionFormType>({
    resolver: yupResolver(commissionSchema),
  });

  const handleOnSubmit = (data: CommissionFormType) => {
    onSubmit(data)
    onCancel()
  }



  return (
    <BlockContainer>
      <div className="flex flex-col items-center p-4 space-y-5">
        <form
          className="w-full flex flex-col gap-5"
          onSubmit={handleSubmit(handleOnSubmit)}
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

export default AddCommissionModal