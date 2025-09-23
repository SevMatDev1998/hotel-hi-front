import { useTranslation } from 'react-i18next';
import BlockContainer from '../../containers/public/BlockContainer';

const Hotel = () => {
  const { t } = useTranslation();

  return (
    <div className='main-title'>
      <BlockContainer >
        <h1>{t('hotel')}</h1>
        <p>{t('welcome')}</p> 
      </BlockContainer>
      <h1>{t('hotel')}</h1>
      <p>{t('welcome')}</p>
    </div>
  );
};

export default Hotel;