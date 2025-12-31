"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { AppointmentStats, CompanyStats } from "@/types/dashboard.types";
import { getCompanyStatsConfig } from "@/config/companyStatsConfig";

interface StatsCardsProps {
  appointmentsStats: AppointmentStats;
  companyStats: CompanyStats;
}

export function CompanyStatsCards({ appointmentsStats, companyStats }: StatsCardsProps) {
  const { t } = useTranslation('companyDashboard');

  const statsConfig = getCompanyStatsConfig({ t, appointmentsStats, companyStats });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {statsConfig.map(({ key, title, value, icon, color }) => (
        <Card key={key}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <div className={color}>{icon}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


