import BlockContainer from '../../public/BlockContainer';
import { useTranslation } from '../../../hooks/useTranslation';
import { FC } from 'react';

interface IBaseInfoContainerProps {
setIsEditing: (value: boolean) => void;
}

const BaseInfoContainer:FC<IBaseInfoContainerProps> = ({setIsEditing}) => {
  const { t } = useTranslation();

  return (
    <BlockContainer shadow={false}>
      <div className='text-14 text-charcoal-gray'>
      <div className='flex items-center justify-between mb-5'>
        <h3 className="">{t("hotel.hotel_base_info")}</h3>
        <span onClick={() => setIsEditing(true)}>
          <img src="/images/icons/edit-icon.svg" alt="edit icon" className="cursor-pointer" />
        </span>
      </div>
      
      <div className="space-y-4">
        {/* Hotel Name */}
        <div className="flex">
          <div className="w-48 basis-48 flex-shrink-0">
            <p >{t("hotel.hotel_address")} *</p>
          </div>
          <div className="flex-1">
            <p>Պետրություն, Ավագ, համանուն, Ավագ, համանուն</p>
          </div>
        </div>

        {/* Hotel Address */}
        <div className="flex">
          <div className="w-48 flex-shrink-0">
            <p className="  ">{t("hotel.contact_person")} *</p>
          </div>
          <div className="flex-1">
            <p className=" ">Ազգային Ա&ն</p>
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex">
          <div className="w-48 flex-shrink-0">
            <p className="">{t("hotel.phone_number")} *</p>
          </div>
          <div className="flex-1 flex items-center">
            <img src="/images/flags/am_flag.svg" alt="Armenia" className="w-5 h-3 mr-2" />
            <p className="">+ 374 93667255</p>
          </div>
        </div>

        {/* Currency */}
        <div className="flex">
          <div className="w-48 flex-shrink-0">
            <p >{t("hotel.value")} *</p>
          </div>
          <div className="flex-1 flex items-center">
            <div className='rounded-[50%]'>
            <img src="/images/flags/am_flag.svg" alt="Armenia" className="w-4 h-4 mr-2" />
            </div>
            <p className=" mr-4">AMD</p>
          </div>
        </div>

    
      </div>
      </div>
    </BlockContainer>
  );
};

export default BaseInfoContainer;