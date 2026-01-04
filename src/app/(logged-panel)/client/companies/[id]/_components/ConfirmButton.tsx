import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ConfirmButtonProps {
  onConfirm: () => void;
  isLoading: boolean;
}

export function ConfirmButton({ onConfirm, isLoading }: ConfirmButtonProps) {
  const { t } = useTranslation("booking");

  return (
    <Button
      size="lg"
      className="w-full h-14 text-base font-semibold"
      onClick={onConfirm}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          {t("navigation.loading")}
        </>
      ) : (
        t("confirm.confirmButton")
      )}
    </Button>
  );
}
