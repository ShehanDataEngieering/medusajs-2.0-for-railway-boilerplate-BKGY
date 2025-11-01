import { Suspense } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"

export default async function Nav() {
  return (
    <div className="tp-header-sticky header-sticky inset-x-0 z-50">
      <header className="tp-header-main bg-white border-b border-ui-border-base">
        <div className="content-container h-16 flex items-center justify-between">
          <div className="logo">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
              data-testid="nav-store-link"
            >
              Medusa Store
            </LocalizedClientLink>
          </div>

          <div className="main-menu menu-style-1 hidden small:block">
            <nav>
              <ul className="flex items-center gap-x-6">
                <li>
                  <LocalizedClientLink className="hover:text-ui-fg-base" href="/">
                    Home
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink className="hover:text-ui-fg-base" href="/store">
                    Store
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink className="hover:text-ui-fg-base" href="/search" data-testid="nav-search-link">
                    Search
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink className="hover:text-ui-fg-base" href="/account" data-testid="nav-account-link">
                    Account
                  </LocalizedClientLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="tp-header-action flex items-center gap-x-6">
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
