"use client";

import { ConfirmDialog } from "./ConfirmDialog";

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  namespace?: string;
  confirmText?: string;
  cancelText?: string;
  isPending?: boolean;
}

export function DeleteConfirmDialog(props: DeleteConfirmDialogProps) {
  return <ConfirmDialog {...props} variant="destructive" />;
}
