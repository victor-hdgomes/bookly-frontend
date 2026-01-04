import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface PageWithTableSkeletonProps {
  showSearch?: boolean
  rowCount?: number
  columnCount?: number
}

export function PageWithTableSkeleton({ 
  showSearch = true,
  rowCount = 8,
  columnCount = 5
}: PageWithTableSkeletonProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-96" />
      </div>

      {showSearch && <Skeleton className="h-10 w-full" />}

      <Card>
        <div className="p-0">
          <div className="border-b bg-muted/50 p-4">
            <div className="flex gap-4">
              {Array.from({ length: columnCount }).map((_, index) => (
                <Skeleton 
                  key={index} 
                  className={`h-4 ${index === 0 ? 'w-1/4' : 'w-1/6'}`} 
                />
              ))}
            </div>
          </div>

          <div className="divide-y">
            {Array.from({ length: rowCount }).map((_, index) => (
              <div key={index} className="p-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 flex gap-4">
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                    {Array.from({ length: columnCount - 2 }).map((_, colIndex) => (
                      <Skeleton key={colIndex} className="h-4 w-1/6" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t p-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-40" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
