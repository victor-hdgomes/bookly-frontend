import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface NoSubscriptionStateProps {
  message: string;
}

export function NoSubscriptionState({ message }: NoSubscriptionStateProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 text-muted-foreground">
          <AlertCircle className="w-5 h-5" />
          <p>{message}</p>
        </div>
      </CardContent>
    </Card>
  );
}
