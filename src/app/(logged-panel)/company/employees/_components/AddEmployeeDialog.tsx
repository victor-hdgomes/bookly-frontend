"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateEmployee, useSearchUserByEmail } from "@/hooks/company/employees";
import { useToast } from "@/hooks/useToast";
import { SearchEmployeeInput } from "./SearchEmployeeInput";
import { UserFoundMessage } from "./UserFoundMessage";
import { EmployeePositionInput } from "./EmployeePositionInput";
import { DialogActions } from "./DialogActions";

interface AddEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyId: string;
}

interface AddEmployeeFormData {
  email: string;
  position?: string;
}

export function AddEmployeeDialog({ open, onOpenChange, companyId }: AddEmployeeDialogProps) {
    const { toast } = useToast();
    const { t } = useTranslation("employees");
    const createEmployee = useCreateEmployee();
    const [searchEmail, setSearchEmail] = useState("");
    const [enableSearch, setEnableSearch] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<AddEmployeeFormData>();
  
  const { data: foundUser, isLoading: isSearching, error: searchError } = useSearchUserByEmail(
    searchEmail,
    enableSearch
  );

  const handleSearchUser = () => {
    const email = watch("email");
    if (!email || !email.includes('@')) {
      toast({
        title: t("errors.emailRequired"),
        description: t("errors.emailRequired"),
        variant: "destructive",
      });
      return;
    }
    
    setSearchEmail(email);
    setEnableSearch(true);
  };

  const onSubmit = async (data: AddEmployeeFormData) => {
    if (!foundUser) {
      toast({
        title: t("toast.searchFirst"),
        description: t("toast.searchFirstDescription"),
        variant: "destructive",
      });
      return;
    }

    await createEmployee.mutateAsync({
      userId: foundUser.id,
      companyId,
      position: data.position || undefined,
    });

    toast({
      title: t("toast.employeeAdded"),
      description: t("toast.employeeAddedDescription"),
    });

    handleClose();
  };

  const handleClose = () => {
    reset();
    setSearchEmail("");
    setEnableSearch(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("addEmployeeDialog.title")}</DialogTitle>
          <DialogDescription>
            {t("addEmployeeDialog.description")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <SearchEmployeeInput
            register={register}
            errors={errors}
            isSearching={isSearching}
            foundUser={!!foundUser}
            searchError={!!searchError}
            enableSearch={enableSearch}
            onSearch={handleSearchUser}
          />

          {foundUser && (
            <UserFoundMessage
              displayName={foundUser.displayName}
              firstName={foundUser.firstName}
              lastName={foundUser.lastName}
            />
          )}

          <EmployeePositionInput
            register={register}
            disabled={!foundUser}
          />

          <DialogActions
            onCancel={handleClose}
            isSubmitting={createEmployee.isPending}
            canSubmit={!!foundUser}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
