"use client";

import { useTranslation } from "react-i18next";

interface RankingMetricsProps {
  totalAppointments: number;
  totalRevenue: number;
}

export function RankingMetrics({ totalAppointments, totalRevenue }: RankingMetricsProps) {
  const { t } = useTranslation("employees");

  return (
    <div className="text-right">
      <div className="flex items-center gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{t("ranking.appointmentsLabel")}</p>
          <p className="text-2xl font-bold">{totalAppointments}</p>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">{t("ranking.revenueLabel")}</p>
          <p className="text-2xl font-bold">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
            }).format(totalRevenue)}
          </p>
        </div>
      </div>
    </div>
  );
}
