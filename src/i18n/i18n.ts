import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
// Import translation files
import hyTranslation from './locales/hy/translation.json';
import ruTranslation from './locales/ru/translation.json';

// Translation resources
const resources = {
  hy: {
    translation: hyTranslation,
  },
  ru: {
    translation: ruTranslation,
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
