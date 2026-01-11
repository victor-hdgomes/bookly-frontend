"use client";

import { useTranslation } from "react-i18next";
import { useSelectedCompanyContext } from "@/contexts/SelectedCompanyContext";
import { useCompanyDashboard } from "@/hooks/company/dashboard/useCompanyDashboard";
import { CompanyStatsCards } from "../_components/CompanyStatsCards";
import { CompanyUpcomingAppointments } from "../_components/CompanyUpcomingAppointments";
import { EmployeeStatsSection } from "./_components/EmployeeStatsSection";
import { DashboardGuard } from "./_components/DashboardGuard";
import { LoadingState, ErrorState, EmptyState } from "@/components/states";
import { PageHeader } from "@/components/globals";
import { Plan } from "@/types/subscription.types";

export default function CompanyDashboard() {
  const { t } = useTranslation('companyDashboard');
  const { selectedCompanyId, selectedCompany, companies } = useSelectedCompanyContext();

  const { data, isLoading, error } = useCompanyDashboard(selectedCompanyId);

  if (isLoading) {
    return <LoadingState message={t('loading')} />;
  }

  if ((!companies || companies?.length === 0) && !isLoading) {
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
    <div className="flex flex-col gap-6">
      <PageHeader
        title={t('title')}
        description={selectedCompany?.name || t('subtitle')}
        showCompanySelector
      />

      <DashboardGuard
        hasAccess={data?.hasAccess ?? true}
        currentPlan={data?.plan ?? Plan.STARTER}
        companyId={selectedCompanyId}
      >
        <CompanyStatsCards
          appointmentsStats={data?.appointmentsStats || { total: 0, scheduled: 0, completed: 0, canceled: 0 }}
          companyStats={data?.stats || { totalServices: 0, totalRevenue: 0 }}
        />

        <CompanyUpcomingAppointments appointments={data?.upcomingAppointments || []} />

        <EmployeeStatsSection />
      </DashboardGuard>
    </div>
  );
}