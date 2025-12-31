import { useTranslation } from "react-i18next";

export interface Language {
  code: string;
  name: string;
}

export const useLanguages = () => {
  const { i18n } = useTranslation();

  const languageLabels: Record<string, string> = {
    pt: "Português",
    en: "English",
    es: "Español",
    de: "Deutsch",
    fr: "Français",
    it: "Italiano",
  };

  const languages: Language[] = Object.keys(i18n.options.resources || {})
    .filter((l) => languageLabels[l])
    .map((code) => ({
      code,
      name: languageLabels[code],
    }));

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  return {
    languages,
    currentLanguage: i18n.language,
    changeLanguage,
  };
};

