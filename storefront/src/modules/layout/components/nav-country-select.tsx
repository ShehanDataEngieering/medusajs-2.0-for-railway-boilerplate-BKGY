'use client'

import CountrySelect from './country-select'
import { useToggleState } from '@medusajs/ui'
import { HttpTypes } from '@medusajs/types'

export default function NavCountrySelect({ regions }: { regions: HttpTypes.StoreRegion[] | null }) {
  const toggleState = useToggleState()
  if (!regions?.length) return null
  return (
    <div
      onMouseEnter={toggleState.open}
      onMouseLeave={toggleState.close}
      onClick={toggleState.toggle}
      className="cursor-pointer"
      role="button"
      aria-label="Change shipping country"
    >
      <CountrySelect toggleState={toggleState} regions={regions} />
    </div>
  )
}
