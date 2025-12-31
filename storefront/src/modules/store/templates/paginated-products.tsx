import { getProductsListWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]  
  id?: string[]
  order?: string
}

type FilterOptions = {
  priceRange: { min?: number; max?: number }
  inStock: boolean
  onSale: boolean
  search: string
  category: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  filters,
  viewMode = "grid",
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  filters?: FilterOptions
  viewMode?: "grid" | "list"
}) {
  const queryParams: PaginatedProductsParams = {
    limit: 12,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  let {
    response: { products, count },
  } = await getProductsListWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  // Apply client-side filters
  if (filters) {
    // Category filter - apply first
    if (filters.category) {
      products = products.filter((p) => {
        // Filter by product title or tags matching the category slug
        const categorySlug = filters.category.toLowerCase()
        const productTitle = p.title?.toLowerCase() || ''
        const productHandle = p.handle?.toLowerCase() || ''
        
        return productTitle.includes(categorySlug) || productHandle.includes(categorySlug)
      })
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      products = products.filter(
        (p) =>
          p.title?.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower)
      )
    }

    // Price range filter
    if (filters.priceRange.min !== undefined) {
      products = products.filter(
        (p) => (p.calculated_price?.calculated_amount || 0) >= (filters.priceRange.min! * 100)
      )
    }
    if (filters.priceRange.max !== undefined) {
      products = products.filter(
        (p) => (p.calculated_price?.calculated_amount || 0) <= (filters.priceRange.max! * 100)
      )
    }

    // Stock filter
    if (filters.inStock) {
      products = products.filter((p) => {
        const hasStock = p.variants?.some((v: any) => v.inventory_quantity > 0)
        return hasStock
      })
    }

    // Sale filter (products with calculated price less than original)
    if (filters.onSale) {
      products = products.filter((p) => {
        const calcPrice = p.calculated_price?.calculated_amount || 0
        const originalPrice = p.calculated_price?.original_amount || 0
        return calcPrice < originalPrice
      })
    }

    count = products.length
  }

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <>
      {viewMode === "list" ? (
        <div className="list-group mb-4" data-testid="products-list">
          {products.map((p) => (
            <div key={p.id} className="list-group-item">
              <ProductPreview product={p} region={region} isFeatured={true} />
            </div>
          ))}
        </div>
      ) : (
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 mb-4" data-testid="products-list">
          {products.map((p) => (
            <div key={p.id} className="col">
              <ProductPreview product={p} region={region} />
            </div>
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
