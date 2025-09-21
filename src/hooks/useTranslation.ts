import { useTranslation as useI18nTranslation } from 'react-i18next';

export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();
  
  const changeLanguage = (language: 'hy' | 'ru') => {
    i18n.changeLanguage(language);
  };
  
  const getCurrentLanguage = () => i18n.language as 'hy' | 'ru';
  
  return {
    t,
    i18n,
    changeLanguage,
    getCurrentLanguage,
    isArmenian: getCurrentLanguage() === 'hy',
    isRussian: getCurrentLanguage() === 'ru',
  };
};
