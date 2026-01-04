"use client";

import { Service, ServiceGroup } from "@/types/service-group.types";
import { useTranslation } from "react-i18next";
import { ServiceGroupSection } from "./ServiceGroupSection";
import { EmptyServices } from "./EmptyServices";

interface ServiceStepProps {
  serviceGroups: ServiceGroup[];
  selectedServiceId: string | null;
  onSelectService: (service: Service) => void;
}

export function ServiceStep({ serviceGroups, selectedServiceId, onSelectService }: ServiceStepProps) {
  const { t } = useTranslation("booking");

  const allServices = serviceGroups.flatMap(group => 
    group.services.filter(service => service.isActive)
  );

  if (allServices.length === 0) {
    return <EmptyServices />;
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">{t("service.title")}</h2>
      </div>

      <div className="grid gap-3">
        {serviceGroups.map((group) => (
          <ServiceGroupSection
            key={group.id}
            group={group}
            selectedServiceId={selectedServiceId}
            onSelectService={onSelectService}
          />
        ))}
      </div>
    </div>
  );
}
