import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  description?: string;
  minHeight?: string;
  iconColor?: string;
}

export function ErrorState({ 
  title = "Erro ao carregar dados",
  description = "Não foi possível carregar as informações. Tente novamente mais tarde.",
  minHeight = "100vh",
  iconColor = "text-red-500"
}: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center" style={{ minHeight }}>
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center gap-4">
            <AlertCircle className={`w-12 h-12 ${iconColor}`} />
            <div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


