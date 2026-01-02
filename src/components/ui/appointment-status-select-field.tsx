"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { AppointmentStatus } from "@/types/appointment.types";

interface AppointmentStatusSelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  statusLabels: {
    scheduled: string;
    completed: string;
    canceled: string;
  };
}

export function AppointmentStatusSelectField<T extends FieldValues>({
  control,
  name,
  label,
  statusLabels,
}: AppointmentStatusSelectFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value={AppointmentStatus.SCHEDULED}>
                {statusLabels.scheduled}
              </SelectItem>
              <SelectItem value={AppointmentStatus.COMPLETED}>
                {statusLabels.completed}
              </SelectItem>
              <SelectItem value={AppointmentStatus.CANCELED}>
                {statusLabels.canceled}
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
