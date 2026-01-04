import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface PageWithGridSkeletonProps {
  itemCount?: number
  columns?: number
}

export function PageWithGridSkeleton({ 
  itemCount = 6,
  columns = 3
}: PageWithGridSkeletonProps) {
  const gridClass = columns === 2 
    ? "grid-cols-1 md:grid-cols-2"
    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="flex justify-end">
        <Skeleton className="h-10 w-48" />
      </div>

      <div className={`grid ${gridClass} gap-4`}>
        {Array.from({ length: itemCount }).map((_, index) => (
          <Card key={index} className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <Skeleton className="h-8 w-8 rounded" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="pt-2 border-t">
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
