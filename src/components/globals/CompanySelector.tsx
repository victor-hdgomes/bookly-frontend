"use client";

import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Company {
  id: string;
  name: string;
}

interface CompanySelectorProps {
  companies: Company[];
  selectedCompanyId: string;
  onCompanyChange: (companyId: string) => void;
}

export function CompanySelector({
  companies,
  selectedCompanyId,
  onCompanyChange,
}: CompanySelectorProps) {
  const { t } = useTranslation("common");

  if (companies.length <= 1) {
    return null;
  }

  return (
    <Select value={selectedCompanyId} onValueChange={onCompanyChange}>
      <SelectTrigger className="w-full md:w-[280px]">
        <SelectValue placeholder={t("companySelector.placeholder")} />
      </SelectTrigger>
      <SelectContent>
        {companies.map((company) => (
          <SelectItem key={company.id} value={company.id}>
            {company.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
