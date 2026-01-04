import { Card } from "@/components/ui/card"

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <div className="h-8 bg-muted animate-pulse rounded w-1/4" />
        <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="p-6">
            <div className="space-y-3">
              <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
              <div className="h-8 bg-muted animate-pulse rounded w-3/4" />
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="h-6 bg-muted animate-pulse rounded w-1/4" />
          <div className="h-64 bg-muted animate-pulse rounded" />
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="h-6 bg-muted animate-pulse rounded w-1/3" />
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4 py-3">
              <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
