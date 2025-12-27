import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import profile from './profile';
import sidebar from './sidebar';

const resources = {
  pt: { profile: profile.pt, sidebar: sidebar.pt },
  en: { profile: profile.en, sidebar: sidebar.en },
  es: { profile: profile.es, sidebar: sidebar.es },
  it: { profile: profile.it, sidebar: sidebar.it },
  fr: { profile: profile.fr, sidebar: sidebar.fr },
  de: { profile: profile.de, sidebar: sidebar.de },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    ns: ['profile', 'sidebar'],
    defaultNS: 'profile',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
