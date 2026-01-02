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

interface AppointmentDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointmentDate: string;
  onConfirm: () => void;
}

export function AppointmentDeleteDialog({
  open,
  onOpenChange,
  appointmentDate,
  onConfirm,
}: AppointmentDeleteDialogProps) {
  const { t } = useTranslation("appointments");

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("deleteDialog.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("deleteDialog.description", { date: appointmentDate })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("deleteDialog.cancelButton")}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {t("deleteDialog.confirmButton")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
