'use client'

import { useParams, usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'
import { updateRegion } from '@lib/data/cart'

const options = [
  { label: 'EUR', country: 'de' },
  { label: 'SEK', country: 'se' },
]

export default function CurrencySelect() {
  const { countryCode } = useParams<{ countryCode: string }>()
  const pathname = usePathname()
  const currentPath = useMemo(() => {
    if (!countryCode) return '/'
    return pathname.split(`/${countryCode}`)[1] || '/'
  }, [pathname, countryCode])

  const initial = useMemo(() => {
    if (countryCode === 'se') return 'SEK'
    return 'EUR'
  }, [countryCode])

  const [value, setValue] = useState(initial)

  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    setValue(val)
    const selected = options.find((o) => o.label === val)
    if (selected) {
      await updateRegion(selected.country, currentPath)
    }
  }

  return (
    <label className="hidden small:inline-flex items-center gap-2 text-sm">
      <span className="text-ui-fg-subtle">Currency</span>
      <select
        value={value}
        onChange={onChange}
        className="h-8 px-2 rounded-md border border-ui-border-base bg-white"
        aria-label="Select currency"
      >
        {options.map((o) => (
          <option key={o.label} value={o.label}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}
