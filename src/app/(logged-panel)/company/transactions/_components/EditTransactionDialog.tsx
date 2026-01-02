"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateTransaction, useTransactionCategories } from "@/hooks/company/transactions";
import { Transaction } from "@/types";
import { createTransactionSchema, CreateTransactionFormData } from "@/schemas";
import {
  TransactionTypeField,
  TransactionDescriptionField,
  TransactionAmountField,
  TransactionDateField,
  TransactionCategoryField,
  TransactionNotesField,
} from "./form-fields";
import { DialogActions } from "@/components/globals";

interface EditTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
  companyId: string;
}

export function EditTransactionDialog({ 
  open, 
  onOpenChange, 
  transaction,
  companyId 
}: EditTransactionDialogProps) {
  const { t } = useTranslation("transactions");
  const updateTransaction = useUpdateTransaction();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CreateTransactionFormData>({
    resolver: zodResolver(createTransactionSchema),
  });

  const selectedType = watch("type");
  const { data: categories } = useTransactionCategories(companyId, selectedType);

  useEffect(() => {
    if (transaction) {
      reset({
        description: transaction.description,
        amount: transaction.amount,
        type: transaction.type,
        date: new Date(transaction.date).toISOString().split('T')[0],
        notes: transaction.notes || undefined,
        categoryId: transaction.categoryId || undefined,
      });
    }
  }, [transaction, reset]);

  const onSubmit = async (data: CreateTransactionFormData) => {
    if (!transaction) return;
    
    await updateTransaction.mutateAsync({
      id: transaction.id,
      data: {
        ...data,
        date: data.date ? new Date(data.date).toISOString() : undefined,
      },
    });
    handleClose();
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  if (!transaction) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("dialog.editTitle")}</DialogTitle>
          <DialogDescription>{t("dialog.editDescription")}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TransactionTypeField
            value={watch("type")}
            onChange={(value) => setValue("type", value)}
            error={errors.type?.message}
          />

          <TransactionDescriptionField
            register={register}
            errors={errors}
          />

          <TransactionAmountField
            register={register}
            errors={errors}
          />

          <TransactionDateField
            register={register}
            errors={errors}
          />

          <TransactionCategoryField
            value={watch("categoryId")}
            onChange={(value) => setValue("categoryId", value)}
            categories={categories}
            error={errors.categoryId?.message}
          />

          <TransactionNotesField
            register={register}
            errors={errors}
          />

          <DialogActions
            onCancel={handleClose}
            isSubmitting={updateTransaction.isPending}
            submitLabel={t("dialog.save")}
            cancelLabel={t("dialog.cancel")}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
