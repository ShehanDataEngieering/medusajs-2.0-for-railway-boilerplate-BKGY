"use client"
import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react"
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

// Helper to get cart ID from cookies
const getCartIdFromCookie = (): string | null => {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(/(?:^|;\s*)_medusa_cart_id=([^;]*)/)
  return match ? decodeURIComponent(match[1]) : null
}

// Helper to set cart ID in cookie (client-side)
const setCartIdInCookie = (cartId: string) => {
  if (typeof document === "undefined") return
  const maxAge = 60 * 60 * 24 * 7 // 7 days
  document.cookie = `_medusa_cart_id=${cartId}; path=/; max-age=${maxAge}; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartId, setCartId] = useState<string | null>(null)
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [initialized, setInitialized] = useState(false)

  // Initial cart ID detection
  useEffect(() => {
    const initCart = async () => {
      console.log('🚀 Initializing cart...')
      
      // Try to get cart ID from cookie first (set by server actions), then localStorage
      const cookieCartId = getCartIdFromCookie()
      const localStorageCartId = typeof window !== "undefined" ? window.localStorage.getItem("cart_id") : null
      
      console.log('🔍 Looking for cart ID:', { 
        fromCookie: cookieCartId, 
        fromLocalStorage: localStorageCartId 
      })
      
      const stored = cookieCartId || localStorageCartId
      if (stored) {
        setCartId(stored)
        console.log('✅ Cart ID found:', stored)
        // Sync both storage mechanisms
        if (typeof window !== "undefined") {
          window.localStorage.setItem("cart_id", stored)
        }
        setCartIdInCookie(stored)
      } else {
        console.log('⚠️ No cart ID found, will create on first add')
      }
      
      setInitialized(true)
    }
    
    initCart()
  }, [])

  // Load cart data when cartId changes
  useEffect(() => {
    if (!cartId || !initialized) return
    
    const loadCart = async () => {
      try {
        setLoading(true)
        console.log('🔄 Fetching cart with ID:', cartId)
        const res = await storeApi.retrieveCart(cartId)
        console.log('📦 Raw cart response:', res)
        const cartData = (res as any).cart || res
        console.log('📦 Processed cart data:', cartData)
        setCart(cartData)
        console.log('🛒 Cart loaded:', {
          cartId,
          itemCount: cartData?.items?.length || 0,
          items: cartData?.items?.map((i: any) => ({ id: i.id, title: i.title, quantity: i.quantity }))
        })
      } catch (e) {
        console.error('❌ Error loading cart:', e)
        // Cart might be invalid, clear it
        setCartId(null)
        setCart(null)
        if (typeof window !== "undefined") {
          window.localStorage.removeItem("cart_id")
        }
      } finally {
        setLoading(false)
      }
    }

    loadCart()
  }, [cartId, initialized])

  // Poll for cookie changes (for server-side cart updates)
  useEffect(() => {
    if (!initialized) return
    
    const checkForUpdates = () => {
      const cookieCartId = getCartIdFromCookie()
      
      // If cookie cart ID changed, update our state
      if (cookieCartId && cookieCartId !== cartId) {
        console.log('🔄 Detected cookie cart ID change:', { old: cartId, new: cookieCartId })
        setCartId(cookieCartId)
        if (typeof window !== "undefined") {
          window.localStorage.setItem("cart_id", cookieCartId)
        }
      }
      
      // If we have a cart ID, refresh the cart data
      if (cartId) {
        storeApi.retrieveCart(cartId).then(res => {
          const cartData = (res as any).cart || res
          setCart(cartData)
        }).catch(() => {
          // Ignore errors during polling
        })
      }
    }

    // Check immediately
    checkForUpdates()
    
    // Then poll every 2 seconds
    const interval = setInterval(checkForUpdates, 2000)

    return () => clearInterval(interval)
  }, [cartId, initialized])

  const ensureCart = useCallback(async () => {
    if (cartId) return
    const created = await storeApi.createCart({})
    const newId = (created as any).cart?.id || (created as any).id
    if (newId) {
      setCartId(newId)
      if (typeof window !== "undefined") window.localStorage.setItem("cart_id", newId)
    }
  }, [cartId])

  const refresh = useCallback(async () => {
    if (!cartId) return
    const res = await storeApi.retrieveCart(cartId)
    setCart((res as any).cart || res)
  }, [cartId])

  const addItem = useCallback(async ({ variant_id, quantity }: { variant_id: string; quantity: number }) => {
    await ensureCart()
    if (!cartId) return
    await storeApi.addLineItem(cartId, { variant_id, quantity })
    await refresh()
  }, [cartId, ensureCart, refresh])

  const updateItem = useCallback(async (lineId: string, quantity: number) => {
    if (!cartId) return
    await storeApi.updateLineItem(cartId, lineId, { quantity })
    await refresh()
  }, [cartId, refresh])

  const removeItem = useCallback(async (lineId: string) => {
    if (!cartId) return
    await storeApi.removeLineItem(cartId, lineId)
    await refresh()
  }, [cartId, refresh])

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


