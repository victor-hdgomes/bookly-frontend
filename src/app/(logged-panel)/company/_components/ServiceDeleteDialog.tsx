"use client";

import { ConfirmDialog } from "@/components/globals";
import { useTranslation } from "react-i18next";

interface ServiceDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName: string;
  onConfirm: () => Promise<void>;
  isPending?: boolean;
}

export function ServiceDeleteDialog({
  open,
  onOpenChange,
  serviceName,
  onConfirm,
  isPending = false,
}: ServiceDeleteDialogProps) {
  const { t } = useTranslation("services");

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      onConfirm={onConfirm}
      title={t("deleteDialog.title")}
      description={t("deleteDialog.description", { serviceName })}
      confirmText={t("deleteDialog.deleteButton")}
      cancelText={t("deleteDialog.cancelButton")}
      variant="destructive"
      isPending={isPending}
      namespace="services"
    />
  );
}
