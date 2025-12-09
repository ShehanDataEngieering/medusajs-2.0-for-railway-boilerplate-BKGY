"use client"

import CartDropdown from "../cart-dropdown"
import { useCart } from "@lib/context/CartContext"

export default function CartButton() {
  const { cart } = useCart()

  return <CartDropdown cart={cart} />
}
