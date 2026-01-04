import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface PageWithListSkeletonProps {
  showFilters?: boolean
  itemCount?: number
  filtersCount?: number
}

export function PageWithListSkeleton({ 
  showFilters = true, 
  itemCount = 6,
  filtersCount = 4
}: PageWithListSkeletonProps) {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-96" />
      </div>

      {showFilters && (
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {Array.from({ length: filtersCount }).map((_, index) => (
              <Skeleton 
                key={index} 
                className={`h-10 ${index === 0 ? 'flex-1' : 'w-full md:w-48'}`} 
              />
            ))}
          </div>
        </Card>
      )}

      <div className="space-y-2">
        {Array.from({ length: itemCount }).map((_, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <Skeleton className="h-12 w-12 rounded" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>
    </div>
  )
}
