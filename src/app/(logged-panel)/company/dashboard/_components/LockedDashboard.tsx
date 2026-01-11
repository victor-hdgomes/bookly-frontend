"use client";

import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface LockedDashboardProps {
  currentPlan: string;
  companyId: string;
}

export function LockedDashboard({ currentPlan }: LockedDashboardProps) {
  const { t } = useTranslation("companyDashboard");

  return (
    <Card className="p-4 border-2">
      <div className="flex gap-4">
        <Lock className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1 space-y-3">
          <h3 className="text-lg font-bold">
            {t("dashboard.locked.title")}
          </h3>
          <p className="text-muted-foreground">
            {t("dashboard.locked.subtitle")} 
            <span className="font-semibold"> {t("dashboard.locked.currentPlan")}: {currentPlan}</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/company/settings">{t("dashboard.locked.viewPlans")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

