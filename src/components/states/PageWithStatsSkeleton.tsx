import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function PageWithStatsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-80" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-8 rounded" />
              </div>
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-3 w-40" />
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-10 w-48" />
          </div>

          <div className="space-y-3 pt-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
