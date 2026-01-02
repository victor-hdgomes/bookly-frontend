"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useCreateService } from "@/hooks/company/services/useCreateService";
import { useServiceGroups } from "@/hooks/company/service-groups/useServiceGroups";
import { createServiceSchema, type CreateServiceFormData } from "@/schemas/create-service.schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";

interface CreateServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyId: string;
  defaultServiceGroupId?: string;
}

export function CreateServiceDialog({
  open,
  onOpenChange,
  companyId,
  defaultServiceGroupId,
}: CreateServiceDialogProps) {
    const { toast } = useToast();
    const { t } = useTranslation("services");
    const createService = useCreateService();
    const { data: serviceGroups } = useServiceGroups();
    
    const filteredServiceGroups = serviceGroups?.data.filter(
        group => group.companyId === companyId
    ) || [];
        
    const form = useForm<CreateServiceFormData>({
        resolver: zodResolver(createServiceSchema),
        defaultValues: {
            name: "",
            price: 0,
            duration: 30,
            serviceGroupId: defaultServiceGroupId || "",
        },
    });

    const onSubmit = async (values: CreateServiceFormData) => {
        await createService.mutateAsync({
            name: values.name,
            price: values.price,
            duration: values.duration,
            serviceGroupId: values.serviceGroupId,
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
                            name="serviceGroupId"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>{t("createDialog.serviceGroupLabel")}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t("createDialog.serviceGroupPlaceholder")} />
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
                                <FormDescription>
                                    {t("createDialog.serviceGroupDescription")}
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

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

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field: { onChange, ...field } }) => (
                                <FormItem>
                                <FormLabel>{t("createDialog.priceLabel")}</FormLabel>
                                <FormControl>
                                    <Input
                                    type="number"
                                    step="0.01"
                                    placeholder={t("createDialog.pricePlaceholder")}
                                    {...field}
                                    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                                    />
                                </FormControl>
                                <FormDescription>
                                    {t("createDialog.priceDescription")}
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field: { onChange, ...field } }) => (
                                <FormItem>
                                <FormLabel>{t("createDialog.durationLabel")}</FormLabel>
                                <FormControl>
                                    <Input
                                    type="number"
                                    placeholder={t("createDialog.durationPlaceholder")}
                                    {...field}
                                    onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
                                    />
                                </FormControl>
                                <FormDescription>
                                    {t("createDialog.durationDescription")}
                                </FormDescription>
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
                            <Button type="submit" disabled={createService.isPending}>
                                {createService.isPending 
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
