"use client";

import { ReactNode } from "react";
import { Pencil, Trash2, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ListItemProps {
  isActive?: boolean;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  avatar?: {
    src?: string | null;
    fallback?: string;
  } | null;
  badges?: ReactNode;
  content?: ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleStatus?: () => void;
  customActions?: ReactNode;
  className?: string;
}

export function ListItem({ 
  isActive = true,
  title,
  subtitle,
  description,
  avatar,
  badges,
  content,
  onEdit,
  onDelete,
  onToggleStatus,
  customActions,
  className = ""
}: ListItemProps) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg border p-3 transition-colors ${
        isActive ? 'hover:bg-accent/50' : 'opacity-60 bg-muted'
      } ${className}`}
    >
      <div className="flex items-center gap-4 flex-1">
        {avatar && (
          <Avatar>
            <AvatarImage src={avatar.src || undefined} />
            <AvatarFallback>{avatar.fallback}</AvatarFallback>
          </Avatar>
        )}
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-medium">{title}</p>
            {badges}
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
          {content}
        </div>
      </div>
      
      {(onEdit || onDelete || onToggleStatus || customActions) && (
        <div className="flex items-center gap-1">
          {customActions}
          {onToggleStatus && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleStatus}
              title={isActive ? "Desativar" : "Ativar"}
            >
              <Power className={`h-4 w-4 ${isActive ? 'text-green-600' : 'text-gray-400'}`} />
            </Button>
          )}
          {onEdit && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onEdit}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
