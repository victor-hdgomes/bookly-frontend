"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Building2 } from "lucide-react";
import { useAuth } from "@/hooks/client/profile/useAuth";
import { useCompanyDashboard } from "@/hooks/company/dashboard/useCompanyDashboard";
import { CompanyStatsCards } from "../_components/CompanyStatsCards";
import { CompanyUpcomingAppointments } from "../_components/CompanyUpcomingAppointments";
import { LoadingState, ErrorState, EmptyState } from "@/components/states";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Company } from "@/types";

const SELECTED_COMPANY_KEY = "selectedCompanyId";

export default function CompanyDashboard() {
  const { t } = useTranslation('companyDashboard');
  const { data: user } = useAuth();
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");

  useEffect(() => {
    if (user?.companies && user.companies.length > 0) {
      const savedCompanyId = localStorage.getItem(SELECTED_COMPANY_KEY);
      const companyExists = user.companies.some(c => c.id === savedCompanyId);
      
      if (savedCompanyId && companyExists) {
        setSelectedCompanyId(savedCompanyId);
      } else {
        setSelectedCompanyId(user.companies[0].id);
      }
    }
  }, [user?.companies]);

  useEffect(() => {
    if (selectedCompanyId) {
      localStorage.setItem(SELECTED_COMPANY_KEY, selectedCompanyId);
    }
  }, [selectedCompanyId]);

  const { data, isLoading, error } = useCompanyDashboard(selectedCompanyId);

  const selectedCompany = user?.companies?.find(c => c.id === selectedCompanyId);
  const hasMultipleCompanies = (user?.companies?.length || 0) > 1;

  if (isLoading) {
    return <LoadingState message={t('loading')} />;
  }

  if ((!user?.companies || user?.companies?.length === 0) && !isLoading) {
    return (
      <EmptyState
        title={t('noCompany.title')}
        description={t('noCompany.description')}
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        title={t('error.title')}
        description={error?.message || t('error.description')}
      />
    );
  }

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
          <p className="text-muted-foreground">
            {selectedCompany?.name || t('subtitle')}
          </p>
        </div>

        {hasMultipleCompanies && (
          <div className="flex items-center gap-2">
            <Select value={selectedCompanyId} onValueChange={setSelectedCompanyId}>
              <SelectTrigger className="w-[250px]">
                <Building2 className="size-4 text-muted-foreground" />
                <SelectValue placeholder={t('selectCompany')} />
              </SelectTrigger>
              <SelectContent>
                {user?.companies?.map((company: Company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <CompanyStatsCards
        appointmentsStats={data?.appointmentsStats || { total: 0, scheduled: 0, completed: 0, canceled: 0 }}
        companyStats={data?.stats || { totalServices: 0, totalRevenue: 0 }}
      />

      <CompanyUpcomingAppointments appointments={data?.upcomingAppointments || []} />
    </div>
  );
}

