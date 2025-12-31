import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: {
    sortBy?: SortOptions
    page?: string
    minPrice?: string
    maxPrice?: string
    inStock?: string
    onSale?: string
    search?: string
    view?: "grid" | "list"
    category?: string
  }
  params: {
    countryCode: string
  }
}

export default async function StorePage({ searchParams, params }: Params) {
  const { 
    sortBy, 
    page,
    minPrice,
    maxPrice,
    inStock,
    onSale,
    search,
    view,
    category
  } = searchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      filters={{
        priceRange: { 
          min: minPrice ? parseFloat(minPrice) : undefined, 
          max: maxPrice ? parseFloat(maxPrice) : undefined 
        },
        inStock: inStock === 'true',
        onSale: onSale === 'true',
        search: search || '',
        category: category || '',
      }}
      viewMode={view || 'grid'}
    />
  )
}
