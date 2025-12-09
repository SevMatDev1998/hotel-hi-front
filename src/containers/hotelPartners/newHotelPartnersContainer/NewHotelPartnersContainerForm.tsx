import { FC, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/shared/Button";
import InfoBlock from "../../../components/shared/InfoBlock";
import RegisterInput from "../../../components/shared/RegisterInput";
import { RegisterSelect } from "../../../components/shared/RegisterSelect";
import BlockContainer from "../../public/BlockContainer";
import InputValidationLayout from "../../../layouts/inputValidationLayout/InputValidationLayout";
import { useLazyDebounce } from "../../../hooks/useDebounse";
import { useAddHotelPartnerMutation } from "../../../services/partners";
import { CreatePartnerFormData, PartnerSchema } from "../../../yupValidation/PartnerValidation";
import ApiEnum from "../../../enums/api.enum";
import { Partner } from "../../../types";


interface NewHotelPartnersContainerFormProps {
  countryOptions: any[];
  legalEntityOptions: any[];
  hotelId?: string;
  onCheckPartnerByTin: (tin: string) => Promise<Partner | null>;
  partner: Partner | null;
}

const NewHotelPartnersContainerForm: FC<NewHotelPartnersContainerFormProps> = ({
  countryOptions,
  legalEntityOptions,
  hotelId,
  onCheckPartnerByTin,
  partner
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<CreatePartnerFormData>({
    resolver: yupResolver(PartnerSchema),
  });

  const [addHotelPartner] = useAddHotelPartnerMutation();
  const setLazyValue = useLazyDebounce();

  const tinValue = watch("tin");

  useEffect(() => {
    setLazyValue(async () => {
    if (!tinValue) { reset(); return; }
      await onCheckPartnerByTin(String(tinValue));
    }, 1000);
  }, [tinValue, onCheckPartnerByTin, setLazyValue]);

  useEffect(() => {    
    if (partner) {
      reset({
        tin: partner.tin,
        name: partner.name,
        email: partner.email,
        phone: partner.phone,
        director: partner.director,
        ltd: partner.ltd,
        accountNumber: partner.accountNumber,
        countryId: partner.countryId,
        legalEntityTypeId: partner.legalEntityTypeId,
      });
    }
  }, [partner, reset]);

  const onSubmit = async (data: CreatePartnerFormData) => {
    addHotelPartner({ data: data, hotelId: hotelId! }).unwrap();
    navigate(`/${ApiEnum.HOTEL_PARTNERS}`);
  };

  const isPartnerExisting = !!partner;

  return (
    <div className="flex flex-col gap-6">
      <h2>{t("partners.partners")}</h2>
      <InfoBlock text="Գործընկերների ցանկում ներառեք բոլոր այն կազմակերպություններին, որոնց ցանկանում եք տեղեկացնել հյուրանոցի կողմից գնային քաղականության փոփոխությունների մասին։ Կարող եք յուրաքանաչյուր գործընկերի համար սահմանել առանձին միջնորդավճարներ։" />
      <BlockContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <h3>{t("partners.add_partner")}</h3>
            <InfoBlock text="Լրացրեք տվյալները: Բոլոր *-ով դաշտերը պարտադիր են:" />
            <div className="space-y-4 ml-5">
              <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
                <div >
                  <span >{t("partners.register_country")} *</span>
                </div>
                <InputValidationLayout errors={errors} name="countryId">
                  <RegisterSelect
                    name="countryId"
                    options={countryOptions}
                    register={register}
                    className='rounded-[5px]'
                    tr_name="registration_country_options"
                    valueAsNumber
                    disabled={isPartnerExisting}
                  />
                </InputValidationLayout>
              </div>
              <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
                <div >
                  <span >{t("partners.tax_id")} *</span>
                </div>
                <InputValidationLayout errors={errors} name="tin">
                  <RegisterInput
                    register={register}
                    name="tin"
                    className='rounded-[5px]'
                  />
                </InputValidationLayout>
              </div>

              <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
                <div >
                  <span >{t("partners.legal_person_name")} *</span>
                </div>
                <div className='grid grid-cols-[3fr_1fr] mobile:grid-cols-1 gap-6'>
                  <InputValidationLayout errors={errors} name="ltd">
                    <RegisterInput
                      register={register}
                      name="ltd"
                      className='rounded-[5px]'
                      disabled={isPartnerExisting}
                    />
                  </InputValidationLayout>
                  <InputValidationLayout errors={errors} name="legalEntityTypeId">
                    <RegisterSelect
                      name="legalEntityTypeId"
                      options={legalEntityOptions}
                      register={register}
                      className='rounded-[5px]'
                      tr_name="legal_entity_type_options"
                      disabled={isPartnerExisting}
                    />
                  </InputValidationLayout>
                </div>
              </div>
              <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
                <div >
                  <span >{t("partners.product_logo")} *</span>
                </div>
                <InputValidationLayout errors={errors} name="name" >
                  <RegisterInput
                    register={register}
                    name="name"
                    className='rounded-[5px]'
                    disabled={isPartnerExisting}
                  />
                </InputValidationLayout>
              </div>
              <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
                <div >
                  <span >{t("partners.email")} *</span>
                </div>
                <InputValidationLayout errors={errors} name="email" >
                  <RegisterInput
                    register={register}
                    name="email"
                    type="email"
                    className='rounded-[5px]'
                    disabled={isPartnerExisting}
                  />
                </InputValidationLayout>
              </div>
              <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
                <div >
                  <span >{t("hotel.phone_number")} *</span>
                </div>
                <InputValidationLayout errors={errors} name="phone" >
                  <RegisterInput
                    register={register}
                    name="phone"
                    type="text"
                    className='rounded-[5px]'
                    disabled={isPartnerExisting}
                  />
                </InputValidationLayout>
              </div>
              <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
                <div >
                  <span >{t("partners.account_number")} *</span>
                </div>
                <InputValidationLayout errors={errors} name="accountNumber" >
                  <RegisterInput
                    register={register}
                    name="accountNumber"
                    className='rounded-[5px]'
                    disabled={isPartnerExisting}
                  />
                </InputValidationLayout>
              </div>
              <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
                <div >
                  <span >{t("partners.director")} *</span>
                </div>
                <InputValidationLayout errors={errors} name="director" >
                  <RegisterInput
                    register={register}
                    name="director"
                    className='rounded-[5px]'
                    disabled={isPartnerExisting}
                  />
                </InputValidationLayout>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button>
              {isPartnerExisting? t("buttons.save") : t("buttons.add")}
            </Button>
          </div>
        </form>

      </BlockContainer>
    </div>
  );
};

export default NewHotelPartnersContainerForm;