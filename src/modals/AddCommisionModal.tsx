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
  onCancel: () => void
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
      <InfoBlock text="Նոր կարգավորվան գնային քաղաքականությունն ընտրելուց առաջ սահմանեք դրա համար ստանդարտ միջնորդավճարը: Գործընկերներին կծանուցվեն սահմանված միջնորդավճարով գնացուցակները: Ծանուցումից առաջ հնարավոր է նախընտրելի գործընկերոջ համար փոփոխել միջնորդավճարը:" />
      <div className="flex flex-col items-center p-4 space-y-5">
        <form
          className="w-full flex flex-col gap-5"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <InputValidationLayout  errors={errors} name="roomFee" errorClassName="text-[11px]">
            <div className="grid grid-cols-10 gap-1 mobile:grid-cols-1 items-center">
              <p className="col-span-2 mobile:col-span-1 text-11 text-end mobile:text-start" >{t("price_policy_dates.from_room")}</p>
              <RegisterInput
                register={register}
                name="roomFee"
                type="number"
                className="w-[35px] mobile:w-[60px] px-[1px] text-11 py-[2px] rounded-md col-span-1 mobile:col-span-1"
                hideSpinner={true}
              />
              <p className="col-span-7 mobile:col-span-1 text-11">{t("price_policy_dates.from_room_condition")}</p>
            </div>
          </InputValidationLayout>
          <InputValidationLayout errors={errors} name="foodFee" errorClassName="text-[11px]">
            <div className="grid grid-cols-10 gap-1 mobile:grid-cols-1 items-center">
              <p className="col-span-2 mobile:col-span-1 text-11 text-end mobile:text-start" >{t("price_policy_dates.from_food")}</p>
              <RegisterInput
                register={register}
                name="foodFee"
                type="number"
                className="w-[35px] mobile:w-[60px] px-[1px] text-11 py-[2px] rounded-md col-span-1 mobile:col-span-1"
                hideSpinner={true}
           />
              <p className="col-span-7 mobile:col-span-1 text-11">{t("price_pol icy_dates.from_food_condition")}</p>
            </div>
          </InputValidationLayout>
          <InputValidationLayout errors={errors} name="additionalFee" errorClassName="text-[11px]">
            <div className="grid grid-cols-10 gap-1 mobile:grid-cols-1 items-center">
              <p className="col-span-2 mobile:col-span-1 text-11 text-end mobile:text-start" >{t("price_policy_dates.from_additional")}</p>
              <RegisterInput
                register={register}
                name="additionalFee"
                type="number"
                className="w-[35px] mobile:w-[60px] px-[1px] text-11 py-[2px] rounded-md col-span-1 mobile:col-span-1"
                hideSpinner={true}
            />
              <p className="col-span-7 mobile:col-span-1 text-11">{t("price_policy_dates.from_additional_condition")}</p>
            </div>
          </InputValidationLayout>
          <InputValidationLayout errors={errors} name="serviceFee" errorClassName="text-[11px]">
            <div className="grid grid-cols-10 gap-1 mobile:grid-cols-1 items-center">
              <p className="col-span-2 mobile:col-span-1 text-11 text-end mobile:text-start" >{t("price_policy_dates.from_service")}</p>
              <RegisterInput
                register={register}
                name="serviceFee"
                type="number"
                className="w-[35px] mobile:w-[60px] px-[1px] text-11 py-[2px] rounded-md col-span-1 mobile:col-span-1"
                hideSpinner={true}
                />
              <p className="col-span-7 mobile:col-span-1 text-11">{t("price_policy_dates.from_service_condition")}</p>
            </div>
          </InputValidationLayout>
          <div className="flex justify-end gap-3">
            <Button variant="text" type="button" onClick={onCancel}>
              {t("buttons.cancel")}
            </Button>
            <Button type="submit" >
              {t("buttons.save")}
            </Button>
          </div>
        </form>
      </div>
    </BlockContainer>
  );
};

export default AddCommissionModal