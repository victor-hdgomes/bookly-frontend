import { Search } from "lucide-react"

export function NotFoundAnimation() {
  return (
    <div className="relative">
      <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary/70 to-primary/40 leading-none select-none">
        404
      </h1>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-bounce">
          <Search className="h-16 w-16 md:h-24 md:w-24 text-muted-foreground" />
        </div>
      </div>
    </div>
  )
}
