import { PageWithListSkeleton } from "@/components/states/PageWithListSkeleton"

export default function Loading() {
  return <PageWithListSkeleton filtersCount={5} itemCount={6} />
}
