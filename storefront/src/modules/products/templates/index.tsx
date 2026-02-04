import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const collectionTitle =
    product.collection?.title || product.handle?.replace(/-/g, " ") ||
    "Signature release"

  const storyHeading = "Cobalt Spinel from Ceylon (Sri Lanka)"
  const storyParagraphs = [
    "Experience a burst of joy and excitement as you adorn yourself with this extraordinary cobalt spinel from The Natural Gemstone Company. This exquisite gem, with its stunning 0.95-carat weight, is a true marvel of nature. Its vibrant blue color is unlike anything you've ever seen, captivating the heart and igniting the spirit. Imagine the depth of a serene azure ocean captured and condensed into a tiny yet powerful stone. Each glance at this spinel will transport you to a place of tranquility and exhilaration, eliciting sheer delight with every reflection of light across its surface. Its presence in any jewelry setting will not just complement but redefine exquisite elegance, making you the center of attention wherever you go.",
    "The skillful craftsmanship of this cobalt spinel is evident in every shimmering facet. Its dimensions, at 7.09 x 5.39 x 2.93 mm, and the exceptional mixed brilliant cut, enhance its natural allure. The perfection of its clarity grade—meticulously evaluated at eye level—ensures nothing mars its spotless beauty. This clarity results in unmatched brilliance and fire, much like the unblemished skies above Sri Lanka, where this gem was born. The spinel's intense color intensity creates a feeling of richness, almost palpable in its depth, eliciting emotions of wonder and awe with every glance. The cobalt spinel's surface, finished with an excellent polish, gleams with an unparalleled allure. This is not just a gemstone—it is an invitation to bask in nature's magnificence and to carry a piece of that beauty with you, making every moment spent with it feel special and cherished."
  ]

  return (
    <>
      <section className="product-detail py-5 py-lg-5">
        <div className="container-xxl">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
            <div>
              <p className="text-uppercase text-muted small fw-semibold mb-2">
                {collectionTitle}
              </p>
              <h1 className="display-6 fw-bold mb-0 text-dark">
                {product.title}
              </h1>
            </div>
            <div className="text-lg-end">
              <p className="text-uppercase text-muted small fw-semibold mb-2">
                Shipping to
              </p>
              <div className="d-inline-flex align-items-center gap-2 flex-wrap">
                <span className="badge rounded-pill bg-dark-subtle text-dark-emphasis px-3 py-2">
                  {region.name}
                </span>
                <span className="badge rounded-pill bg-light text-dark border px-3 py-2">
                  {region.currency_code?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <div
            className="product-layout gap-4"
            data-testid="product-container"
          >
            <div className="product-story-column d-flex flex-column gap-4">
              <article className="card border-0 shadow-sm product-story-card h-100">
                <div className="card-body p-4 p-lg-5">
                  <p className="text-uppercase text-muted small fw-semibold mb-3">
                    Narrative
                  </p>
                  <h2 className="h3 fw-bold text-dark mb-4">{storyHeading}</h2>
                  {storyParagraphs.map((paragraph, index) => (
                    <p key={`story-paragraph-${index}`} className="text-body-secondary mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
              <div className="card shadow-sm border-0 product-info-card">
                <div className="card-body p-4 p-lg-5">
                  <ProductInfo product={product} />
                </div>
                <div className="card-footer bg-white border-0 pt-0 product-tabs-wrapper">
                  <ProductTabs product={product} />
                </div>
              </div>
            </div>
            <div className="product-media-column d-flex flex-column gap-4">
              <div className="product-gallery card border-0 shadow-sm p-3 p-lg-4">
                <ImageGallery images={product?.images || []} />
              </div>
              <div className="card shadow-sm border-0 product-actions-card">
                <div className="card-body p-4 p-lg-5 d-flex flex-column gap-4">
                  <ProductOnboardingCta />
                  <Suspense
                    fallback={
                      <ProductActions
                        disabled={true}
                        product={product}
                        region={region}
                      />
                    }
                  >
                    <ProductActionsWrapper id={product.id} region={region} />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="related-products-section py-5"
        data-testid="related-products-container"
      >
        <div className="container-xxl">
          <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-4">
            <div>
              <p className="text-uppercase small fw-semibold text-light-emphasis mb-1">
                Curated for you
              </p>
              <h2 className="h4 text-white mb-0">Complimentary picks</h2>
            </div>
            <span className="text-white-50 small">
              Because you viewed {product.title}
            </span>
          </div>
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </section>
    </>
  )
}

export default ProductTemplate
