"use client";

import { Service } from "@/types/service-group.types";
import { useTranslation } from "react-i18next";
import { ServiceHeader } from "./ServiceHeader";
import { ServiceDetails } from "./ServiceDetails";

interface ServiceInfoProps {
  service: Service;
  hasDiscount: boolean;
  finalPrice: number;
}

export function ServiceInfo({ service, hasDiscount, finalPrice }: ServiceInfoProps) {
  const { t } = useTranslation("services");

  return (
    <div className="flex-1">
      <ServiceHeader
        name={service.name}
        isActive={service.isActive}
        hasDiscount={hasDiscount}
        discount={service.discount}
        inactiveBadgeText={t("list.inactiveBadge")}
      />

      <ServiceDetails
        serviceGroupName={service.serviceGroup?.name}
        price={service.price}
        hasDiscount={hasDiscount}
        finalPrice={finalPrice}
        durationText={t("list.durationMinutes", { duration: service.duration })}
      />
    </div>
  );
}
