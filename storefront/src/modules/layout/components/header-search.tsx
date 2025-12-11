'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function HeaderSearch() {
  const router = useRouter()
  const { countryCode } = useParams<{ countryCode: string }>()
  const [query, setQuery] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    router.push(`/${countryCode}/results/${encodeURIComponent(trimmed)}`)
  }

  return (
    <form onSubmit={onSubmit} className="hidden small:flex items-center w-full max-w-xs">
      <div className="relative w-full">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full h-8 rounded-full border border-ui-border-base px-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          aria-label="Search products"
        />
        <button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded-full bg-black text-white"
        >
          Go
        </button>
      </div>
    </form>
  )
}
