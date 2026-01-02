"use client";

import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CreateTransactionFormData } from "@/schemas";

interface TransactionDescriptionFieldProps {
  register: UseFormRegister<CreateTransactionFormData>;
  errors: FieldErrors<CreateTransactionFormData>;
}

export function TransactionDescriptionField({ register, errors }: TransactionDescriptionFieldProps) {
  const { t } = useTranslation("transactions");

  return (
    <div className="space-y-2">
      <Label htmlFor="description">{t("form.description")}</Label>
      <Input
        id="description"
        placeholder={t("form.descriptionPlaceholder")}
        {...register("description")}
      />
      {errors.description && (
        <p className="text-sm text-destructive">{errors.description.message}</p>
      )}
    </div>
  );
}
