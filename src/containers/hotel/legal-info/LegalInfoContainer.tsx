import useAppDispatch from "../../../hooks/useAppDisaptch";
import { useTranslation } from "../../../hooks/useTranslation";
import { changeHotelInfoType } from "../../../store/slices/hotel.slice";
import { Hotel } from "../../../types";
import BlockContainer from "../../public/BlockContainer";


interface ILegalInfoContainerProps {
  hotelLegalInformationData?: Partial<Hotel>
}

const LegalInfoContainer = ({ hotelLegalInformationData }: ILegalInfoContainerProps) => {

  const dispatch = useAppDispatch();
  
  const { t } = useTranslation();

  return (
    <BlockContainer shadow={false}>
      <div className='text-14 text-charcoal-gray'>
        <div className='flex items-center justify-between mb-5'>
          <h3 className="">{t("hotel.hotel_legal_info")}</h3>
          <span onClick={() => dispatch(changeHotelInfoType("none"))}>
            <img src="/images/icons/edit-icon.svg" alt="edit icon" className="cursor-pointer" />
          </span>
        </div>

        <div className="space-y-10">
          {/* Hotel Name */}
          <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
            <div >
              <span>{t("hotel.legal_name")} *</span>
            </div>
            <div >
              <span >{hotelLegalInformationData?.legalPerson}</span>
            </div>
          </div>
          <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
            <div >
              <span >{t("hotel.legal_address")} *</span>
            </div>
            <div >
              <span >{hotelLegalInformationData?.countryId}{hotelLegalInformationData?.registerCity}</span>
            </div>
          </div>
          <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
            <div >
              <span >{t("hotel.tax_id")} *</span>
            </div>
            <div >
              <span >{hotelLegalInformationData?.tinNumber}</span>
            </div>
          </div>

          <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
            <div >
              <span >{t("hotel.account_number")} *</span>
            </div>
            <div >
              <span >{hotelLegalInformationData?.tinNumber}</span>
            </div>
          </div>


          <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
            <div >
              <span >{t("hotel.director")} *</span>
            </div>
            <div >
              <span >{hotelLegalInformationData?.director}</span>
            </div>
          </div>


          <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
            <div >
              <span >{t("hotel.adress_to_get_emails")} *</span>
            </div>
            <div >
              <span >{hotelLegalInformationData?.priceSendEmail}</span>
            </div>
          </div>
        </div>

      </div>
    </BlockContainer>
  )
}

export default LegalInfoContainer