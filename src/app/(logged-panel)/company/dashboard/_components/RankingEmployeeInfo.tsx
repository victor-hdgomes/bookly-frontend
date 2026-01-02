import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface RankingEmployeeInfoProps {
  displayName: string;
  avatarUrl: string | null;
  avatarFallback: string;
  position: string | null;
}

export function RankingEmployeeInfo({ 
  displayName, 
  avatarUrl, 
  avatarFallback, 
  position 
}: RankingEmployeeInfoProps) {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src={avatarUrl || undefined} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      
      <div>
        <p className="font-medium">{displayName}</p>
        {position && (
          <Badge variant="secondary" className="mt-1">
            {position}
          </Badge>
        )}
      </div>
    </div>
  );
}
