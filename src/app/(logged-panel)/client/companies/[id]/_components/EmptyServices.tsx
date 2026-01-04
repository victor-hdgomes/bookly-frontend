import { useTranslation } from "react-i18next";

export function EmptyServices() {
  const { t } = useTranslation("booking");
  
  return (
    <div className="text-center py-12 text-muted-foreground">
      {t("service.noServices")}
    </div>
  );
}
