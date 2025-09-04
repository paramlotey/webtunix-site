import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function PaginationControls({
  page,
  totalPages,
  buildHref,
}: {
  page: number;
  totalPages: number;
  buildHref: (p: number) => string;
}) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(totalPages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (page + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          {page > 1 ? (
            <PaginationPrevious href={buildHref(page - 1)} />
          ) : (
            <span className="opacity-50 pointer-events-none">
              <PaginationPrevious href="#" />
            </span>
          )}
        </PaginationItem>

        {/* Page Numbers */}
        {getVisiblePages().map((pageNum, index) => (
          <PaginationItem key={index}>
            {pageNum === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={buildHref(pageNum as number)}
                isActive={pageNum === page}
                className={
                  pageNum === page ? "!bg-white !text-black" : "text-white"
                }
              >
                {pageNum}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next */}
        <PaginationItem>
          {page < totalPages ? (
            <PaginationNext href={buildHref(page + 1)} />
          ) : (
            <span className="opacity-50 pointer-events-none">
              <PaginationNext href="#" />
            </span>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationControls