import React from 'react';
import BlockContainer from '../public/BlockContainer';
import { useTranslation } from '../../hooks/useTranslation';

const BaseInfoContainer = () => {
  const { t } = useTranslation();

  return (
    <BlockContainer>
      <h3>{t("hotel.base_info")}</h3>
    </BlockContainer>
  );
};

export default BaseInfoContainer;