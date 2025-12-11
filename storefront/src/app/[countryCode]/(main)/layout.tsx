import { Metadata } from "next"

import FooterTwo from "@modules/layout/templates/footerNew/footer-2"
import Nav from "@modules/layout/templates/nav"
import { CartProvider } from "@lib/context/CartContext"
import { getBaseURL } from "@lib/util/env"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Nav />
      {props.children}
      <FooterTwo />
    </CartProvider>
  )
}
