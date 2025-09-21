import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  hy: {
    translation: {
      hotel: 'Հյուրանոց',
      welcome: 'Բարի գալուստ',
      language: 'Լեզու',
      armenian: 'Հայերեն',
      russian: 'Ռուսերեն'
    },
  },
  ru: {
    translation: {
      hotel: 'Отель',
      welcome: 'Добро пожаловать',
      language: 'Язык',
      armenian: 'Армянский',
      russian: 'Русский'
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'hy', // Default to Armenian
    lng: 'hy', // Default language
    debug: import.meta.env.DEV,

    interpolation: {
      escapeValue: false, // React already escapes by default
    },

    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;
