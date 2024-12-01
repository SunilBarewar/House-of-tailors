import { Button } from "@/components/ui/button";
import React from "react";

interface PaginationProps {
  offset: number;
  pageSize: number;
  hasMore: boolean;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  offset,
  pageSize,
  hasMore,
  setOffset,
}) => {
  return (
    <div className="flex items-center justify-end space-x-2 py-4 flex-shrink-0 h-[5%]">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOffset((prev) => prev - pageSize)}
        disabled={!offset}
      >
        Previous
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setOffset((prev) => prev + pageSize)}
        disabled={!hasMore}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
