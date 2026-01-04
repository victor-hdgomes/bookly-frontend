import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function PageWithFormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-64" />
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="space-y-3 flex-1">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="space-y-4">
              <Skeleton className="h-5 w-40" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4">
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
