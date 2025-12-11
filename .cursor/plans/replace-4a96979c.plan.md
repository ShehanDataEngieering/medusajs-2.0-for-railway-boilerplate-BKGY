<!-- 4a96979c-0f26-4280-af24-968c612c368f 0fbae5dc-4b89-4314-8ccc-c78cbeecd48a -->
# Replace Frontend with Shofy UI (Medusa v2)

## Scope

- Replace current frontend UI with `shofy-Jewelry-ecommerce-client` while keeping Medusa 2.x backend and data model unchanged.
- Use REST calls to the Medusa Storefront API (`http://localhost:9000`) via a small TypeScript client. No backend changes.
- Map Shofy pages (Home/PLP/PDP/Cart/Checkout/Auth) to Medusa resources.

## High-level Steps

1. Copy Shofy UI into the repo

   - Copy from `/home/shehanp12/jewllery/shofy-Jewelry-ecommerce-client/` into your workspace frontend app (e.g., `apps/storefront/` or `storefront/`).
   - Keep or add `package.json`, `tsconfig.json`, `next.config.js` (if Next.js), and assets.
   - Ensure scripts: `dev`, `build`, `start`.

2. Environment

   - Add `.env.local` to the frontend app:
     - `NEXT_PUBLIC_MEDUSA_URL=http://localhost:9000`
     - Optionally: `NEXT_PUBLIC_MEDUSA_SALES_CHANNEL=<uuid>` if you have a non-default sales channel.
   - If CORS blocks requests, add the frontend URL to Medusa STORE_CORS (informational note; we won’t change backend unless needed).

3. Minimal Medusa client (TypeScript)

   - Create `lib/medusaClient.ts`:
```ts
const BASE_URL = process.env.NEXT_PUBLIC_MEDUSA_URL || "http://localhost:9000";

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...init,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return (await res.json()) as T;
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
};
```


4. Cart state and persistence

   - Create `context/CartContext.tsx` to manage `cartId`, `cart` data, and actions using `storeApi`.
   - Persist `cartId` in `localStorage`; on app load, restore and `retrieveCart`; if missing/404, call `createCart`.
   - Provide hooks `useCart()` used by Cart icon, Cart page, Checkout, and Add-to-cart buttons.

5. Wire Shofy pages to Medusa

   - Home: fetch collections and a few products; map Shofy components to Medusa product shape.
   - PLP: read filters from URL; call `/store/products` with `q`, `collection_id`, `category_id`, `price_list_id`, `limit`, `offset`, `order`.
   - PDP: fetch product by handle/id; render options/variants; on Add to Cart, post `{ variant_id, quantity }` (or `{ variant_id, quantity, metadata }`).
   - Cart: show `cart.items`, quantities, totals from `cart.total`, `cart.subtotal`, `cart.shipping_total`, `cart.tax_total` (field names may vary slightly in v2; we’ll bind to the response).
   - Checkout: flow to set shipping address, get shipping options, add shipping method, create payment sessions, then complete cart (Stripe/etc. configured on backend).

6. Auth pages (optional, if Shofy has account UI)

   - Register/Login forms call `storeApi.register/login`.
   - Keep cookie session via `credentials: "include"`.
   - Show `me()` data on account page; logout clears session.

7. TypeScript shape adapters

   - Add minimal types for Product, Variant, Cart used by components to avoid `any`.
   - Create adapter functions to map Medusa responses to Shofy component props where shapes differ.

8. Build and run

   - Install deps: Next.js/React/TS if not present, plus any Shofy-specific libraries.
   - `npm run dev` (or `pnpm dev`) in the frontend; test: Home → PLP → PDP → Add to cart → Cart → Checkout.

## Key Files to Add/Change (in the frontend app)

- `lib/medusaClient.ts`
- `context/CartContext.tsx`, `hooks/useCart.ts`
- `pages/index.tsx`, `pages/products/[handle].tsx`, `pages/cart.tsx`, `pages/checkout.tsx` (or corresponding routes in the Shofy app)
- `components/AddToCartButton.tsx`, `components/ProductCard.tsx`, `components/ProductGallery.tsx` (wire to Medusa data)
- `.env.local`, `package.json`, `tsconfig.json`

## Notes

- Backend remains untouched; only UI and API consumption change.
- If CORS is an issue, we’ll add the frontend origin to Medusa’s `STORE_CORS` (inform) without changing other logic.
- Prefer TS; if specific Shofy components resist TS quickly, we will isolate them with `// @ts-expect-error` or local `d.ts` to keep momentum.

### To-dos

- [ ] Copy Shofy client into frontend app and set scripts/configs
- [ ] Add .env.local with NEXT_PUBLIC_MEDUSA_URL and optional sales channel
- [ ] Create lib/medusaClient.ts for Storefront REST endpoints
- [ ] Implement CartContext with cartId persistence and actions
- [ ] Wire Home/PLP/PDP to Medusa list/retrieve products
- [ ] Wire Cart UI to cart totals and line item mutations
- [ ] Implement checkout steps: address, shipping, payment, complete
- [ ] Implement auth pages (register/login/me/logout) using store auth
- [ ] Add minimal TS types/adapters to fit Shofy components
- [ ] Install deps and run dev; fix any build/runtime errors