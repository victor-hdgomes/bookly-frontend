"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface ServiceActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function ServiceActionButtons({ onEdit, onDelete }: ServiceActionButtonsProps) {
  return (
    <div className="flex gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={onEdit}
      >
        <Edit className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
