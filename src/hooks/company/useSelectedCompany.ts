import { useState, useEffect } from "react";

interface Company {
  id: string;
  name: string;
}

const SELECTED_COMPANY_KEY = "selectedCompanyId";

interface UseSelectedCompanyReturn {
  selectedCompanyId: string;
  selectedCompany: Company | undefined;
  setSelectedCompanyId: (id: string) => void;
  hasMultipleCompanies: boolean;
}

export function useSelectedCompany(companies: Company[] | undefined): UseSelectedCompanyReturn {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");

  useEffect(() => {
    if (companies && companies.length > 0) {
      const savedCompanyId = localStorage.getItem(SELECTED_COMPANY_KEY);
      const companyExists = companies.some(c => c.id === savedCompanyId);
      
      if (savedCompanyId && companyExists) {
        setSelectedCompanyId(savedCompanyId);
      } else {
        setSelectedCompanyId(companies[0].id);
      }
    }
  }, [companies]);

  useEffect(() => {
    if (selectedCompanyId) {
      localStorage.setItem(SELECTED_COMPANY_KEY, selectedCompanyId);
    }
  }, [selectedCompanyId]);

  const selectedCompany = companies?.find(c => c.id === selectedCompanyId);
  const hasMultipleCompanies = (companies?.length || 0) > 1;

  return {
    selectedCompanyId,
    selectedCompany,
    setSelectedCompanyId,
    hasMultipleCompanies,
  };
}
