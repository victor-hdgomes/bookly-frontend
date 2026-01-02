import { useMemo } from "react";
import { Users, DollarSign, Award } from "lucide-react";
import { useTranslation } from "react-i18next";

interface EmployeeStats {
  employee: {
    id: string;
    user: {
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

export function useEmployeeStatsCards(stats: EmployeeStats[] | undefined) {
  const { t } = useTranslation("employees");

  return useMemo(() => {
    if (!stats || stats.length === 0) {
      return [];
    }

    const totalAppointments = stats.reduce((sum, s) => sum + s.stats.totalAppointments, 0);
    const totalRevenue = stats.reduce((sum, s) => sum + s.stats.totalRevenue, 0);
    const topPerformer = stats[0];

    const topPerformerName = topPerformer.employee.user.displayName ||
      `${topPerformer.employee.user.firstName} ${topPerformer.employee.user.lastName}`;

    return [
      {
        title: t("stats.totalAppointments"),
        value: totalAppointments,
        description: t("stats.totalAppointmentsDescription"),
        icon: Users,
      },
      {
        title: t("stats.totalRevenue"),
        value: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(totalRevenue),
        description: t("stats.totalRevenueDescription"),
        icon: DollarSign,
      },
      {
        title: t("stats.topPerformer"),
        value: topPerformerName,
        description: t("stats.topPerformerDescription", { count: topPerformer.stats.totalAppointments }),
        icon: Award,
      },
    ];
  }, [stats, t]);
}
