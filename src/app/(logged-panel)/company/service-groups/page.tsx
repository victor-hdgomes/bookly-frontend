"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/client/profile/useAuth";
import { useSelectedCompany } from "@/hooks/company/useSelectedCompany";
import { useServiceGroups } from "@/hooks/company/service-groups/useServiceGroups";
import { LoadingState, ErrorState } from "@/components/states";
import { PageHeader, CompanySelector, DataList } from "@/components/globals";
import { Button } from "@/components/ui/button";
import { Plus, FolderOpen } from "lucide-react";
import { CreateServiceGroupDialog } from "../_components/CreateServiceGroupDialog";
import { ServiceGroupCard } from "../_components/ServiceGroupCard";
import { ServiceGroup } from "@/types";

export default function ServiceGroupsPage() {
  const { t } = useTranslation("serviceGroups");
  const { data: user } = useAuth();
  const { selectedCompanyId, setSelectedCompanyId, hasMultipleCompanies } = useSelectedCompany(user?.companies);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  const { data, isLoading, error } = useServiceGroups();

  const filteredServiceGroups = data?.data.filter(
    group => group.companyId === selectedCompanyId
  ) || [];

  if (!user) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState description={t("page.errorLoading")} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("page.title")}
        description={t("page.description")}
        actions={
          hasMultipleCompanies ? (
            <CompanySelector
              companies={user?.companies || []}
              selectedCompanyId={selectedCompanyId}
              onCompanyChange={setSelectedCompanyId}
            />
          ) : undefined
        }
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
