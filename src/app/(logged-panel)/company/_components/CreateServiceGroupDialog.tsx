"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useCreateServiceGroup } from "@/hooks/company/service-groups/useCreateServiceGroup";
import { createServiceGroupSchema, type CreateServiceGroupFormData } from "@/schemas/create-service-group.schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";

interface CreateServiceGroupDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    companyId: string;
}

export function CreateServiceGroupDialog({
    open,
    onOpenChange,
    companyId,
}: CreateServiceGroupDialogProps) {
    const { toast } = useToast();
    const { t } = useTranslation("serviceGroups");
    const createServiceGroup = useCreateServiceGroup();

    const form = useForm<CreateServiceGroupFormData>({
        resolver: zodResolver(createServiceGroupSchema),
        defaultValues: {
        name: "",
        },
    });

  const onSubmit = async (values: CreateServiceGroupFormData) => {
    await createServiceGroup.mutateAsync({
        name: values.name,
        companyId,
    });

    toast({
        title: t("createDialog.successTitle"),
        description: t("createDialog.successDescription"),
    });

    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("createDialog.title")}</DialogTitle>
          <DialogDescription>
            {t("createDialog.description")}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("createDialog.nameLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("createDialog.namePlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                {t("createDialog.cancelButton")}
              </Button>
              <Button type="submit" disabled={createServiceGroup.isPending}>
                {createServiceGroup.isPending 
                  ? t("createDialog.creatingButton") 
                  : t("createDialog.createButton")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
