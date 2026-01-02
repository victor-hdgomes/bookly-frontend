"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Trash2, TrendingUp, TrendingDown, Pencil } from "lucide-react";
import { Transaction, TransactionType } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatCurrency } from "@/lib/date-utils";
import { DataTable, DataTableColumn } from "@/components/globals";
import { EditTransactionDialog } from "./EditTransactionDialog";
import { DeleteTransactionDialog } from "./DeleteTransactionDialog";

interface TransactionListProps {
  transactions: Transaction[];
  companyId: string;
}

export function TransactionList({ transactions, companyId }: TransactionListProps) {
  const { t } = useTranslation("transactions");
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingTransactionId, setDeletingTransactionId] = useState<string | null>(null);

  const columns = useMemo<DataTableColumn<Transaction>[]>(() => [
    {
      header: t("list.date"),
      cell: (transaction) => formatDate(transaction.date),
    },
    {
      header: t("list.description"),
      cell: (transaction) => (
        <div>
          <p className="font-medium">{transaction.description}</p>
          {transaction.notes && (
            <p className="text-sm text-muted-foreground">{transaction.notes}</p>
          )}
        </div>
      ),
    },
    {
      header: t("list.category"),
      cell: (transaction) =>
        transaction.category ? (
          <span className="text-sm">{transaction.category.name}</span>
        ) : (
          <span className="text-sm text-muted-foreground">-</span>
        ),
    },
    {
      header: t("list.type"),
      cell: (transaction) => (
        <Badge
          variant={transaction.type === TransactionType.INCOME ? "default" : "destructive"}
          className="gap-1"
        >
          {transaction.type === TransactionType.INCOME ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          {t(`filters.${transaction.type.toLowerCase()}`)}
        </Badge>
      ),
    },
    {
      header: t("list.amount"),
      headerClassName: "text-right",
      className: "text-right",
      cell: (transaction) => (
        <span
          className={
            transaction.type === TransactionType.INCOME
              ? "text-green-600 font-semibold"
              : "text-red-600 font-semibold"
          }
        >
          {transaction.type === TransactionType.INCOME ? "+" : "-"}
          {formatCurrency(transaction.amount)}
        </span>
      ),
    },
    {
      header: t("list.actions"),
      headerClassName: "w-[100px]",
      cell: (transaction) => (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setEditingTransaction(transaction)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDeletingTransactionId(transaction.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ], [t]);

  return (
    <>
      <DataTable
        columns={columns}
        data={transactions}
        getRowKey={(transaction) => transaction.id}
      />

      <EditTransactionDialog
        open={!!editingTransaction}
        onOpenChange={(open) => !open && setEditingTransaction(null)}
        transaction={editingTransaction}
        companyId={companyId}
      />

      <DeleteTransactionDialog
        open={!!deletingTransactionId}
        onOpenChange={(open) => !open && setDeletingTransactionId(null)}
        transactionId={deletingTransactionId}
      />
    </>
  );
}
