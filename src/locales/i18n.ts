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
import { transactionsLocales } from './transactions';
import { appointmentsLocales } from './appointments';
import { companiesTranslations } from './companies';
import { bookingTranslations } from './booking';
import notFoundLocales from './notFound';
import { settingsTranslations } from './settings';
import { subscriptionTranslations } from './subscription';

const resources = {
  pt: { profile: profile.pt, sidebar: sidebar.pt, dashboard: dashboard.pt, companyDashboard: companyDashboard.pt, services: services.pt, serviceGroups: serviceGroups.pt, errors: errors.pt, common: common.pt, landing: landing.pt, employees: employeesLocales.pt, transactions: transactionsLocales.pt, appointments: appointmentsLocales.pt, companies: companiesTranslations.pt.companies, booking: bookingTranslations.pt.booking, notFound: notFoundLocales.pt, settings: settingsTranslations.pt.settings, subscription: subscriptionTranslations.pt.subscription },
  en: { profile: profile.en, sidebar: sidebar.en, dashboard: dashboard.en, companyDashboard: companyDashboard.en, services: services.en, serviceGroups: serviceGroups.en, errors: errors.en, common: common.en, landing: landing.en, employees: employeesLocales.en, transactions: transactionsLocales.en, appointments: appointmentsLocales.en, companies: companiesTranslations.en.companies, booking: bookingTranslations.en.booking, notFound: notFoundLocales.en, settings: settingsTranslations.en.settings, subscription: subscriptionTranslations.en.subscription },
  es: { profile: profile.es, sidebar: sidebar.es, dashboard: dashboard.es, companyDashboard: companyDashboard.es, services: services.es, serviceGroups: serviceGroups.es, errors: errors.es, common: common.es, landing: landing.es, employees: employeesLocales.es, transactions: transactionsLocales.es, appointments: appointmentsLocales.es, companies: companiesTranslations.es.companies, booking: bookingTranslations.es.booking, notFound: notFoundLocales.es, settings: settingsTranslations.es.settings, subscription: subscriptionTranslations.es.subscription },
  it: { profile: profile.it, sidebar: sidebar.it, dashboard: dashboard.it, companyDashboard: companyDashboard.it, services: services.it, serviceGroups: serviceGroups.it, errors: errors.it, common: common.it, landing: landing.it, employees: employeesLocales.it, transactions: transactionsLocales.it, appointments: appointmentsLocales.it, companies: companiesTranslations.it.companies, booking: bookingTranslations.it.booking, notFound: notFoundLocales.it, settings: settingsTranslations.it.settings, subscription: subscriptionTranslations.it.subscription },
  fr: { profile: profile.fr, sidebar: sidebar.fr, dashboard: dashboard.fr, companyDashboard: companyDashboard.fr, services: services.fr, serviceGroups: serviceGroups.fr, errors: errors.fr, common: common.fr, landing: landing.fr, employees: employeesLocales.fr, transactions: transactionsLocales.fr, appointments: appointmentsLocales.fr, companies: companiesTranslations.fr.companies, booking: bookingTranslations.fr.booking, notFound: notFoundLocales.fr, settings: settingsTranslations.fr.settings, subscription: subscriptionTranslations.fr.subscription },
  de: { profile: profile.de, sidebar: sidebar.de, dashboard: dashboard.de, companyDashboard: companyDashboard.de, services: services.de, serviceGroups: serviceGroups.de, errors: errors.de, common: common.de, landing: landing.de, employees: employeesLocales.de, transactions: transactionsLocales.de, appointments: appointmentsLocales.de, companies: companiesTranslations.de.companies, booking: bookingTranslations.de.booking, notFound: notFoundLocales.de, settings: settingsTranslations.de.settings, subscription: subscriptionTranslations.de.subscription },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    ns: ['profile', 'sidebar', 'dashboard', 'companyDashboard', 'services', 'serviceGroups', 'errors', 'common', 'landing', 'employees', 'transactions', 'appointments', 'companies', 'booking', 'notFound', 'settings', 'subscription'],
    defaultNS: 'profile',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
