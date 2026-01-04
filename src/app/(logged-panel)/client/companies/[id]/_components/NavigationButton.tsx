import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

export function NavigationButton({ direction, onClick }: NavigationButtonProps) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  const position = direction === "left" ? "left-0" : "right-0";

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`absolute ${position} top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-background/80 hover:bg-background shadow-md`}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
