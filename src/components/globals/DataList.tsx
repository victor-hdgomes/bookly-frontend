import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { LoadingState, EmptyState } from "@/components/states";
import { PaginationControls } from "./PaginationControls";
import { Card, CardContent } from "../ui/card";

interface DataListProps<T> {
  isLoading: boolean;
  data: T[];
  renderItem: (item: T) => ReactNode;
  emptyState: {
    icon: LucideIcon;
    title: string;
    description: string;
  };
  gridClassName?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
  };
}

export function DataList<T extends { id: string }>({
  isLoading,
  data,
  renderItem,
  emptyState,
  gridClassName = "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
  pagination,
}: DataListProps<T>) {
  if (isLoading) {
    return <LoadingState />;
  }

  if (data.length === 0) {
    return (
      <EmptyState
        icon={emptyState.icon}
        title={emptyState.title}
        description={emptyState.description}
      />
    );
  }

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className={gridClassName}>
          {data.map((item) => (
            <div key={item.id}>{renderItem(item)}</div>
          ))}
        </div>
      
        {pagination && (
          <PaginationControls
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            itemsPerPage={pagination.itemsPerPage}
            totalItems={pagination.totalItems}
            onPageChange={pagination.onPageChange}
            onItemsPerPageChange={pagination.onItemsPerPageChange}
          />
        )}
      
      </CardContent>
    </Card>
  );
}
