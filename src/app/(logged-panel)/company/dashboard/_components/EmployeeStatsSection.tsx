"use client";

import { useTranslation } from "react-i18next";
import { TrendingUp } from "lucide-react";
import { useSelectedCompanyContext } from "@/contexts/SelectedCompanyContext";
import { useEmployeeStats, useEmployeeStatsCards } from "@/hooks/company/employees";
import { EmptyState } from "@/components/states";
import { StatsCard } from "@/components/globals";
import { EmployeeRanking } from "./EmployeeRanking";

export function EmployeeStatsSection() {
  const { t } = useTranslation("employees");
  const { selectedCompanyId, selectedCompany } = useSelectedCompanyContext();

  const { data: employeeStats } = useEmployeeStats(selectedCompanyId);
  const employeeStatsCards = useEmployeeStatsCards(employeeStats);

  const hasEmployeeStats = employeeStats && employeeStats.length > 0;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t("statsPage.title")}</h2>
        <p className="text-muted-foreground">
          {t("statsPage.description", { companyName: selectedCompany?.name })}
        </p>
      </div>

      {hasEmployeeStats ? (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            {employeeStatsCards.map((card, index) => (
              <StatsCard
                key={index}
                title={card.title}
                value={card.value}
                description={card.description}
                icon={card.icon}
              />
            ))}
          </div>

          <EmployeeRanking stats={employeeStats} />
        </>
      ) : (
        <EmptyState
          icon={TrendingUp}
          title={t("statsPage.noStats")}
          description={t("statsPage.noStatsDescription")}
        />
      )}
    </div>
  );
}
