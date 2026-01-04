import { PageWithTableSkeleton } from "@/components/states/PageWithTableSkeleton"

export default function Loading() {
  return <PageWithTableSkeleton rowCount={8} columnCount={5} />
}
