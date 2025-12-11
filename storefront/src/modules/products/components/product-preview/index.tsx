import { Text } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  // Use the product data directly - already has price info from parent query
  const { cheapestPrice } = getProductPrice({
    product: product,
  })

  return (
    <div className="tp-product-item mb-30">
      <div className="tp-product-thumb p-relative">
        <LocalizedClientLink href={`/products/${product.handle}`} className="group">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />
        </LocalizedClientLink>
      </div>
      <div className="tp-product-content">
        <h3 className="tp-product-title">
          <LocalizedClientLink href={`/products/${product.handle}`}>
            {product.title}
          </LocalizedClientLink>
        </h3>
        <div className="tp-product-price-wrapper">
          <div className="flex items-center gap-x-2">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </div>
  )
}
