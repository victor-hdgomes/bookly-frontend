"use client";

import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionType } from "@/types";

interface TransactionTypeFieldProps {
  value: TransactionType;
  onChange: (value: TransactionType) => void;
  error?: string;
}

export function TransactionTypeField({ value, onChange, error }: TransactionTypeFieldProps) {
  const { t } = useTranslation("transactions");

  return (
    <div className="space-y-2">
      <Label htmlFor="type">{t("form.type")}</Label>
      <Select value={value} onValueChange={(val) => onChange(val as TransactionType)}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={TransactionType.INCOME}>
            {t("filters.income")}
          </SelectItem>
          <SelectItem value={TransactionType.EXPENSE}>
            {t("filters.expense")}
          </SelectItem>
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
