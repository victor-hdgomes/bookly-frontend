import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnyProfessionalCardProps {
  isSelected: boolean;
  onSelect: () => void;
}

export function AnyProfessionalCard({ isSelected, onSelect }: AnyProfessionalCardProps) {
  const { t } = useTranslation("booking");

  return (
    <Card
      className={cn(
        "p-4 cursor-pointer transition-all hover:shadow-md active:scale-[0.98]",
        isSelected && "ring-2 ring-primary bg-primary/5"
      )}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 bg-primary/10">
            <AvatarFallback>
              <Users className="h-6 w-6 text-primary" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold">{t("professional.any")}</h4>
            <p className="text-sm text-muted-foreground">
              {t("professional.anyDescription")}
            </p>
          </div>
        </div>
        <ChevronRight className={cn(
          "h-5 w-5 transition-colors",
          isSelected ? "text-primary" : "text-muted-foreground"
        )} />
      </div>
    </Card>
  );
}
