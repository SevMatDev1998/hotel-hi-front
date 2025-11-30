import { FC } from 'react';
import { changeHotelInfoType } from '../../../store/slices/hotel.slice';
import BlockContainer from '../../public/BlockContainer';
import useAppDispatch from '../../../hooks/useAppDisaptch';
import { useTranslation } from '../../../hooks/useTranslation';
import { Hotel } from '../../../types';

interface IBaseInfoContainerProps {
  hotelBaseInformationData: Partial<Hotel> | undefined;
}

const BaseInfoContainer: FC<IBaseInfoContainerProps> = ({ hotelBaseInformationData }) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  return (
    <BlockContainer shadow={false}>
      <div className='text-14 text-charcoal-gray'>
        <div className='flex items-center justify-between mb-5'>
          <h3 >{t("hotel.hotel_base_info")}</h3>
          <span onClick={() => dispatch(changeHotelInfoType("base"))}>
            <img src="/images/icons/edit-icon.svg" alt="edit icon" className="cursor-pointer" />
          </span>
        </div>

        <div className="space-y-10">
          {/* Hotel Name */}
          <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
            <div >
              <span >{t("hotel.hotel_name")} *</span>
            </div>
            <div >
              <span >{hotelBaseInformationData?.name}</span>
            </div>
          </div>
          <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
            <div >
              <span >{t("hotel.hotel_address")} *</span>
            </div>
            <div >
              <span >{hotelBaseInformationData?.city}</span>
            </div>
          </div>
          <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
            <div >
              <span >{t("hotel.contact_person")} *</span>
            </div>
            <div >
              <span >{hotelBaseInformationData?.contactPerson}</span>
            </div>
          </div>
           <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
            <div >
              <span >{t("hotel.phone_number")} *</span>
            </div>
            <div >
              <span >{hotelBaseInformationData?.phoneNumber}</span>
            </div>
          </div>
        </div>

      </div>
    </BlockContainer>
  );
};

export default BaseInfoContainer;