import { FC } from "react";
import { useTranslation } from "react-i18next";
import InfoBlock from "../../../components/shared/InfoBlock";
import BlockContainer from "../../public/BlockContainer";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import RegisterInput from "../../../components/shared/RegisterInput";
import { CreatePartnerFormData, CreatePartnerSchema } from "../../../yupValidation/PartnerValidation";
import { RegisterSelect } from "../../../components/shared/RegisterSelect";
import { Button } from "../../../components/shared/Button";
import { useAddHotelPartnerMutation } from "../../../services/partners";
import { useNavigate } from "react-router-dom";
import ApiEnum from "../../../enums/api.enum";


interface BaseInfoEditnoContainerProps {
  countryOptions: any[];
  legalEntityOptions: any[];
  hotelId?: string;
}

const NewHotelPartnersContainerForm: FC<BaseInfoEditnoContainerProps> = ({ countryOptions, legalEntityOptions, hotelId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<CreatePartnerFormData>({
    resolver: yupResolver(CreatePartnerSchema(t)),
  });

  const [addHotelPartner] = useAddHotelPartnerMutation();

  const onSubmit = async (data: CreatePartnerFormData) => {
    addHotelPartner({ data: data, hotelId: hotelId! }).unwrap();
    navigate(`/${ApiEnum.HOTEL_PARTNERS}`);
  };

  console.log(errors);


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
                <div >
                  <RegisterSelect
                    name="countryId"
                    options={countryOptions}
                    register={register}
                    errors={errors.countryId}
                    required
                    className='rounded-[5px]'
                    tr_name="registration_country_options"
                  />
                </div>
              </div>
              <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
                <div >
                  <span >{t("partners.tax_id")} *</span>
                </div>
                <div >
                  <RegisterInput
                    register={register}
                    errors={errors}
                    name="tin"
                    className='rounded-[5px]'

                  />
                </div>
              </div>

              <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
                <div >
                  <span >{t("partners.legal_person_name")} *</span>
                </div>
                <div className='grid grid-cols-[3fr_1fr] mobile:grid-cols-1 gap-6'>
                  <div  >
                    <RegisterInput
                      register={register}
                      errors={errors}
                      name="ltd"
                      className='rounded-[5px]'
                    />
                  </div>
                  <div >
                    <RegisterSelect
                      name="legalEntityTypeId"
                      options={legalEntityOptions}
                      register={register}
                      errors={errors}
                      required
                      className='rounded-[5px]'
                      tr_name="legal_entity_type_options"
                    />
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
                <div >
                  <span >{t("partners.product_logo")} *</span>
                </div>
                <div >
                  <RegisterInput
                    register={register}
                    errors={errors}
                    name="name"
                    className='rounded-[5px]'
                  />
                </div>
              </div>
              <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
                <div >
                  <span >{t("partners.email")} *</span>
                </div>
                <div >
                  <RegisterInput
                    register={register}
                    errors={errors}
                    name="email"
                    className='rounded-[5px]'
                  />
                </div>
              </div>


              <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
                <div >
                  <span >{t("hotel.phone_number")} *</span>
                </div>
                <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-4'>
                  <RegisterSelect
                    name="phoneCode"
                    options={countryOptions}
                    register={register}
                    // error={errors.courseId}
                    required
                    tr_name="registration_country_options"

                  />
                  <RegisterInput
                    register={register}
                    errors={errors}
                    label="Phone Number"
                    name="phone"
                    type="text"
                    className='rounded-[5px]'
                  />
                </div>
              </div>

              <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
                <div >
                  <span >{t("partners.account_number")} *</span>
                </div>
                <div >
                  <RegisterInput
                    register={register}
                    errors={errors}
                    name="accountNumber"
                    className='rounded-[5px]'
                  />
                </div>
              </div>



              <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
                <div >
                  <span >{t("partners.director")} *</span>
                </div>
                <div >
                  <RegisterInput
                    register={register}
                    errors={errors}
                    name="director"
                    className='rounded-[5px]'
                  />
                </div>
              </div>


            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button>
              {t("buttons.save")}
            </Button>
          </div>
        </form>

      </BlockContainer>
    </div>
  );
};

export default NewHotelPartnersContainerForm;