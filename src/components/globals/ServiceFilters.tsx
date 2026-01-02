"use client";

import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ServiceGroup {
  id: string;
  name: string;
}

interface ServiceFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedGroupId: string;
  onGroupChange: (value: string) => void;
  serviceGroups: ServiceGroup[];
  showInactive: boolean;
  onShowInactiveChange: (value: boolean) => void;
  onCreateNew: () => void;
  canCreate: boolean;
}

export function ServiceFilters({
  searchQuery,
  onSearchChange,
  selectedGroupId,
  onGroupChange,
  serviceGroups,
  showInactive,
  onShowInactiveChange,
  onCreateNew,
  canCreate,
}: ServiceFiltersProps) {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t("filters.searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-9"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
            onClick={() => onSearchChange("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Select
        value={selectedGroupId || "all"}
        onValueChange={(value) => onGroupChange(value === "all" ? "" : value)}
      >
        <SelectTrigger className="w-full md:w-[240px]">
          <SelectValue placeholder={t("filters.allGroups")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("filters.allGroups")}</SelectItem>
          {serviceGroups.map((group) => (
            <SelectItem key={group.id} value={group.id}>
              {group.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2">
        <Switch
          id="show-inactive"
          checked={showInactive}
          onCheckedChange={onShowInactiveChange}
        />
        <Label htmlFor="show-inactive" className="text-sm cursor-pointer">
          {t("filters.showInactive")}
        </Label>
      </div>

      <Button onClick={onCreateNew} disabled={!canCreate}>
        <Plus className="mr-2 h-4 w-4" />
        {t("filters.new")}
      </Button>
    </div>
  );
}
