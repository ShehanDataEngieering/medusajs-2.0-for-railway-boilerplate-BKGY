import React from "react"
import Link from "next/link"
import Image from "next/image"
import menu_data from "@lib/data/menu-data"

export default function Menu() {
  return (
    <ul>
      {menu_data.map((menu) => (
        <li key={menu.id}>
          <Link href={menu.link}>{menu.title}</Link>
          <div className="home-menu tp-submenu tp-mega-menu">
            <div className="row row-cols-lg-4 row-cols-sm-2 row-cols-1 gx-2 gy-2 gy-lg-0"></div>
          </div>
        </li>
      ))}
    </ul>
  )
}
