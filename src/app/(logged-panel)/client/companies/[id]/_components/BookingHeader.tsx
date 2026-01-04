import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Company, CompanyStatus } from "@/types/prisma-models";

interface BookingHeaderProps {
  company: Company;
  onBack: () => void;
}

export function BookingHeader({ company, onBack }: BookingHeaderProps) {
  const { t } = useTranslation("booking");
  const isClosed = company.status !== CompanyStatus.ACTIVE;

  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="h-9 w-9 p-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg">{company.name}</h1>
              {isClosed && (
                <Badge variant="secondary">{t("companyInfo.closed")}</Badge>
              )}
            </div>
            <div className="flex flex-col gap-1 text-xs text-muted-foreground mt-1">
              {company.address && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{company.address}</span>
                </div>
              )}
              {company.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  <span>{company.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
