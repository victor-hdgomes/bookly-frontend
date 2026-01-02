import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import profile from './profile';
import sidebar from './sidebar';
import dashboard from './dashboard';
import companyDashboard from './companyDashboard';
import services from './services';
import serviceGroups from './serviceGroups';
import errors from './errors';
import common from './common';
import landing from './landing';
import { employeesLocales } from './employees';

const resources = {
  pt: { profile: profile.pt, sidebar: sidebar.pt, dashboard: dashboard.pt, companyDashboard: companyDashboard.pt, services: services.pt, serviceGroups: serviceGroups.pt, errors: errors.pt, common: common.pt, landing: landing.pt, employees: employeesLocales.pt },
  en: { profile: profile.en, sidebar: sidebar.en, dashboard: dashboard.en, companyDashboard: companyDashboard.en, services: services.en, serviceGroups: serviceGroups.en, errors: errors.en, common: common.en, landing: landing.en, employees: employeesLocales.en },
  es: { profile: profile.es, sidebar: sidebar.es, dashboard: dashboard.es, companyDashboard: companyDashboard.es, services: services.es, serviceGroups: serviceGroups.es, errors: errors.es, common: common.es, landing: landing.es, employees: employeesLocales.es },
  it: { profile: profile.it, sidebar: sidebar.it, dashboard: dashboard.it, companyDashboard: companyDashboard.it, services: services.it, serviceGroups: serviceGroups.it, errors: errors.it, common: common.it, landing: landing.it, employees: employeesLocales.it },
  fr: { profile: profile.fr, sidebar: sidebar.fr, dashboard: dashboard.fr, companyDashboard: companyDashboard.fr, services: services.fr, serviceGroups: serviceGroups.fr, errors: errors.fr, common: common.fr, landing: landing.fr, employees: employeesLocales.fr },
  de: { profile: profile.de, sidebar: sidebar.de, dashboard: dashboard.de, companyDashboard: companyDashboard.de, services: services.de, serviceGroups: serviceGroups.de, errors: errors.de, common: common.de, landing: landing.de, employees: employeesLocales.de },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    ns: ['profile', 'sidebar', 'dashboard', 'companyDashboard', 'services', 'serviceGroups', 'errors', 'common', 'landing', 'employees'],
    defaultNS: 'profile',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
