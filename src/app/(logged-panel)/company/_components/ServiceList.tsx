"use client";

import { useTranslation } from "react-i18next";
import { Service } from "@/types/service-group.types";
import { useDeleteService } from "@/hooks/company/services/useDeleteService";
import { toast } from "@/hooks/useToast";
import { ServiceListItem } from "./ServiceListItem";

interface ServiceListProps {
  services: Service[];
  companyId?: string;
}

export function ServiceList({ services, companyId }: ServiceListProps) {
  const { t } = useTranslation("services");
  const deleteService = useDeleteService();

  const handleDelete = async (serviceId: string, serviceName: string) => {
    await deleteService.mutateAsync(serviceId);

    toast({
      title: t("deleteDialog.successTitle"),
      description: t("deleteDialog.successDescription", { serviceName }),
    });
  };

  return (
    <div className="space-y-2">
      {services.map((service) => (
        <ServiceListItem
          key={service.id}
          service={service}
          companyId={companyId}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
