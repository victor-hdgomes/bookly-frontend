"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateService } from "@/hooks/company/services/useUpdateService";
import { useServiceGroups } from "@/hooks/company/service-groups/useServiceGroups";
import { Service } from "@/types/service-group.types";
import { editServiceSchema, type EditServiceFormData } from "@/schemas";
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
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/useToast";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface EditServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service;
  companyId: string;
}

export function EditServiceDialog({
  open,
  onOpenChange,
  service,
  companyId,
}: EditServiceDialogProps) {
  const { t } = useTranslation('services');
  const updateService = useUpdateService();
  const { data: serviceGroups } = useServiceGroups();

  const filteredServiceGroups = serviceGroups?.data.filter(
    group => group.companyId === companyId
  ) || [];

  const form = useForm<EditServiceFormData>({
    resolver: zodResolver(editServiceSchema(t)),
    defaultValues: {
      name: service.name,
      price: service.price,
      duration: service.duration,
      discount: service.discount || 0,
      isActive: service.isActive,
      serviceGroupId: service.serviceGroupId,
    },
  });

  useEffect(() => {
    form.reset({
      name: service.name,
      price: service.price,
      duration: service.duration,
      discount: service.discount || 0,
      isActive: service.isActive,
      serviceGroupId: service.serviceGroupId,
    });
  }, [service, form]);

  const onSubmit = async (values: EditServiceFormData) => {
    await updateService.mutateAsync({
      id: service.id,
      data: {
        name: values.name,
        price: values.price,
        duration: values.duration,
        discount: values.discount,
        isActive: values.isActive,
        serviceGroupId: values.serviceGroupId,
      },
    });

    toast({
      title: t("editDialog.successTitle"),
      description: t("editDialog.successDescription"),
    });

    onOpenChange(false);
  };

  const finalPrice = form.watch("price") - (form.watch("price") * form.watch("discount") / 100);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("editDialog.title")}</DialogTitle>
          <DialogDescription>
            {t("editDialog.description")}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="serviceGroupId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("editDialog.serviceGroupLabel")}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("editDialog.serviceGroupPlaceholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredServiceGroups.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("editDialog.nameLabel")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("editDialog.namePlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("editDialog.priceLabel")}</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder={t("editDialog.pricePlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("editDialog.discountLabel")}</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder={t("editDialog.discountPlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {form.watch("discount") > 0 && (
              <div className="rounded-lg bg-muted p-3 text-sm">
                <p className="text-muted-foreground">
                  {t("editDialog.priceOriginalLabel")} <span className="line-through">{form.watch("price").toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </p>
                <p className="font-semibold text-primary">
                  {t("editDialog.priceFinalLabel")} {finalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
            )}

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("editDialog.durationLabel")}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={t("editDialog.durationPlaceholder")} {...field} />
                  </FormControl>
                  <FormDescription>
                    {t("editDialog.durationDescription")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>{t("editDialog.isActiveLabel")}</FormLabel>
                    <FormDescription>
                      {t("editDialog.isActiveDescription")}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                {t("editDialog.cancelButton")}
              </Button>
              <Button type="submit" disabled={updateService.isPending}>
                {updateService.isPending ? t("editDialog.savingButton") : t("editDialog.saveButton")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
