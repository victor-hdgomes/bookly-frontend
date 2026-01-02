"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface DialogActionsProps {
  onCancel: () => void;
  isSubmitting: boolean;
  canSubmit: boolean;
}

export function DialogActions({ onCancel, isSubmitting, canSubmit }: DialogActionsProps) {
  const { t } = useTranslation("employees");

  return (
    <DialogFooter>
      <Button type="button" variant="outline" onClick={onCancel}>
        {t("cancel")}
      </Button>
      <Button type="submit" disabled={!canSubmit || isSubmitting}>
        {isSubmitting ? t("addEmployeeDialog.adding") : t("addEmployeeDialog.add")}
      </Button>
    </DialogFooter>
  );
}
