import { Metadata } from "next"

import NewFooter from "@modules/layout/templates/footerNew/footer-1"
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
      <NewFooter  primary_style /> 
    </CartProvider>
  )
}
