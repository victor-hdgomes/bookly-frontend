"use client";

import { ReactNode } from "react";
import { useSelectedCompanyContextOptional } from "@/contexts/SelectedCompanyContext";
import { CompanySelector } from "./CompanySelector";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  showCompanySelector?: boolean;
}

export function PageHeader({ 
  title, 
  description, 
  actions,
  showCompanySelector,
}: PageHeaderProps) {
  const context = useSelectedCompanyContextOptional();
  const selectedCompanyId = context?.selectedCompanyId;
  const setSelectedCompanyId = context?.setSelectedCompanyId;
  const hasMultipleCompanies = context?.hasMultipleCompanies;
  const companies = context?.companies;
  
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      
      <div className="flex gap-2">
        {showCompanySelector && hasMultipleCompanies && companies && selectedCompanyId && setSelectedCompanyId && (
          <CompanySelector
            companies={companies}
            selectedCompanyId={selectedCompanyId}
            onCompanyChange={setSelectedCompanyId}
          />
        )}
        {actions}
      </div>
    </div>
  );
}
