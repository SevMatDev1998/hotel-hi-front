import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const currentLanguage = i18n.language;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">{t('language')}:</span>
      <div className="flex gap-1">
        <button
          onClick={() => changeLanguage('hy')}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            currentLanguage === 'hy'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {t('armenian')}
        </button>
        <button
          onClick={() => changeLanguage('ru')}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            currentLanguage === 'ru'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {t('russian')}
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
