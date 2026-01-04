import { Suspense, ReactNode } from "react"
import { LoadingState } from "@/components/states/LoadingState"

interface PageSuspenseWrapperProps {
  children: ReactNode
  fallback?: ReactNode
}

export function PageSuspenseWrapper({ 
  children, 
  fallback = <LoadingState /> 
}: PageSuspenseWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  )
}
