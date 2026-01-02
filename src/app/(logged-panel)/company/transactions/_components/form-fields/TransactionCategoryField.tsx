"use client";

import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionCategory } from "@/types";

interface TransactionCategoryFieldProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  categories: TransactionCategory[] | undefined;
  error?: string;
  onAddCategory?: () => void;
}

export function TransactionCategoryField({ 
  value, 
  onChange, 
  categories, 
  error,
  onAddCategory 
}: TransactionCategoryFieldProps) {
  const { t } = useTranslation("transactions");

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="categoryId">{t("form.category")}</Label>
        {onAddCategory && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onAddCategory}
            className="h-7 text-xs"
          >
            <Plus className="mr-1 h-3 w-3" />
            {t("categories.add")}
          </Button>
        )}
      </div>
      <Select
        value={value || ""}
        onValueChange={(val) => onChange(val || undefined)}
      >
        <SelectTrigger>
          <SelectValue placeholder={t("form.categoryPlaceholder")} />
        </SelectTrigger>
        <SelectContent>
          {categories?.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
