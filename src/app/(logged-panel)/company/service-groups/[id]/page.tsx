"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useServiceGroups } from "@/hooks/company/service-groups/useServiceGroups";
import { useUpdateServiceGroup } from "@/hooks/company/service-groups/useUpdateServiceGroup";
import { useDeleteServiceGroup } from "@/hooks/company/service-groups/useDeleteServiceGroup";
import { useDeleteService } from "@/hooks/company/services/useDeleteService";
import { LoadingState, ErrorState } from "@/components/states";
import { DataList } from "@/components/globals";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save, Trash2, Package, Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CreateServiceDialog } from "../../_components/CreateServiceDialog";
import { ServiceListItem } from "../../_components/ServiceListItem";
import { COMPANY_ROUTES } from "@/constants";
import { Service } from "@/types";

export default function ServiceGroupDetailPage() {
  const params = useParams();
  const router = useRouter();
  const serviceGroupId = params.id as string;
  const { t } = useTranslation("serviceGroups");

  const deleteService = useDeleteService();
  const updateServiceGroup = useUpdateServiceGroup();
  const deleteServiceGroup = useDeleteServiceGroup();
  const { data: serviceGroupsData, isLoading } = useServiceGroups();

  const [name, setName] = useState("");
  const [hasLoadedName, setHasLoadedName] = useState(false);
  const [isCreateServiceDialogOpen, setIsCreateServiceDialogOpen] = useState(false);

  const serviceGroup = serviceGroupsData?.data.find(sg => sg.id === serviceGroupId);

  if (serviceGroup && !hasLoadedName) {
    setName(serviceGroup.name);
    setHasLoadedName(true);
  }

  const handleSave = async () => {
    if (!name.trim() || name.length < 3) {
      return;
    }

    await updateServiceGroup.mutateAsync({
      id: serviceGroupId,
      data: { name },
    });
  };

  const handleDelete = async () => {
    await deleteServiceGroup.mutateAsync(serviceGroupId);
    router.push(COMPANY_ROUTES.COMPANY_SERVICE_GROUPS);
  };

  const handleDeleteService = async (serviceId: string, serviceName: string) => {
    await deleteService.mutateAsync({ serviceId, serviceName });
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!serviceGroup) {
    return <ErrorState description={t("detail.notFound")} />;
  }

  const hasChanges = name !== serviceGroup.name;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(COMPANY_ROUTES.COMPANY_SERVICE_GROUPS)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{t("detail.title")}</h1>
          <p className="text-muted-foreground">
            {t("detail.description")}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>{t("detail.groupInfo")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                {t("detail.groupName")}
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("detail.groupNamePlaceholder")}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                disabled={!hasChanges || updateServiceGroup.isPending}
                className="flex-1"
              >
                <Save className="mr-2 h-4 w-4" />
                {updateServiceGroup.isPending ? t("detail.saving") : t("detail.save")}
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="icon"
                    disabled={deleteServiceGroup.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t("detail.deleteDialog.title")}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t("detail.deleteDialog.description", { name: serviceGroup.name })}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t("detail.deleteDialog.cancel")}</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {t("detail.deleteDialog.confirm")}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t("detail.services", { count: serviceGroup.services.length })}</CardTitle>
              <Button
                size="sm"
                onClick={() => setIsCreateServiceDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                {t("detail.newService")}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <DataList<Service>
              isLoading={false}
              data={serviceGroup.services}
              renderItem={(service) => (
                <ServiceListItem
                  service={service}
                  companyId={serviceGroup.companyId}
                  onDelete={handleDeleteService}
                />
              )}
              emptyState={{
                icon: Package,
                title: t("detail.emptyServices"),
                description: t("detail.emptyServicesDescription"),
              }}
              gridClassName="space-y-2"
            />
          </CardContent>
        </Card>
      </div>

      <CreateServiceDialog
        open={isCreateServiceDialogOpen}
        onOpenChange={setIsCreateServiceDialogOpen}
        companyId={serviceGroup.companyId}
        defaultServiceGroupId={serviceGroup.id}
      />
    </div>
  );
}
