"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelectedCompanyContext } from "@/contexts/SelectedCompanyContext";
import { useServices } from "@/hooks/company/services/useServices";
import { useServiceGroups } from "@/hooks/company/service-groups/useServiceGroups";
import { useServiceFilters } from "@/hooks/company/services/useServiceFilters";
import { useDeleteService } from "@/hooks/company/services/useDeleteService";
import { usePagination } from "@/hooks/usePagination";
import { ErrorState } from "@/components/states";
import { PageHeader, ServiceFilters, DataList } from "@/components/globals";
import { Package } from "lucide-react";
import { CreateServiceDialog } from "../_components/CreateServiceDialog";
import { ServiceListItem } from "../_components/ServiceListItem";
import { Service } from "@/types";

export default function ServicesPage() {
  const { t } = useTranslation("services");
  const { selectedCompanyId } = useSelectedCompanyContext();
  const [selectedServiceGroupId, setSelectedServiceGroupId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showInactive, setShowInactive] = useState<boolean>(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const { data: services, isLoading: isLoadingServices, error: servicesError } = useServices(selectedCompanyId);
  const { data: serviceGroups } = useServiceGroups();
  const deleteService = useDeleteService();

  const filteredServiceGroups = serviceGroups?.data.filter(
    group => group.companyId === selectedCompanyId
  ) || [];

  const filteredServices = useServiceFilters({
    services: services || [],
    searchQuery,
    selectedGroupId: selectedServiceGroupId,
    showInactive,
  });

  const {
    paginatedItems,
    currentPage,
    totalPages,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
  } = usePagination(filteredServices, 10);

  const handleDeleteService = async (serviceId: string, serviceName: string) => {
    await deleteService.mutateAsync({ serviceId, serviceName });
  };

  if (servicesError) {
    return <ErrorState description="Erro ao carregar serviços" />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("page.title")}
        description={t("page.description")}
        showCompanySelector
      />

      <ServiceFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedGroupId={selectedServiceGroupId}
        onGroupChange={setSelectedServiceGroupId}
        serviceGroups={filteredServiceGroups}
        showInactive={showInactive}
        onShowInactiveChange={setShowInactive}
        onCreateNew={() => setIsCreateDialogOpen(true)}
        canCreate={filteredServiceGroups.length > 0}
      />

      
      <DataList<Service>
        isLoading={isLoadingServices}
        data={paginatedItems}
        renderItem={(service) => (
          <ServiceListItem
            service={service}
            companyId={selectedCompanyId}
            onDelete={handleDeleteService}
           />
        )}
        emptyState={{
          icon: Package,
          title: t("page.emptyServicesTitle"),
          description: t("page.emptyServicesDescription"),
        }}
        gridClassName="space-y-2"
        pagination={{
          currentPage,
          totalPages,
          itemsPerPage,
          totalItems: filteredServices.length,
          onPageChange: setCurrentPage,
          onItemsPerPageChange: setItemsPerPage,
        }}
      />

      {filteredServiceGroups.length > 0 && (
        <CreateServiceDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          companyId={selectedCompanyId}
          defaultServiceGroupId={selectedServiceGroupId}
        />
      )}
    </div>
  );
}
