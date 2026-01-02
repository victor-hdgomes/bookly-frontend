"use client";

import { useTranslation } from "react-i18next";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CreateTransactionFormData } from "@/schemas";

interface TransactionNotesFieldProps {
  register: UseFormRegister<CreateTransactionFormData>;
  errors: FieldErrors<CreateTransactionFormData>;
}

export function TransactionNotesField({ register, errors }: TransactionNotesFieldProps) {
  const { t } = useTranslation("transactions");

  return (
    <div className="space-y-2">
      <Label htmlFor="notes">{t("form.notes")}</Label>
      <Textarea
        id="notes"
        placeholder={t("form.notesPlaceholder")}
        {...register("notes")}
        rows={3}
      />
      {errors.notes && (
        <p className="text-sm text-destructive">{errors.notes.message}</p>
      )}
    </div>
  );
}
