"use client";

import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RankingItem } from "./RankingItem";

interface EmployeeStats {
  employee: {
    id: string;
    position: string | null;
    user: {
      photo: string | null;
      displayName: string | null;
      firstName: string | null;
      lastName: string | null;
    };
  };
  stats: {
    totalAppointments: number;
    totalRevenue: number;
  };
}

interface EmployeeRankingProps {
  stats: EmployeeStats[];
}

export function EmployeeRanking({ stats }: EmployeeRankingProps) {
  const { t } = useTranslation("employees");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("ranking.title")}</CardTitle>
        <CardDescription>
          {t("ranking.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <RankingItem
              key={stat.employee.id}
              stat={stat}
              position={index + 1}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
