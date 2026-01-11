"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Users } from "lucide-react";
import { useSelectedCompanyContext } from "@/contexts/SelectedCompanyContext";
import { useEmployees, useDeleteEmployee, useToggleEmployeeStatus } from "@/hooks/company/employees";
import { LoadingState, ErrorState, EmptyState } from "@/components/states";
import { PageHeader, EmployeeFilters, DataList, DeleteConfirmDialog } from "@/components/globals";
import { AddEmployeeDialog } from "./_components/AddEmployeeDialog";
import { EmployeeListItem } from "./_components/EmployeeListItem";
import { useToast } from "@/hooks/useToast";

export default function EmployeesPage() {
  const { t } = useTranslation("employees");
  const { toast } = useToast();
  const { selectedCompany } = useSelectedCompanyContext();
  
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showInactive, setShowInactive] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data: employeesData, isLoading, error } = useEmployees({
    companyId: selectedCompany?.id,
    page,
    limit: itemsPerPage,
    search: searchQuery,
    showInactive,
  });
  
  const deleteEmployee = useDeleteEmployee();
  const toggleEmployeeStatus = useToggleEmployeeStatus();

  const handleDeleteEmployee = async () => {
    if (!employeeToDelete || !selectedCompany?.id) return;

    await deleteEmployee.mutateAsync({
      employeeId: employeeToDelete,
      companyId: selectedCompany.id,
    });
    
    toast({
      title: t("toast.employeeRemoved"),
      description: t("toast.employeeRemovedDescription"),
    });
    
    setEmployeeToDelete(null);
  };

  const handleToggleEmployeeStatus = async (employeeId: string) => {
    const employee = employees.find(emp => emp.id === employeeId);
    const newStatus = !employee?.isActive;

    await toggleEmployeeStatus.mutateAsync({ employeeId });
    
    toast({
      title: newStatus ? t("toast.employeeActivated") : t("toast.employeeDeactivated"),
      description: newStatus 
        ? t("toast.employeeActivatedDescription") 
        : t("toast.employeeDeactivatedDescription"),
    });
  };

  if (isLoading) {
    return <LoadingState message={t("page.loadingMessage")} />;
  }

  if (error) {
    return <ErrorState title={t("page.errorTitle")} />;
  }

  if (!selectedCompany) {
    return <EmptyState icon={Users} title={t("page.noCompanySelected")} description={t("page.noCompanyDescription")} />;
  }

  const employees = employeesData?.data || [];
  const meta = employeesData?.meta || { total: 0, page: 1, limit: 10, lastPage: 1 };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("page.title")}
        description={t("page.description", { companyName: selectedCompany.name })}
        showCompanySelector
      />

      <EmployeeFilters
        searchQuery={searchQuery}
        onSearchChange={(value) => {
          setSearchQuery(value);
          setPage(1);
        }}
        showInactive={showInactive}
        onShowInactiveChange={(value) => {
          setShowInactive(value);
          setPage(1);
        }}
        onAddNew={() => setShowAddDialog(true)}
      />

      <DataList
        isLoading={isLoading}
        data={employees}
        renderItem={(employee) => (
          <EmployeeListItem
            employee={employee}
            onDelete={setEmployeeToDelete}
            onToggleStatus={handleToggleEmployeeStatus}
          />
        )}
        emptyState={{
          icon: Users,
          title: t("noEmployees"),
          description: t("noEmployeesDescription"),
        }}
        gridClassName="flex flex-col gap-4"
        pagination={{
          currentPage: meta.page,
          totalPages: meta.lastPage,
          itemsPerPage: itemsPerPage,
          totalItems: meta.total,
          onPageChange: setPage,
          onItemsPerPageChange: (value) => {
            setItemsPerPage(value);
            setPage(1);
          },
        }}
      />

      <AddEmployeeDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        companyId={selectedCompany.id}
      />

      <DeleteConfirmDialog
        open={!!employeeToDelete}
        onOpenChange={() => setEmployeeToDelete(null)}
        onConfirm={handleDeleteEmployee}
        namespace="employees"
      />
    </div>
  );
}
