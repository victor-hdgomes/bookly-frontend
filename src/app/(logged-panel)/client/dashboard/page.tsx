"use client";

import { useClientDashboard } from "@/hooks/client/dashboard/useClientDashboard";
import { StatsCards } from "../_components/StatsCards";
import { UpcomingAppointments } from "../_components/UpcomingAppointments";
import { useTranslation } from "react-i18next";
import { LoadingState, ErrorState } from "@/components/states";
import { PageHeader } from "@/components/ui/page-header";

export default function Dashboard() {
  const { data, isLoading, error } = useClientDashboard();
  const { t } = useTranslation('dashboard');

  if (isLoading) {
    return <LoadingState message={t('loading')} />;
  }

  if (error) {
    return (
      <ErrorState
        title={t('error')}
        description={error?.message}
      />
    );
  }

  const stats = data?.appointmentsStats || {
    total: 0,
    scheduled: 0,
    completed: 0,
    canceled: 0,
  };
  const upcoming = data?.upcomingAppointments || [];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title={t('title')} subtitle={t('subtitle')} />
      
      <StatsCards stats={stats} />
      <UpcomingAppointments appointments={upcoming} />
    </div>
  );
}
