"use client";

import { Badge } from "@/components/ui/badge";

interface ServiceHeaderProps {
  name: string;
  isActive: boolean;
  hasDiscount: boolean;
  discount: number;
  inactiveBadgeText: string;
}

export function ServiceHeader({ 
  name, 
  isActive, 
  hasDiscount, 
  discount, 
  inactiveBadgeText 
}: ServiceHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <p className="font-medium">{name}</p>
      {!isActive && (
        <Badge variant="secondary" className="text-xs">
          {inactiveBadgeText}
        </Badge>
      )}
      {hasDiscount && (
        <Badge variant="destructive" className="text-xs">
          -{discount}%
        </Badge>
      )}
    </div>
  );
}
