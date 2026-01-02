import { RankingPosition } from "./RankingPosition";
import { RankingEmployeeInfo } from "./RankingEmployeeInfo";
import { RankingMetrics } from "./RankingMetrics";

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

interface RankingItemProps {
  stat: EmployeeStats;
  position: number;
}

export function RankingItem({ stat, position }: RankingItemProps) {
  const displayName = stat.employee.user.displayName ||
    `${stat.employee.user.firstName} ${stat.employee.user.lastName}`;
  
  const avatarFallback = `${stat.employee.user.firstName?.[0] || ''}${stat.employee.user.lastName?.[0] || ''}`;

  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex items-center gap-4">
        <RankingPosition position={position} />
        <RankingEmployeeInfo
          displayName={displayName}
          avatarUrl={stat.employee.user.photo}
          avatarFallback={avatarFallback}
          position={stat.employee.position}
        />
      </div>

      <RankingMetrics
        totalAppointments={stat.stats.totalAppointments}
        totalRevenue={stat.stats.totalRevenue}
      />
    </div>
  );
}
