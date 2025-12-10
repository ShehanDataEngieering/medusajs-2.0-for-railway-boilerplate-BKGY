"use client"

import { useMemo, useEffect, useState } from "react"
import { useParams, usePathname } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import CountrySelect from "./country-select"
import { useToggleState } from "@medusajs/ui"
import { updateRegion } from "@lib/data/cart"

export default function NavRegionCurrency({
  regions,
}: {
  regions: HttpTypes.StoreRegion[] | null
}) {
  const toggleState = useToggleState()
  const { countryCode } = useParams<{ countryCode: string }>()
  const pathname = usePathname()

  const currentPath = useMemo(() => {
    if (!countryCode) return "/"
    return pathname.split(`/${countryCode}`)[1] || "/"
  }, [pathname, countryCode])

  const countries = useMemo(() => {
    const list: { iso2: string; label: string }[] = []
    regions?.forEach((r) => {
      r.countries?.forEach((c) => {
        if (c.iso_2)
          list.push({
            iso2: c.iso_2,
            label: c.display_name || c.iso_2.toUpperCase(),
          })
      })
    })
    // Deduplicate by iso2
    const map = new Map<string, { iso2: string; label: string }>()
    list.forEach((c) => map.set(c.iso2, c))
    return Array.from(map.values()).sort((a, b) =>
      a.label.localeCompare(b.label)
    )
  }, [regions])

  const currencyByCountry = useMemo(() => {
    const map = new Map<string, string>()
    regions?.forEach((r) => {
      r.countries?.forEach((c) => {
        if (c.iso_2) map.set(c.iso_2, r.currency_code?.toUpperCase?.() || "")
      })
    })
    return map
  }, [regions])

  const currencies = useMemo(() => {
    const set = new Set<string>()
    regions?.forEach((r) => {
      if (r.currency_code) set.add(r.currency_code.toUpperCase())
    })
    return Array.from(set)
  }, [regions])

  const [selectedCurrency, setSelectedCurrency] = useState<string>("")

  useEffect(() => {
    const cur = countryCode ? currencyByCountry.get(countryCode) : ""
    if (cur && cur !== selectedCurrency) setSelectedCurrency(cur)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode, currencyByCountry])

  const onChangeCurrency = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCur = e.target.value
    setSelectedCurrency(newCur)
    // Find a region with this currency and pick a country from it
    const region = regions?.find(
      (r) => r.currency_code?.toUpperCase() === newCur
    )
    const fallbackCountry = region?.countries?.[0]?.iso_2
    if (fallbackCountry) {
      await updateRegion(fallbackCountry, currentPath)
    }
  }

  if (!regions?.length) return null

  return (
    <div className="flex items-center gap-3">
      {/* Shipping to: country selector using existing component */}
      <div
        onMouseEnter={toggleState.open}
        onMouseLeave={toggleState.close}
        onClick={toggleState.toggle}
        className="cursor-pointer relative"
        role="button"
        aria-label="Change shipping country"
      >
        <div className="overflow-visible">
          <CountrySelect toggleState={toggleState} regions={regions} />
        </div>
      </div>

      {/* Currency dropdown */}
      <label className="hidden small:inline-flex items-center gap-2 text-sm">
        <span className="text-ui-fg-subtle">Currency</span>
        <select
          value={selectedCurrency}
          onChange={onChangeCurrency}
          className="h-8 px-2 rounded-md border border-ui-border-base bg-white"
          aria-label="Select currency"
        >
          {currencies.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
