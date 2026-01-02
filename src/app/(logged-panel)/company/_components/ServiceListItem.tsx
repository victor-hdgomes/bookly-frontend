"use client";

import { useState } from "react";
import { Service } from "@/types/service-group.types";
import { ServiceDeleteDialog } from "./ServiceDeleteDialog";
import { EditServiceDialog } from "./EditServiceDialog";
import { ServiceActionButtons } from "./ServiceActionButtons";
import { ServiceInfo } from "./ServiceInfo";

interface ServiceListItemProps {
  service: Service;
  companyId?: string;
  onDelete: (serviceId: string, serviceName: string) => Promise<void>;
}

export function ServiceListItem({ service, companyId, onDelete }: ServiceListItemProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const calculateFinalPrice = () => {
    if (!service.discount || service.discount === 0) return service.price;
    return service.price - (service.price * service.discount / 100);
  };

  const finalPrice = calculateFinalPrice();
  const hasDiscount = service.discount > 0;

  const handleDeleteConfirm = async () => {
    await onDelete(service.id, service.name);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <div
        className={`flex items-center justify-between rounded-lg border p-3 transition-colors ${
          service.isActive ? 'hover:bg-accent/50' : 'opacity-60 bg-muted'
        }`}
      >
        <ServiceInfo
          service={service}
          finalPrice={finalPrice}
          hasDiscount={hasDiscount}
        />

        <ServiceActionButtons
          onEdit={() => setIsEditDialogOpen(true)}
          onDelete={() => setIsDeleteDialogOpen(true)}
        />
      </div>

      {companyId && (
        <EditServiceDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          service={service}
          companyId={companyId}
        />
      )}

      <ServiceDeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        serviceName={service.name}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
