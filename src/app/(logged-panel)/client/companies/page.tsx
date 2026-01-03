"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCompanies } from "@/hooks/company/useCompanies";
import { useDebouncedValue } from "@/hooks";
import { PageHeader, DataTable } from "@/components/globals";
import { Input } from "@/components/ui/input";
import { Search, Building2 } from "lucide-react";
import { ErrorState, LoadingState, EmptyState } from "@/components/states";
import { useCompanyColumns } from "./_hooks/useCompanyColumns";

export default function CompaniesPage() {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const { t } = useTranslation("companies");
  const columns = useCompanyColumns();

  const { value: searchInput, debouncedValue: search, setValue: setSearchInput } = useDebouncedValue("", {
    onDebounce: () => setPage(1),
  });

  const { data, isLoading, error } = useCompanies({ page, limit: itemsPerPage, search });

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title={t("title")}
          description={t("subtitle")}
        />
        <ErrorState
          title={t("error.title")}
          description={t("error.description")}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("title")}
        description={t("subtitle")}
      />

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t("searchPlaceholder")}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="pl-9"
        />
      </div>

      {isLoading ? (
        <LoadingState message={t("loading")} />
      ) : !data?.data || data.data.length === 0 ? (
        <EmptyState
          icon={Building2}
          title={t("noResults.title")}
          description={t("noResults.description")}
        />
      ) : (
        <DataTable
          columns={columns}
          data={data.data}
          getRowKey={(company) => company.id}
          pagination={{
            currentPage: page,
            totalPages: data.totalPages || 1,
            itemsPerPage: itemsPerPage,
            totalItems: data.total || 0,
            onPageChange: setPage,
            onItemsPerPageChange: (items) => {
              setItemsPerPage(items);
              setPage(1);
            },
          }}
        />
      )}
    </div>
  );
}
