import { PageWithGridSkeleton } from "@/components/states/PageWithGridSkeleton"

export default function Loading() {
  return <PageWithGridSkeleton columns={3} itemCount={6} />
}
