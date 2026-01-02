import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { FinancialStats } from "@/types";
import { useCurrency } from "@/hooks";

interface FinancialStatConfig {
  title: string;
  value: string;
  description: string;
  icon: typeof TrendingUp;
  valueClassName?: string;
}

export function useFinancialStats(stats: FinancialStats | undefined): FinancialStatConfig[] {
  const { t } = useTranslation("transactions");
  const { formatCurrency } = useCurrency();

  return useMemo(() => {
    const income = stats?.income || 0;
    const expenses = stats?.expenses || 0;
    const balance = stats?.balance || 0;
    const balanceColor = balance >= 0 ? "text-green-600" : "text-red-600";

    return [
      {
        title: t("stats.income"),
        value: formatCurrency(income),
        description: t("stats.incomeDescription"),
        icon: TrendingUp,
      },
      {
        title: t("stats.expenses"),
        value: formatCurrency(expenses),
        description: t("stats.expensesDescription"),
        icon: TrendingDown,
      },
      {
        title: t("stats.balance"),
        value: formatCurrency(balance),
        description: t("stats.balanceDescription"),
        icon: DollarSign,
        valueClassName: balanceColor,
      },
    ];
  }, [stats, t, formatCurrency]);
}
