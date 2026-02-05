"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

import SortProducts, { SortOptions } from "./sort-products"

type FilterOptions = {
  priceRange: { min?: number; max?: number }
  inStock: boolean
  onSale: boolean
  search: string
  category: string
}

type RefinementListProps = {
  sortBy: SortOptions
  filters?: FilterOptions
  search?: boolean
  'data-testid'?: string
}

const RefinementList = ({ sortBy, filters, 'data-testid': dataTestId }: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  const updateFilters = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="mb-4">
      <div className="card mb-3">
        <div className="card-body">
          <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
        </div>
      </div>

      {/* Active Category Filter */}
      {filters?.category && (
        <div className="alert alert-info d-flex justify-content-between align-items-center mb-3">
          <span>
            <strong>Category:</strong> {filters.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => updateFilters({ category: '' })}
          >
            Clear
          </button>
        </div>
      )}
      
      {/* Search Filter */}
      <div className="card mb-3">
        <div className="card-body">
          <h6 className="card-title mb-3">Search</h6>
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            defaultValue={filters?.search || ''}
            onChange={(e) => updateFilters({ search: e.target.value, page: '1' })}
          />
        </div>
      </div>

      {/* Price Filter */}
      <div className="card mb-3">
        <div className="card-body">
          <h6 className="card-title mb-3">Price Range</h6>
          <div className="row g-2">
            <div className="col-6">
              <input
                type="number"
                className="form-control"
                placeholder="Min"
                defaultValue={filters?.priceRange?.min || ''}
                onChange={(e) => updateFilters({ minPrice: e.target.value, page: '1' })}
              />
            </div>
            <div className="col-6">
              <input
                type="number"
                className="form-control"
                placeholder="Max"
                defaultValue={filters?.priceRange?.max || ''}
                onChange={(e) => updateFilters({ maxPrice: e.target.value, page: '1' })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Status Filters */}
      <div className="card mb-3">
        <div className="card-body">
          <h6 className="card-title mb-3">Status</h6>
          <div className="form-check mb-2">
            <input
              type="checkbox"
              className="form-check-input"
              id="inStockCheck"
              checked={filters?.inStock || false}
              onChange={(e) => updateFilters({ inStock: e.target.checked ? 'true' : '', page: '1' })}
            />
            <label className="form-check-label" htmlFor="inStockCheck">
              In Stock
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="onSaleCheck"
              checked={filters?.onSale || false}
              onChange={(e) => updateFilters({ onSale: e.target.checked ? 'true' : '', page: '1' })}
            />
            <label className="form-check-label" htmlFor="onSaleCheck">
              On Sale
            </label>
          </div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="card mb-3">
        <div className="card-body">
          <h6 className="card-title mb-3">View</h6>
          <div className="btn-group w-100" role="group">
            <button
              type="button"
              onClick={() => updateFilters({ view: 'grid' })}
              className={`btn ${
                searchParams?.get('view') !== 'list' 
                  ? 'btn-primary' 
                  : 'btn-outline-primary'
              }`}
            >
              Grid
            </button>
            <button
              type="button"
              onClick={() => updateFilters({ view: 'list' })}
              className={`btn ${
                searchParams?.get('view') === 'list' 
                  ? 'btn-primary' 
                  : 'btn-outline-primary'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RefinementList
