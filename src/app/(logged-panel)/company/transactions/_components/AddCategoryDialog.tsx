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
import { useCreateTransactionCategory } from "@/hooks/company/transactions";
import { TransactionType } from "@/types";
import { createTransactionCategorySchema, CreateTransactionCategoryFormData } from "@/schemas";
import { DialogActions } from "@/components/globals";
import { CategoryTypeField, CategoryNameField } from "./form-fields";

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyId: string;
  defaultType?: TransactionType;
}

export function AddCategoryDialog({ 
  open, 
  onOpenChange, 
  companyId,
  defaultType = TransactionType.INCOME 
}: AddCategoryDialogProps) {
  const { t } = useTranslation("transactions");
  const createCategory = useCreateTransactionCategory();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CreateTransactionCategoryFormData>({
    resolver: zodResolver(createTransactionCategorySchema),
    defaultValues: {
      type: defaultType,
    },
  });

  const onSubmit = async (data: CreateTransactionCategoryFormData) => {
    await createCategory.mutateAsync({
      ...data,
      companyId,
    });
    handleClose();
  };

  const handleClose = () => {
    reset({ type: defaultType });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{t("categories.addTitle")}</DialogTitle>
          <DialogDescription>{t("categories.addDescription")}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <CategoryTypeField
            value={watch("type")}
            onChange={(value) => setValue("type", value)}
            error={errors.type?.message}
          />

          <CategoryNameField
            register={register}
            errors={errors}
          />

          <DialogActions
            onCancel={handleClose}
            isSubmitting={createCategory.isPending}
            submitLabel={t("dialog.create")}
            cancelLabel={t("dialog.cancel")}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
