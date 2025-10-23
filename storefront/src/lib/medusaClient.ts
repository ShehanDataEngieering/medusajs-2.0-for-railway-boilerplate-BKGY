const BASE_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...init,
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return (await res.json()) as T
}

export const storeApi = {
  listProducts: (qs = "") => api(`/store/products${qs ? `?${qs}` : ""}`),
  retrieveProduct: (idOrHandle: string) => api(`/store/products/${idOrHandle}`),
  listCollections: () => api(`/store/collections`),
  createCart: (body?: unknown) => api(`/store/carts`, { method: "POST", body: JSON.stringify(body || {}) }),
  retrieveCart: (id: string) => api(`/store/carts/${id}`),
  addLineItem: (cartId: string, body: unknown) => api(`/store/carts/${cartId}/line-items`, { method: "POST", body: JSON.stringify(body) }),
  updateLineItem: (cartId: string, lineId: string, body: unknown) => api(`/store/carts/${cartId}/line-items/${lineId}`, { method: "POST", body: JSON.stringify(body) }),
  removeLineItem: (cartId: string, lineId: string) => api(`/store/carts/${cartId}/line-items/${lineId}`, { method: "DELETE" }),
  setShippingAddress: (cartId: string, body: unknown) => api(`/store/carts/${cartId}`, { method: "POST", body: JSON.stringify(body) }),
  listShippingOptions: (cartId: string) => api(`/store/shipping-options?cart_id=${cartId}`),
  addShippingMethod: (cartId: string, body: unknown) => api(`/store/carts/${cartId}/shipping-methods`, { method: "POST", body: JSON.stringify(body) }),
  createPaymentSessions: (cartId: string) => api(`/store/carts/${cartId}/payment-sessions`, { method: "POST" }),
  completeCart: (cartId: string) => api(`/store/carts/${cartId}/complete`, { method: "POST" }),
  // Auth
  register: (body: unknown) => api(`/store/customers`, { method: "POST", body: JSON.stringify(body) }),
  login: (body: unknown) => api(`/store/auth`, { method: "POST", body: JSON.stringify(body) }),
  logout: () => api(`/store/auth`, { method: "DELETE" }),
  me: () => api(`/store/auth`, { method: "GET" }),
}


