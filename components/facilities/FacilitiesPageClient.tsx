'use client'

import { useMemo, useState } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import FacilityCard from './FacilityCard'
import { mockFacilities } from '@/lib/data/mock-facilities'

const filters = [
  { value: 'all', label: 'All' },
  { value: 'sports', label: 'Sports' },
  { value: 'study', label: 'Study' },
  { value: 'multipurpose', label: 'Multipurpose' },
] as const

export default function FacilitiesPageClient() {
  const [filter, setFilter] = useState<(typeof filters)[number]['value']>('all')
  const visible = useMemo(
    () => (filter === 'all' ? mockFacilities : mockFacilities.filter((f) => f.category === filter)),
    [filter],
  )

  return (
    <div className="container-wide py-8 md:py-12 space-y-10">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <SectionLabel>Facilities</SectionLabel>
          <h1 className="font-display text-4xl md:text-5xl text-charcoal mt-2 leading-tight">
            Book a space, on your terms.
          </h1>
          <p className="text-stone mt-2 text-sm md:text-base max-w-xl">
            Sports halls, meeting rooms, the field, the MPH. Check availability and lock in a slot in
            under a minute.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`text-xs font-medium tracking-wide uppercase px-3 py-2 border transition-colors ${
                filter === f.value
                  ? 'border-charcoal bg-charcoal text-warm-white'
                  : 'border-warm-gray/30 text-stone hover:border-warm-gray/60'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map((f) => (
          <FacilityCard key={f.id} facility={f} />
        ))}
      </div>
    </div>
  )
}
