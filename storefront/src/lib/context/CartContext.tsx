"use client"
import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { storeApi } from "@lib/medusaClient"

type Cart = any

type CartContextValue = {
  cartId: string | null
  cart: Cart | null
  loading: boolean
  ensureCart: () => Promise<void>
  addItem: (payload: { variant_id: string; quantity: number }) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  refresh: () => Promise<void>
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartId, setCartId] = useState<string | null>(null)
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("cart_id") : null
    if (stored) {
      setCartId(stored)
    }
  }, [])

  useEffect(() => {
    if (!cartId) return
    ;(async () => {
      try {
        setLoading(true)
        const res = await storeApi.retrieveCart(cartId)
        setCart((res as any).cart || res)
      } catch (e) {
        // create cart if retrieval fails
        try {
          const created = await storeApi.createCart({})
          const newId = (created as any).cart?.id || (created as any).id
          if (newId) {
            setCartId(newId)
            if (typeof window !== "undefined") window.localStorage.setItem("cart_id", newId)
            const res2 = await storeApi.retrieveCart(newId)
            setCart((res2 as any).cart || res2)
          }
        } catch {}
      } finally {
        setLoading(false)
      }
    })()
  }, [cartId])

  const ensureCart = async () => {
    if (cartId) return
    const created = await storeApi.createCart({})
    const newId = (created as any).cart?.id || (created as any).id
    if (newId) {
      setCartId(newId)
      if (typeof window !== "undefined") window.localStorage.setItem("cart_id", newId)
    }
  }

  const refresh = async () => {
    if (!cartId) return
    const res = await storeApi.retrieveCart(cartId)
    setCart((res as any).cart || res)
  }

  const addItem = async ({ variant_id, quantity }: { variant_id: string; quantity: number }) => {
    await ensureCart()
    if (!cartId) return
    await storeApi.addLineItem(cartId, { variant_id, quantity })
    await refresh()
  }

  const updateItem = async (lineId: string, quantity: number) => {
    if (!cartId) return
    await storeApi.updateLineItem(cartId, lineId, { quantity })
    await refresh()
  }

  const removeItem = async (lineId: string) => {
    if (!cartId) return
    await storeApi.removeLineItem(cartId, lineId)
    await refresh()
  }

  const value = useMemo(
    () => ({ cartId, cart, loading, ensureCart, addItem, updateItem, removeItem, refresh }),
    [cartId, cart, loading]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}


