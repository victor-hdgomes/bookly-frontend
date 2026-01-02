"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Clock, DollarSign, FolderOpen } from "lucide-react";
import { Service } from "@/types/service-group.types";
import { Badge } from "@/components/ui/badge";
import { ListItem } from "@/components/globals";
import { ServiceDeleteDialog } from "./ServiceDeleteDialog";
import { EditServiceDialog } from "./EditServiceDialog";

interface ServiceListItemProps {
  service: Service;
  companyId?: string;
  onDelete: (serviceId: string, serviceName: string) => Promise<void>;
}

export function ServiceListItem({ service, companyId, onDelete }: ServiceListItemProps) {
  const { t } = useTranslation("services");
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

  const badges = (
    <>
      {!service.isActive && (
        <Badge variant="secondary" className="text-xs">
          {t("list.inactiveBadge")}
        </Badge>
      )}
      {hasDiscount && (
        <Badge variant="destructive" className="text-xs">
          -{service.discount}%
        </Badge>
      )}
    </>
  );

  const content = (
    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-1">
      {service.serviceGroup?.name && (
        <span className="flex items-center gap-1">
          <FolderOpen className="h-3 w-3" />
          {service.serviceGroup.name}
        </span>
      )}
      <span className="flex items-center gap-1">
        <DollarSign className="h-3 w-3" />
        {hasDiscount ? (
          <>
            <span className="line-through">
              {service.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
            <span className="font-semibold text-primary ml-1">
              {finalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </>
        ) : (
          service.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        )}
      </span>
      <span className="flex items-center gap-1">
        <Clock className="h-3 w-3" />
        {t("list.durationMinutes", { duration: service.duration })}
      </span>
    </div>
  );

  return (
    <>
      <ListItem
        isActive={service.isActive}
        title={service.name}
        badges={badges}
        content={content}
        onEdit={() => setIsEditDialogOpen(true)}
        onDelete={() => setIsDeleteDialogOpen(true)}
      />

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
