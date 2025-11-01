import { Suspense } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import Image from "next/image"
import HeaderSearch from "@modules/layout/components/header-search"
import NavRegionCurrency from "@modules/layout/components/nav-region-currency"
import { listRegions } from "@lib/data/regions"

export default async function Nav() {
  const regions = await listRegions().then((r) => r).catch(() => null)

  return (
    <div className="tp-header-sticky header-sticky inset-x-0 z-50">
      <header className="tp-header-main bg-white border-b border-ui-border-base" style={{ paddingTop: 8, paddingBottom: 8 }}>
        <div className="content-container h-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <LocalizedClientLink href="/" className="flex items-center gap-2" data-testid="nav-store-link">
              <Image
                src="/assets/img/logo/crowncut-logo.png"
                alt="Crown Cut"
                width={120}
                height={28}
                priority
              />
              <span className="txt-compact-xlarge-plus uppercase whitespace-nowrap">Crown Cut</span>
            </LocalizedClientLink>
          </div>

          <div className="flex-1 flex justify-center">
            <HeaderSearch />
          </div>

          <div className="flex items-center gap-x-6">
            <nav className="hidden small:block">
              <ul className="flex items-center gap-x-6 text-small-regular">
                <li>
                  <LocalizedClientLink className="hover:text-ui-fg-base" href="/store">
                    Products
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink className="hover:text-ui-fg-base" href="/store">
                    Store
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink className="hover:text-ui-fg-base" href="/checkout">
                    Shipping
                  </LocalizedClientLink>
                </li>
              </ul>
            </nav>

            <NavRegionCurrency regions={regions} />

            <div>
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="hover:text-ui-fg-base flex gap-2"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    Cart (0)
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
