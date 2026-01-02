"use client";

import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CreateTransactionFormData } from "@/schemas";

interface TransactionAmountFieldProps {
  register: UseFormRegister<CreateTransactionFormData>;
  errors: FieldErrors<CreateTransactionFormData>;
}

export function TransactionAmountField({ register, errors }: TransactionAmountFieldProps) {
  const { t } = useTranslation("transactions");

  return (
    <div className="space-y-2">
      <Label htmlFor="amount">{t("form.amount")}</Label>
      <Input
        id="amount"
        type="number"
        step="0.01"
        placeholder={t("form.amountPlaceholder")}
        {...register("amount", { valueAsNumber: true })}
      />
      {errors.amount && (
        <p className="text-sm text-destructive">{errors.amount.message}</p>
      )}
    </div>
  );
}
