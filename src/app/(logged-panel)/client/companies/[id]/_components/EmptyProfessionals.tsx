import { useTranslation } from "react-i18next";

export function EmptyProfessionals() {
  const { t } = useTranslation("booking");

  return (
    <div className="text-center py-12 text-muted-foreground">
      {t("professional.noProfessionals")}
    </div>
  );
}
