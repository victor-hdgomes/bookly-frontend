import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Service } from "@/types/service-group.types";
import { useCurrency } from "@/hooks/useCurrency";
import { calculateFinalPrice } from "@/lib/price-utils";
import { useTranslation } from "react-i18next";

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onSelect: (service: Service) => void;
}

export function ServiceCard({ service, isSelected, onSelect }: ServiceCardProps) {
  const { formatCurrency } = useCurrency();
  const { t } = useTranslation("booking");
  
  const finalPrice = calculateFinalPrice(service.price, service.discount || 0);

  return (
    <Card
      className={cn(
        "p-4 cursor-pointer transition-all hover:shadow-md active:scale-[0.98]",
        isSelected && "ring-2 ring-primary bg-primary/5"
      )}
      onClick={() => onSelect(service)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">{service.name}</h4>
            {service.discount > 0 && (
              <Badge variant="destructive" className="text-xs">
                -{service.discount}%
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{t("service.duration", { duration: service.duration })}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            {service.discount > 0 && (
              <div className="text-xs text-muted-foreground line-through">
                {formatCurrency(service.price)}
              </div>
            )}
            <div className="font-bold text-lg">
              {formatCurrency(finalPrice)}
            </div>
          </div>
          <ChevronRight className={cn(
            "h-5 w-5 transition-colors",
            isSelected ? "text-primary" : "text-muted-foreground"
          )} />
        </div>
      </div>
    </Card>
  );
}
