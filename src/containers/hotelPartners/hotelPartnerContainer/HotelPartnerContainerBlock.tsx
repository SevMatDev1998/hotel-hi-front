import { FC } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/shared/Button';
import BlockContainer from '../../public/BlockContainer';
import { useTranslation } from '../../../hooks/useTranslation';
import RouteEnum from '../../../enums/route.enum';
import { Partner, PartnerStatus } from '../../../types';

interface IHotelPartnerContainerBlockProps {
  partner: Partner
}

const HotelPartnerContainerBlock: FC<IHotelPartnerContainerBlockProps> = ({ partner }) => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  console.log(partner.status);


  return (
    <BlockContainer shadow={false}>
      <div className='text-14 text-charcoal-gray'>
        <div className='flex items-center justify-between mb-5'>
          <h3 >{t("hotel.hotel_base_info")}</h3>
          {
            partner.status !== PartnerStatus.Approved &&
            <Button onClick={() => navigate(generatePath(RouteEnum.EDIT_HOTEL_PARTNER, {
              partnerId: partner.id,
            }))}>
              {t("partners.edit_partner")}
            </Button>
          }
        </div>
        <div className="space-y-8">
          {/* Hotel Name */}
          <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
            <div >
              <span >{t("partners.register_country")} *</span>
            </div>
            <div >
              <span >{partner?.name}</span>
            </div>
          </div>
          <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
            <div >
              <span >{t("partners.tax_id")} *</span>
            </div>
            <div >
              <span >{partner?.ltd}</span>
            </div>
          </div>
          <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
            <div >
              <span >{t("partners.legal_person_name")} *</span>
            </div>
            <div >
              <span >{partner?.name}</span>
            </div>
          </div>
          <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
            <div >
              <span >{t("partners.email")} *</span>
            </div>
            <div >
              <span >{partner.email}</span>
            </div>
          </div>
          <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
            <div >
              <span >{t("partners.phone_number")} *</span>
            </div>
            <div >
              <span >{partner.phone}</span>
            </div>
          </div>
          <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
            <div >
              <span >{t("partners.account_number")} *</span>
            </div>
            <div >
              <span >{partner.accountNumber}</span>
            </div>
          </div>
          <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
            <div >
              <span >{t("partners.director")} *</span>
            </div>
            <div >
              <span >{partner.director}</span>
            </div>
          </div>
        </div>

      </div>
    </BlockContainer >
  );
};

export default HotelPartnerContainerBlock;