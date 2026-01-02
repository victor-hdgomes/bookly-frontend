"use client";

import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Buscar...",
  className,
  buttonLabel,
  onButtonClick,
}: SearchInputProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className || ""}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10"
        />
      </div>
      {buttonLabel && onButtonClick && (
        <Button onClick={onButtonClick}>
          <Plus className="h-4 w-4 mr-2" />
          {buttonLabel}
        </Button>
      )}
    </div>
  );
}
