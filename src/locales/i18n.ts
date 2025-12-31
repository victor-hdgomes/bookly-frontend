import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import profile from './profile';
import sidebar from './sidebar';
import dashboard from './dashboard';
import companyDashboard from './companyDashboard';

const resources = {
  pt: { profile: profile.pt, sidebar: sidebar.pt, dashboard: dashboard.pt, companyDashboard: companyDashboard.pt },
  en: { profile: profile.en, sidebar: sidebar.en, dashboard: dashboard.en, companyDashboard: companyDashboard.en },
  es: { profile: profile.es, sidebar: sidebar.es, dashboard: dashboard.es, companyDashboard: companyDashboard.es },
  it: { profile: profile.it, sidebar: sidebar.it, dashboard: dashboard.it, companyDashboard: companyDashboard.it },
  fr: { profile: profile.fr, sidebar: sidebar.fr, dashboard: dashboard.fr, companyDashboard: companyDashboard.fr },
  de: { profile: profile.de, sidebar: sidebar.de, dashboard: dashboard.de, companyDashboard: companyDashboard.de },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    ns: ['profile', 'sidebar', 'dashboard', 'companyDashboard'],
    defaultNS: 'profile',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
