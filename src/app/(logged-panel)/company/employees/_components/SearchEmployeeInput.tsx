"use client";

import { useTranslation } from "react-i18next";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SearchEmployeeInputProps {
  register: UseFormRegister<{ email: string; position?: string }>;
  errors: FieldErrors<{ email: string; position?: string }>;
  isSearching: boolean;
  foundUser: boolean;
  searchError: boolean;
  enableSearch: boolean;
  onSearch: () => void;
}

export function SearchEmployeeInput({
  register,
  errors,
  isSearching,
  foundUser,
  searchError,
  enableSearch,
  onSearch,
}: SearchEmployeeInputProps) {
  const { t } = useTranslation("employees");

  return (
    <div className="space-y-2">
      <Label htmlFor="email">{t("addEmployeeDialog.email")}</Label>
      <div className="flex gap-2">
        <Input
          id="email"
          type="email"
          placeholder={t("addEmployeeDialog.emailPlaceholder")}
          {...register("email", { required: t("errors.emailRequired") })}
          disabled={!!foundUser}
        />
        <Button
          type="button"
          onClick={onSearch}
          disabled={isSearching || !!foundUser}
        >
          {isSearching ? t("addEmployeeDialog.searching") : foundUser ? t("addEmployeeDialog.found") : t("addEmployeeDialog.search")}
        </Button>
      </div>
      {errors.email && (
        <p className="text-sm text-destructive">{errors.email.message}</p>
      )}
      {searchError && !foundUser && enableSearch && (
        <p className="text-sm text-destructive">{t("toast.userNotFound")}</p>
      )}
    </div>
  );
}
