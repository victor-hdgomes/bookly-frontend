import Link from "next/link"
import { Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NotFoundActionsProps {
  onBack: () => void
  backLabel: string
  homeLabel: string
}

export function NotFoundActions({ onBack, backLabel, homeLabel }: NotFoundActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
      <Button
        onClick={onBack}
        variant="outline"
        size="lg"
        className="w-full sm:w-auto"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {backLabel}
      </Button>
      <Button
        asChild
        size="lg"
        className="w-full sm:w-auto"
      >
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          {homeLabel}
        </Link>
      </Button>
    </div>
  )
}
