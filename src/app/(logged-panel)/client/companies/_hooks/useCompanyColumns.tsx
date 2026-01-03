import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MapPin, Phone } from "lucide-react";
import { Company, CompanyStatus } from "@/types/prisma-models";
import type { DataTableColumn } from "@/components/globals/DataTable/DataTable";

export function useCompanyColumns() {
  const router = useRouter();
  const { t } = useTranslation("companies");

  const handleViewServices = useCallback(
    (slug: string) => {
      router.push(`/company/${slug}`);
    },
    [router]
  );

  const columns: DataTableColumn<Company>[] = useMemo(
    () => [
      {
        header: t("table.name"),
        cell: (company) => (
          <div>
            <div className="font-medium">{company.name}</div>
            {company.address && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="h-3 w-3" />
                <span>{company.address}</span>
              </div>
            )}
          </div>
        ),
      },
      {
        header: t("table.contact"),
        cell: (company) =>
          company.phone ? (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{company.phone}</span>
            </div>
          ) : null,
      },
      {
        header: t("table.status"),
        cell: (company) => {
          const isActive = company.status === CompanyStatus.ACTIVE;
          return (
            <Badge variant={isActive ? "default" : "secondary"}>
              {isActive ? t("open") : t("closed")}
            </Badge>
          );
        },
      },
      {
        header: t("table.actions"),
        headerClassName: "text-right",
        className: "text-right",
        cell: (company) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewServices(company.slug)}
          >
            <Eye className="h-4 w-4 mr-2" />
            {t("viewServices")}
          </Button>
        ),
      },
    ],
    [t, handleViewServices]
  );

  return columns;
}
