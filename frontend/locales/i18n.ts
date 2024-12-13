// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translation files
import enTranslation from './en/common.json';
import zhTranslation from './zh/common.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    zh: { translation: zhTranslation },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
