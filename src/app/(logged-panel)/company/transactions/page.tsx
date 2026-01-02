"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Wallet } from "lucide-react";
import { useSelectedCompanyContext } from "@/contexts/SelectedCompanyContext";
import { useTransactionStats, useTransactions } from "@/hooks/company/transactions";
import { LoadingState, ErrorState, EmptyState } from "@/components/states";
import { PageHeader } from "@/components/globals";
import { AddTransactionDialog } from "./_components/AddTransactionDialog";
import { AddCategoryDialog } from "./_components/AddCategoryDialog";
import { FinancialStats } from "./_components/FinancialStats";
import { TransactionsSection } from "./_components/TransactionsSection";
import { TransactionType } from "@/types";

export default function TransactionsPage() {
  const { t } = useTranslation("transactions");
  const { selectedCompanyId, selectedCompany } = useSelectedCompanyContext();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);

  const { data: stats, isLoading: isLoadingStats, error: statsError } = useTransactionStats(selectedCompanyId);
  const { data: transactionsData, isLoading: isLoadingTransactions, error: transactionsError } = useTransactions(selectedCompanyId, { limit: 50 });

  if (isLoadingStats || isLoadingTransactions) {
    return <LoadingState message={t("page.loading")} />;
  }

  if (statsError || transactionsError) {
    return <ErrorState title={t("page.error")} />;
  }

  if (!selectedCompany) {
    return (
      <EmptyState
        icon={Wallet}
        title={t("page.noCompany")}
        description={t("page.noCompanyDescription")}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("page.title")}
        description={t("page.description", { companyName: selectedCompany.name })}
        showCompanySelector
      />

      <FinancialStats stats={stats} />

      <TransactionsSection
        transactions={transactionsData?.data || []}
        companyId={selectedCompanyId || ""}
        onAddTransaction={() => setIsAddDialogOpen(true)}
      />

      <AddTransactionDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        companyId={selectedCompanyId || ""}
        onOpenCategoryDialog={() => {
          setIsAddDialogOpen(false);
          setIsCategoryDialogOpen(true);
        }}
      />

      <AddCategoryDialog
        open={isCategoryDialogOpen}
        onOpenChange={(open) => {
          setIsCategoryDialogOpen(open);
          if (!open) {
            setIsAddDialogOpen(true);
          }
        }}
        companyId={selectedCompanyId || ""}
        defaultType={TransactionType.INCOME}
      />
    </div>
  );
}
