"use client";

import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DialogFormFooterProps {
  onCancel: () => void;
  cancelLabel: string;
  submitLabel: string;
  submitLoadingLabel: string;
  isSubmitting: boolean;
}

export function DialogFormFooter({
  onCancel,
  cancelLabel,
  submitLabel,
  submitLoadingLabel,
  isSubmitting,
}: DialogFormFooterProps) {
  return (
    <DialogFooter>
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
      >
        {cancelLabel}
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? submitLoadingLabel : submitLabel}
      </Button>
    </DialogFooter>
  );
}
