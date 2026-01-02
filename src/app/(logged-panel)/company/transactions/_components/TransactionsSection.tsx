import { useTranslation } from "react-i18next";
import { Plus, Wallet } from "lucide-react";
import { Transaction } from "@/types";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/states";
import { TransactionList } from "./TransactionList";

interface TransactionsSectionProps {
  transactions: Transaction[];
  companyId: string;
  onAddTransaction: () => void;
}

export function TransactionsSection({ transactions, companyId, onAddTransaction }: TransactionsSectionProps) {
  const { t } = useTranslation("transactions");
  const hasTransactions = transactions.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{t("stats.recentTransactions")}</h2>
        {hasTransactions && (
          <Button onClick={onAddTransaction}>
            <Plus className="mr-2 h-4 w-4" />
            {t("page.addTransaction")}
          </Button>
        )}
      </div>

      {hasTransactions ? (
        <TransactionList transactions={transactions} companyId={companyId} />
      ) : (
        <EmptyState
          icon={Wallet}
          title={t("page.noTransactions")}
          description={t("page.noTransactionsDescription")}
        >
          <Button onClick={onAddTransaction}>
            <Plus className="mr-2 h-4 w-4" />
            {t("page.addTransaction")}
          </Button>
        </EmptyState>
      )}
    </div>
  );
}
