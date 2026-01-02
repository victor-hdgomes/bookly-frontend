"use client";

import { Button } from "@/components/ui/button";

interface DialogActionsProps {
  onCancel: () => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  submitVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export function DialogActions({ 
  onCancel, 
  onSubmit,
  isSubmitting = false, 
  submitLabel = "Salvar",
  cancelLabel = "Cancelar",
  submitVariant = "default"
}: DialogActionsProps) {
  return (
    <div className="flex justify-end gap-3">
      <Button type="button" variant="outline" onClick={onCancel}>
        {cancelLabel}
      </Button>
      <Button 
        type={onSubmit ? "button" : "submit"} 
        onClick={onSubmit}
        disabled={isSubmitting}
        variant={submitVariant}
      >
        {isSubmitting ? "..." : submitLabel}
      </Button>
    </div>
  );
}
