"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelectedCompanyContext } from "@/contexts/SelectedCompanyContext";
import { useServiceGroups } from "@/hooks/company/service-groups/useServiceGroups";
import { ErrorState } from "@/components/states";
import { PageHeader, DataList } from "@/components/globals";
import { Button } from "@/components/ui/button";
import { Plus, FolderOpen } from "lucide-react";
import { CreateServiceGroupDialog } from "../_components/CreateServiceGroupDialog";
import { ServiceGroupCard } from "../_components/ServiceGroupCard";
import { ServiceGroup } from "@/types";

export default function ServiceGroupsPage() {
  const { t } = useTranslation("serviceGroups");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { selectedCompanyId } = useSelectedCompanyContext();
  
  const { data, isLoading, error } = useServiceGroups();

  const filteredServiceGroups = data?.data.filter(
    group => group.companyId === selectedCompanyId
  ) || [];

  if (error) {
    return <ErrorState description={t("page.errorLoading")} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("page.title")}
        description={t("page.description")}
        showCompanySelector
      />

      <div className="flex justify-end">
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t("page.newGroup")}
        </Button>
      </div>

      <DataList<ServiceGroup>
        isLoading={isLoading}
        data={filteredServiceGroups}
        renderItem={(group) => <ServiceGroupCard serviceGroup={group} />}
        emptyState={{
          icon: FolderOpen,
          title: t("page.emptyTitle"),
          description: t("page.emptyDescription"),
        }}
      />

      <CreateServiceGroupDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        companyId={selectedCompanyId}
      />
    </div>
  );
}
