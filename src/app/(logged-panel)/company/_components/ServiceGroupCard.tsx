"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ServiceGroup } from "@/types/service-group.types";
import { FolderOpen, Plus, Package, Clock, DollarSign, Edit } from "lucide-react";
import { CreateServiceDialog } from "./CreateServiceDialog";
import { useServiceGroupStats } from "@/hooks/company/service-groups/useServiceGroupStats";

interface ServiceGroupCardProps {
  serviceGroup: ServiceGroup;
}

export function ServiceGroupCard({ serviceGroup }: ServiceGroupCardProps) {
  const router = useRouter();
  const { t } = useTranslation("serviceGroups");
  const [isCreateServiceDialogOpen, setIsCreateServiceDialogOpen] = useState(false);

  const { totalServices, avgPrice, avgDuration } = useServiceGroupStats(serviceGroup);

  const stats = [
    {
      icon: Package,
      label: t("card.stats.services"),
      value: totalServices.toString(),
    },
    {
      icon: DollarSign,
      label: t("card.stats.avgPrice"),
      value: avgPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    },
    {
      icon: Clock,
      label: t("card.stats.avgDuration"),
      value: t("card.duration", { duration: Math.round(avgDuration) }),
    },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">{serviceGroup.name}</CardTitle>
            </div>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => router.push(`/company/service-groups/${serviceGroup.id}`)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsCreateServiceDialogOpen(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2 text-sm">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col border-r pr-2 last:border-0 last:pr-0 text-center">
                  <span className="text-muted-foreground flex items-center gap-1 text-center justify-center">
                    {stat.label}
                  </span>
                  <span className="font-semibold">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <CreateServiceDialog
        open={isCreateServiceDialogOpen}
        onOpenChange={setIsCreateServiceDialogOpen}
        companyId={serviceGroup.companyId}
        defaultServiceGroupId={serviceGroup.id}
      />
    </>
  );
}
