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
      <div className='flex items-center justify-between mb-6'>
        <h3 className="">{t("hotel.hotel_base_info")}</h3>
        <span onClick={() => setIsEditing(true)}>
          <img src="/images/icons/edit-icon.svg" alt="edit icon" className="cursor-pointer" />
        </span>
      </div>
      
      <div className="space-y-4">
        {/* Hotel Name */}
        <div className="flex">
          <div className="w-48 flex-shrink-0">
            <span className=" ">{t("hotel.hotel_address")} *</span>
          </div>
          <div className="flex-1">
            <span className=" ">Պետրություն, Ավագ, համանուն, Ավագ, համանուն</span>
          </div>
        </div>

        {/* Hotel Address */}
        <div className="flex">
          <div className="w-48 flex-shrink-0">
            <span className="  ">{t("hotel.contact_person")} *</span>
          </div>
          <div className="flex-1">
            <span className=" ">Ազգային Ա&ն</span>
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex">
          <div className="w-48 flex-shrink-0">
            <span className="">{t("hotel.phone_number")} *</span>
          </div>
          <div className="flex-1 flex items-center">
            <img src="/images/flags/am_flag.svg" alt="Armenia" className="w-5 h-3 mr-2" />
            <span className="">+ 374 93667255</span>
          </div>
        </div>

        {/* Currency */}
        <div className="flex">
          <div className="w-48 flex-shrink-0">
            <span >{t("hotel.value")} *</span>
          </div>
          <div className="flex-1 flex items-center">
            <img src="/images/flags/am_flag.svg" alt="Armenia" className="w-5 h-3 mr-2" />
            <span className=" mr-4">AMD</span>
          </div>
        </div>

        {/* Logo */}
        <div className="flex">
          <div className="w-48 flex-shrink-0">
            <span className="">{t("hotel.logo")}</span>
          </div>
          <div className="flex-1 flex items-start gap-4">
            {/* Current Logo */}
            <div className="w-16 h-16 border border-gray-300 rounded-md flex items-center justify-center bg-gray-50">
              <div className="w-12 h-12 bg-gray-400 rounded"></div>
            </div>
            
            {/* Logo Options */}
            <div className="flex gap-2">
              <div className="w-16 h-16 border border-gray-300 rounded-md flex items-center justify-center bg-teal-100">
                <div className="w-12 h-12 bg-teal-500 rounded"></div>
              </div>
              <div className="w-16 h-16 border border-gray-300 rounded-md flex items-center justify-center bg-teal-200">
                <div className="w-12 h-12 bg-teal-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </BlockContainer>
  );
};

export default BaseInfoContainer;