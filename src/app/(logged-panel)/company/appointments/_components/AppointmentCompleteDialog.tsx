"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTranslation } from "react-i18next";

interface AppointmentCompleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointmentDate: string;
  serviceName: string;
  onConfirm: () => void;
  isPending?: boolean;
}

export function AppointmentCompleteDialog({
  open,
  onOpenChange,
  appointmentDate,
  serviceName,
  onConfirm,
  isPending = false,
}: AppointmentCompleteDialogProps) {
  const { t } = useTranslation("appointments");

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("completeDialog.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("completeDialog.description", { service: serviceName, date: appointmentDate })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {t("completeDialog.cancelButton")}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={isPending}>
            {isPending ? t("completeDialog.confirmingButton") : t("completeDialog.confirmButton")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
