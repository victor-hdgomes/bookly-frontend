"use client";

import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CreateTransactionFormData } from "@/schemas";

interface TransactionDateFieldProps {
  register: UseFormRegister<CreateTransactionFormData>;
  errors: FieldErrors<CreateTransactionFormData>;
}

export function TransactionDateField({ register, errors }: TransactionDateFieldProps) {
  const { t } = useTranslation("transactions");

  return (
    <div className="space-y-2">
      <Label htmlFor="date">{t("form.date")}</Label>
      <Input
        id="date"
        type="date"
        {...register("date")}
      />
      {errors.date && (
        <p className="text-sm text-destructive">{errors.date.message}</p>
      )}
    </div>
  );
}
