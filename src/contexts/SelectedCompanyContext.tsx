"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Company {
  id: string;
  name: string;
}

interface SelectedCompanyContextType {
  selectedCompanyId: string;
  selectedCompany: Company | undefined;
  setSelectedCompanyId: (id: string) => void;
  hasMultipleCompanies: boolean;
  companies: Company[] | undefined;
}

const SelectedCompanyContext = createContext<SelectedCompanyContextType | undefined>(undefined);

const SELECTED_COMPANY_KEY = "selectedCompanyId";

interface SelectedCompanyProviderProps {
  children: ReactNode;
  companies: Company[] | undefined;
}

export function SelectedCompanyProvider({ children, companies }: SelectedCompanyProviderProps) {
  const [selectedCompanyId, setSelectedCompanyIdState] = useState<string>("");

  useEffect(() => {
    if (companies && companies.length > 0) {
      const savedCompanyId = localStorage.getItem(SELECTED_COMPANY_KEY);
      const companyExists = companies.some(c => c.id === savedCompanyId);
      
      if (savedCompanyId && companyExists) {
        setSelectedCompanyIdState(savedCompanyId);
      } else {
        setSelectedCompanyIdState(companies[0].id);
      }
    }
  }, [companies]);

  const setSelectedCompanyId = (id: string) => {
    setSelectedCompanyIdState(id);
    localStorage.setItem(SELECTED_COMPANY_KEY, id);
  };

  const selectedCompany = companies?.find(c => c.id === selectedCompanyId);
  const hasMultipleCompanies = (companies?.length || 0) > 1;

  return (
    <SelectedCompanyContext.Provider
      value={{
        selectedCompanyId,
        selectedCompany,
        setSelectedCompanyId,
        hasMultipleCompanies,
        companies,
      }}
    >
      {children}
    </SelectedCompanyContext.Provider>
  );
}

export function useSelectedCompanyContext() {
  const context = useContext(SelectedCompanyContext);
  if (!context) {
    throw new Error("useSelectedCompanyContext must be used within SelectedCompanyProvider");
  }
  return context;
}
