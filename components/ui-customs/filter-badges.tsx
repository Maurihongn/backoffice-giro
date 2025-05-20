"use client"

import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

export interface FilterBadge {
  key: string
  value: string
  label: string
}

export interface FilterBadgesProps {
  filters: FilterBadge[]
}

export function FilterBadges({ filters }: FilterBadgesProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Si no hay filtros, no renderizamos nada
  if (filters.length === 0) {
    return null
  }

  const handleRemoveFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(key)
    params.set("pageNumber", "1") // Volver a la primera página al cambiar filtros
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleClearAllFilters = () => {
    const params = new URLSearchParams()
    params.set("pageNumber", "1")
    params.set("pageSize", searchParams.get("pageSize") || "10")
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      <span className="text-sm font-medium text-muted-foreground">Filtros activos:</span>
      {filters.map((filter) => (
        <Badge key={filter.key} variant="secondary" className="flex items-center gap-1">
          <span>
            {filter.label}: {filter.value}
          </span>
          <button
            onClick={() => handleRemoveFilter(filter.key)}
            className="ml-1 rounded-full hover:bg-muted p-0.5"
            aria-label={`Eliminar filtro ${filter.label}`}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      {filters.length > 1 && (
        <button
          onClick={handleClearAllFilters}
          className="text-xs text-muted-foreground hover:text-foreground underline ml-2"
        >
          Limpiar todos
        </button>
      )}
    </div>
  )
}
