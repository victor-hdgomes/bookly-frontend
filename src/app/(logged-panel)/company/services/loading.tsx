import { PageWithListSkeleton } from "@/components/states/PageWithListSkeleton"

export default function Loading() {
  return <PageWithListSkeleton filtersCount={4} itemCount={6} />
}
