import React from 'react';
import BlockContainer from '../../public/BlockContainer';
import { useTranslation } from '../../../hooks/useTranslation';

const BaseInfoContainer = () => {
  const { t } = useTranslation();

  return (
      <BlockContainer>
        <div className='flex items-center justify-between'>
        <h3>{t("hotel.hotel_base_info")}</h3>
        <img src="/images/icons/edit-icon.svg" alt="edit icon" />
        </div>
      </BlockContainer>
  );
};

export default BaseInfoContainer;