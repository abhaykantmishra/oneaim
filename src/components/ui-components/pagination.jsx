import Link from "next/link"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Pagination({ currentPage, totalPages, baseUrl, className }) {
  // Generate page numbers to display
  const generatePages = () => {
    const pages = []

    // Always show first page
    pages.push(1)

    // Calculate range of pages to show around current page
    let rangeStart = Math.max(2, currentPage - 1)
    let rangeEnd = Math.min(totalPages - 1, currentPage + 1)

    // Adjust range to always show 3 pages if possible
    if (rangeEnd - rangeStart < 2) {
      if (rangeStart === 2) {
        rangeEnd = Math.min(totalPages - 1, rangeEnd + 1)
      } else if (rangeEnd === totalPages - 1) {
        rangeStart = Math.max(2, rangeStart - 1)
      }
    }

    // Add ellipsis before range if needed
    if (rangeStart > 2) {
      pages.push("ellipsis-start")
    }

    // Add range pages
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i)
    }

    // Add ellipsis after range if needed
    if (rangeEnd < totalPages - 1) {
      pages.push("ellipsis-end")
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  const pages = generatePages()

  if (totalPages <= 1) {
    return null
  }

  return (
    <nav className={cn("flex justify-center", className)} aria-label="Pagination">
      <ul className="flex items-center gap-1">
        {/* Previous button */}
        <li>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            disabled={currentPage === 1}
            asChild={currentPage !== 1}
          >
            {currentPage === 1 ? (
              <span>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </span>
            ) : (
              <Link href={`${baseUrl}?page=${currentPage - 1}`}>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Link>
            )}
          </Button>
        </li>

        {/* Page numbers */}
        {pages.map((page, i) => (
          <li key={i}>
            {page === "ellipsis-start" || page === "ellipsis-end" ? (
              <span className="flex h-9 w-9 items-center justify-center">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More pages</span>
              </span>
            ) : (
              <Button
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                className={cn("h-9 w-9", currentPage === page && "bg-primary hover:bg-primary/90")}
                asChild={currentPage !== page}
              >
                {currentPage === page ? <span>{page}</span> : <Link href={`${baseUrl}?page=${page}`}>{page}</Link>}
              </Button>
            )}
          </li>
        ))}

        {/* Next button */}
        <li>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            disabled={currentPage === totalPages}
            asChild={currentPage !== totalPages}
          >
            {currentPage === totalPages ? (
              <span>
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </span>
            ) : (
              <Link href={`${baseUrl}?page=${currentPage + 1}`}>
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Link>
            )}
          </Button>
        </li>
      </ul>
    </nav>
  )
}