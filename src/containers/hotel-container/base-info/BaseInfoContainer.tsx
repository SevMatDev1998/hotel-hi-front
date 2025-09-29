import BlockContainer from '../../public/BlockContainer';
import { useTranslation } from '../../../hooks/useTranslation';
import { FC } from 'react';

interface IBaseInfoContainerProps {
  setIsEditing: (value: boolean) => void;
}

const BaseInfoContainer: FC<IBaseInfoContainerProps> = ({ setIsEditing }) => {
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
            <div className='grid grid-cols-[1fr_3fr] mobile:grid-cols-1 gap-2 items-center'>
              <div >
                <span >{t("hotel.hotel_name")} *</span>
              </div>
              <div >
                <span className='text-16 font-medium'>Grand Hotel</span>
              </div>
            </div>
          </div>

        </div>
    </BlockContainer>
  );
};

export default BaseInfoContainer;