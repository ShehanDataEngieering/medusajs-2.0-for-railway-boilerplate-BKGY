"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import menu_data from "@lib/data/menu-data"
import CartButton from "@modules/layout/components/cart-button"
import NavRegionCurrency from "@modules/layout/components/nav-region-currency"
import type { HttpTypes } from "@medusajs/types"

export default function Menu({
  regions,
}: {
  regions: HttpTypes.StoreRegion[] | null
}) {
  return (
    <>
      <div className="d-flex align-items-center gap-4">
        {/* Brands/DS Section */}

        {/* Menu List Section */}
        <div className="menu-list-section flex-grow-1">
          <ul className="d-flex gap-3 m-0 p-0 list-unstyled">
            {menu_data.map((menu) => (
              <li key={menu.id} className="position-relative">
                <Link
                  href={menu.link}
                  className="text-dark text-decoration-none fw-medium"
                >
                  {menu.title}
                </Link>
                <div className="home-menu tp-submenu tp-mega-menu">
                  <div className="row row-cols-lg-4 row-cols-sm-2 row-cols-1 gx-2 gy-2 gy-lg-0"></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="brands-section flex-shrink-0">
          <NavRegionCurrency regions={regions} />
          <CartButton />
        </div>
      </div>
    </>
  )
}
