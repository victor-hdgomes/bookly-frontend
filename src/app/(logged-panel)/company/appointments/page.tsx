"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelectedCompanyContext } from "@/contexts/SelectedCompanyContext";
import { useAppointments } from "@/hooks/company/appointments/useAppointments";
import { useServices } from "@/hooks/company/services/useServices";
import { useEmployees } from "@/hooks/company/employees/useEmployees";
import { useDeleteAppointment } from "@/hooks/company/appointments/useAppointments";
import { ErrorState } from "@/components/states";
import { PageHeader, DataList } from "@/components/globals";
import { Calendar } from "lucide-react";
import { CreateAppointmentDialog } from "./_components/CreateAppointmentDialog";
import { AppointmentListItem } from "./_components/AppointmentListItem";
import { AppointmentFilters } from "./_components/AppointmentFilters";
import { Appointment, AppointmentStatus } from "@/types/appointment.types";

export default function AppointmentsPage() {
  const { t } = useTranslation("appointments");
  const { selectedCompanyId } = useSelectedCompanyContext();
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<AppointmentStatus | "">(AppointmentStatus.SCHEDULED);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const {
    data: appointmentsResponse,
    isLoading: isLoadingAppointments,
    error: appointmentsError,
  } = useAppointments({
    companyId: selectedCompanyId,
    page: currentPage,
    limit: itemsPerPage,
    serviceId: selectedServiceId || undefined,
    userId: selectedUserId || undefined,
    status: selectedStatus || undefined,
    search: searchQuery,
  });

  const { data: services } = useServices(selectedCompanyId);
  const { data: employeesResponse } = useEmployees({
    companyId: selectedCompanyId,
    page: 1,
    limit: 100,
  });

  const deleteAppointment = useDeleteAppointment();

  const handleDeleteAppointment = async (appointmentId: string) => {
    await deleteAppointment.mutateAsync(appointmentId);
  };

  const handleClearFilters = () => {
    setSelectedServiceId("");
    setSelectedUserId("");
    setSelectedStatus("");
    setSearchQuery("");
  };

  if (appointmentsError) {
    return <ErrorState description="Erro ao carregar agendamentos" />;
  }

  const appointments = appointmentsResponse?.data || [];
  const meta = appointmentsResponse?.meta || {
    total: 0,
    page: 1,
    limit: 10,
    lastPage: 1,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("page.title")}
        description={t("page.description")}
        showCompanySelector
      />

      <AppointmentFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedServiceId={selectedServiceId}
        onServiceChange={setSelectedServiceId}
        selectedUserId={selectedUserId}
        onUserChange={setSelectedUserId}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        services={services || []}
        employees={employeesResponse?.data || []}
        onCreateNew={() => setIsCreateDialogOpen(true)}
        onClearFilters={handleClearFilters}
      />

      <DataList<Appointment>
        isLoading={isLoadingAppointments}
        data={appointments}
        renderItem={(appointment) => (
          <AppointmentListItem
            appointment={appointment}
            companyId={selectedCompanyId}
            onDelete={handleDeleteAppointment}
          />
        )}
        emptyState={{
          icon: Calendar,
          title: t("page.emptyAppointmentsTitle"),
          description: t("page.emptyAppointmentsDescription"),
        }}
        gridClassName="space-y-2"
        pagination={{
          currentPage: meta.page,
          totalPages: meta.lastPage,
          itemsPerPage: meta.limit,
          totalItems: meta.total,
          onPageChange: setCurrentPage,
          onItemsPerPageChange: setItemsPerPage,
        }}
      />

      <CreateAppointmentDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        companyId={selectedCompanyId}
      />
    </div>
  );
}
