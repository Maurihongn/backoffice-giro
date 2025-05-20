"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

interface PageSizeSelectorProps {
  pageSizes?: number[]
  currentPageSize: number
  className?: string
}

export function PageSizeSelector({ pageSizes = [10, 25, 50, 100], currentPageSize, className }: PageSizeSelectorProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handlePageSizeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("pageSize", value)

    // Si el cambio de tamaño de página hace que la página actual sea inválida,
    // volvemos a la primera página
    const currentPage = Number(params.get("pageNumber") || "1")
    const newPageSize = Number(value)
    const totalItems = Number(params.get("totalItems") || "0")

    if (totalItems > 0) {
      const totalPages = Math.ceil(totalItems / newPageSize)
      if (currentPage > totalPages) {
        params.set("pageNumber", "1")
      }
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className={`flex items-center space-x-2 ${className || ""}`}>
      <span className="text-sm text-muted-foreground whitespace-nowrap">Mostrar</span>
      <Select value={currentPageSize.toString()} onValueChange={handlePageSizeChange}>
        <SelectTrigger className="h-8 w-[70px]">
          <SelectValue placeholder={currentPageSize.toString()} />
        </SelectTrigger>
        <SelectContent>
          {pageSizes.map((size) => (
            <SelectItem key={size} value={size.toString()}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="text-sm text-muted-foreground whitespace-nowrap">por página</span>
    </div>
  )
}
