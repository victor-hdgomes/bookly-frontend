"use client";

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
import { useCreateTransaction, useTransactionCategories } from "@/hooks/company/transactions";
import { TransactionType } from "@/types";
import { createTransactionSchema, CreateTransactionFormData } from "@/schemas";
import { DialogActions } from "@/components/globals";
import {
  TransactionTypeField,
  TransactionDescriptionField,
  TransactionAmountField,
  TransactionDateField,
  TransactionCategoryField,
  TransactionNotesField,
} from "./form-fields";

interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyId: string;
  onOpenCategoryDialog?: () => void;
}

export function AddTransactionDialog({ open, onOpenChange, companyId, onOpenCategoryDialog }: AddTransactionDialogProps) {
  const { t } = useTranslation("transactions");
  const createTransaction = useCreateTransaction();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CreateTransactionFormData>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      type: TransactionType.INCOME,
      date: new Date().toISOString().split('T')[0],
    },
  });

  const selectedType = watch("type");
  const { data: categories } = useTransactionCategories(companyId, selectedType);

  const onSubmit = async (data: CreateTransactionFormData) => {
    await createTransaction.mutateAsync({
      ...data,
      companyId,
      date: data.date ? new Date(data.date).toISOString() : undefined,
    });
    handleClose();
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("dialog.addTitle")}</DialogTitle>
          <DialogDescription>{t("dialog.addDescription")}</DialogDescription>
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
            onAddCategory={onOpenCategoryDialog}
          />

          <TransactionNotesField
            register={register}
            errors={errors}
          />

          <DialogActions
            onCancel={handleClose}
            isSubmitting={createTransaction.isPending}
            submitLabel={t("dialog.create")}
            cancelLabel={t("dialog.cancel")}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
