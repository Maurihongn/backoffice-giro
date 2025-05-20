"use client";

import { PageSizeSelector } from "@/components/ui-customs/page-size-selector";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


interface UsersPaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

export function UsersPagination({
  currentPage,
  totalPages,
  pageSize,
}: UsersPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Function to update URL with new page number
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pageNumber", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // If total pages is less than max pages to show, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);

      // Calculate start and end of page range
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if at the beginning
      if (currentPage <= 2) {
        end = 4;
      }

      // Adjust if at the end
      if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }

      // Add ellipsis if needed
      if (start > 2) {
        pageNumbers.push(-1); // -1 represents ellipsis
      }

      // Add page numbers
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pageNumbers.push(-2); // -2 represents ellipsis
      }

      // Always include last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  if (totalPages <= 0) {
    return (
      <div className="flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
        <PageSizeSelector currentPageSize={pageSize} />
        <div className="text-sm text-muted-foreground">No hay resultados</div>
      </div>
    );
  }

  // const startItem = (currentPage - 1) * pageSize + 1;
  // const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col-reverse items-center justify-between gap-4 lg:flex-row">
      <div className="flex items-center gap-4">
        <PageSizeSelector currentPageSize={pageSize} />
      </div>
      <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
        <div className="text-sm text-muted-foreground md:hidden">
          Página {currentPage} de {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
             className="hidden md:inline-flex"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>

          {getPageNumbers().map((pageNumber, index) => {
            if (pageNumber === -1 || pageNumber === -2) {
              return (
                <Button
                  key={`ellipsis-${index}`}
                  variant="outline"
                  size="icon"
                  disabled
                >
                  ...
                </Button>
              );
            }

            return (
              <Button
                key={pageNumber}
                variant={currentPage === pageNumber ? "default" : "outline"}
                size="icon"
                onClick={() => handlePageChange(pageNumber)}
                
              >
                {pageNumber}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
             className="hidden md:inline-flex"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Página siguiente</span>
          </Button>
          
        </div>
      </div>
    </div>
  );
}
