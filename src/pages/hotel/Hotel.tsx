import { useTranslation } from 'react-i18next';

const Hotel = () => {
  const { t } = useTranslation();

  return (
    <div className='main-title'>
      <h1>{t('hotel')}</h1>
      <p>{t('welcome')}</p>
    </div>
  );
};

export default Hotel;