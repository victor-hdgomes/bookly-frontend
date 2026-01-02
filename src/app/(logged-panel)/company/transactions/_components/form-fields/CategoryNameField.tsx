"use client";

import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CreateTransactionCategoryFormData } from "@/schemas";

interface CategoryNameFieldProps {
  register: UseFormRegister<CreateTransactionCategoryFormData>;
  errors: FieldErrors<CreateTransactionCategoryFormData>;
}

export function CategoryNameField({ register, errors }: CategoryNameFieldProps) {
  const { t } = useTranslation("transactions");

  return (
    <div className="space-y-2">
      <Label htmlFor="name">{t("categories.name")}</Label>
      <Input
        id="name"
        placeholder={t("categories.namePlaceholder")}
        {...register("name")}
      />
      {errors.name && (
        <p className="text-sm text-destructive">{errors.name.message}</p>
      )}
    </div>
  );
}
