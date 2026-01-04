import { PageWithListSkeleton } from "@/components/states/PageWithListSkeleton"

export default function Loading() {
  return <PageWithListSkeleton filtersCount={3} itemCount={5} />
}
