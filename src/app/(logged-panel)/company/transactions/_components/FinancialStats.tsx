import { FinancialStats as FinancialStatsType } from "@/types";
import { StatsCard } from "@/components/globals";
import { useFinancialStats } from "../_hooks/useFinancialStats";

interface FinancialStatsProps {
  stats: FinancialStatsType | undefined;
}

export function FinancialStats({ stats }: FinancialStatsProps) {
  const statsConfig = useFinancialStats(stats);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {statsConfig.map((stat) => (
        <StatsCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          valueClassName={stat.valueClassName}
        />
      ))}
    </div>
  );
}
