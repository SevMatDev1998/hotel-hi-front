import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "../components/shared/Button";
import RegisterInput from "../components/shared/RegisterInput";
import BlockContainer from "../containers/public/BlockContainer";
import { CommissionFormType, commissionSchema } from "../yupValidation/CommissionValidation";
import InputValidationLayout from "../layouts/inputValidationLayout/InputValidationLayout";
import { useTranslation } from "../hooks/useTranslation";
import InfoBlock from "../components/shared/InfoBlock";

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

    const { t } = useTranslation();
  const handleOnSubmit = (data: CommissionFormType) => {
    onSubmit(data)
    onCancel()
  }

  return (
    <BlockContainer>
      <h3>{t("price_policy_dates.set_commission")}</h3>
      <InfoBlock text="Նոր կարգավորվան գնային քաղաքականությունն ընտրելուց առաջ սահմանեք դրա համար ստանդարտ միջնորդավճարը: Գործընկերներին կծանուցվեն սահմանված միջնորդավճարով գնացուցակները: Ծանուցումից առաջ հնարավոր է նախընտրելի գործընկերոջ համար փոփոխել միջնորդավճարը:"/>
      <div className="flex flex-col items-center p-4 space-y-5">
        <form
          className="w-full flex flex-col gap-5"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <InputValidationLayout errors={errors} name="roomFee">
          <RegisterInput
            register={register}
            label="Room Fee"
            name="roomFee"
            type="number"
          />
          </InputValidationLayout>
          <InputValidationLayout errors={errors} name="foodFee">
          <RegisterInput
            register={register}
            label="Food Fee"
            name="foodFee"
            type="number"
          />
          </InputValidationLayout>
          <InputValidationLayout errors={errors} name="additionalFee">

          <RegisterInput
            register={register}
            label="Additional Fee"
            name="additionalFee"
            type="number"
          />
          </InputValidationLayout>
          <InputValidationLayout errors={errors} name="serviceFee">
          <RegisterInput
            register={register}
            label="Service Fee"
            name="serviceFee"
            type="number"
          />
          </InputValidationLayout>

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