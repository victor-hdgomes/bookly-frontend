import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  iconColor?: string;
  minHeight?: string;
  children?: ReactNode;
}

export function EmptyState({ 
  title,
  description,
  icon: Icon = AlertCircle,
  iconColor = "text-yellow-500",
  minHeight = "400px",
  children
}: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center" style={{ minHeight }}>
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center gap-4">
            <Icon className={`w-12 h-12 ${iconColor}`} />
            <div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </div>
            {children}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


