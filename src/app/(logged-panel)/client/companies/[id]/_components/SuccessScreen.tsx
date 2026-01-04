import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export function SuccessScreen() {
  const { t } = useTranslation("booking");

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted/20">
      <Card className="max-w-md w-full p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{t("confirm.success")}</h2>
          <p className="text-muted-foreground">
            {t("confirm.redirecting")}
          </p>
        </div>
      </Card>
    </div>
  );
}
