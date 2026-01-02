"use client";

import { useTranslation } from "react-i18next";
import { UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmployeePositionInputProps {
  register: UseFormRegister<{ email: string; position?: string }>;
  disabled: boolean;
}

export function EmployeePositionInput({ register, disabled }: EmployeePositionInputProps) {
  const { t } = useTranslation("employees");

  return (
    <div className="space-y-2">
      <Label htmlFor="position">{t("addEmployeeDialog.position")}</Label>
      <Input
        id="position"
        placeholder={t("addEmployeeDialog.positionPlaceholder")}
        {...register("position")}
        disabled={disabled}
      />
    </div>
  );
}
