import { useTranslation } from "react-i18next";
import { useCurrency } from "@/hooks/useCurrency";
import { Service } from "@/types/service-group.types";
import { Badge } from "@/components/ui/badge";
import { calculateFinalPrice } from "@/lib/price-utils";

interface PricingSummaryProps {
  service: Service;
}

export function PricingSummary({ service }: PricingSummaryProps) {
  const { t } = useTranslation("booking");
  const { formatCurrency } = useCurrency();

  const finalPrice = calculateFinalPrice(service.price, service.discount || 0);

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{t("confirm.duration")}</span>
        <span className="font-semibold">{service.duration} min</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{t("confirm.price")}</span>
        <div className="text-right">
          {service.discount > 0 && (
            <>
              <Badge variant="destructive" className="text-xs mb-1">
                -{service.discount}%
              </Badge>
              <div className="text-xs text-muted-foreground line-through">
                {formatCurrency(service.price)}
              </div>
            </>
          )}
          <div className="font-bold text-lg text-primary">
            {formatCurrency(finalPrice)}
          </div>
        </div>
      </div>
    </div>
  );
}
