"use client";

import { LockedDashboard } from "./LockedDashboard";

interface DashboardGuardProps {
  hasAccess: boolean;
  currentPlan: string;
  companyId: string;
  children: React.ReactNode;
}

export function DashboardGuard({
  hasAccess,
  currentPlan,
  companyId,
  children,
}: DashboardGuardProps) {
  return (
    <div className="space-y-6">
      {!hasAccess && (
        <LockedDashboard currentPlan={currentPlan} companyId={companyId} />
      )}
      <div className={!hasAccess ? "blur-sm pointer-events-none select-none opacity-100" : ""}>
        {children}
      </div>
    </div>
  );
}
