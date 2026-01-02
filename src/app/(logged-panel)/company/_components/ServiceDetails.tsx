"use client";

import { Clock, DollarSign, FolderOpen } from "lucide-react";

interface ServiceDetailsProps {
  serviceGroupName?: string;
  price: number;
  hasDiscount: boolean;
  finalPrice: number;
  durationText: string;
}

export function ServiceDetails({ 
  serviceGroupName, 
  price, 
  hasDiscount, 
  finalPrice,
  durationText 
}: ServiceDetailsProps) {
  return (
    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-1">
      {serviceGroupName && (
        <span className="flex items-center gap-1">
          <FolderOpen className="h-3 w-3" />
          {serviceGroupName}
        </span>
      )}
      <span className="flex items-center gap-1">
        <DollarSign className="h-3 w-3" />
        {hasDiscount ? (
          <>
            <span className="line-through">
              {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
            <span className="font-semibold text-primary ml-1">
              {finalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </>
        ) : (
          price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        )}
      </span>
      <span className="flex items-center gap-1">
        <Clock className="h-3 w-3" />
        {durationText}
      </span>
    </div>
  );
}
