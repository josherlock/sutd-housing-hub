'use client'

import { useState } from 'react'
import Link from 'next/link'
import BookingCalendar from './BookingCalendar'
import BookingPanel from './BookingPanel'
import SectionLabel from '@/components/ui/SectionLabel'
import StatusPill from '@/components/ui/StatusPill'
import { ArrowLeft, MapPin, Users } from 'lucide-react'
import { type Facility, type Booking } from '@/lib/data/mock-facilities'
import { formatDate, formatTime } from '@/lib/utils'

interface Props {
  facility: Facility
  bookings: Booking[]
  myBookings: Booking[]
}

const categoryLabels: Record<Facility['category'], string> = {
  sports: 'Sports',
  study: 'Study',
  event: 'Event',
  multipurpose: 'Multipurpose',
}

export default function FacilityDetailClient({ facility, bookings, myBookings }: Props) {
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null)

  return (
    <div className="container-wide py-8 md:py-12 space-y-10">
      <Link
        href="/facilities"
        className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-stone hover:text-terracotta transition-colors"
      >
        <ArrowLeft size={14} strokeWidth={1.5} />
        All facilities
      </Link>

      <header className="grid lg:grid-cols-[2fr_1fr] gap-10 items-end">
        <div>
          <SectionLabel>{categoryLabels[facility.category]}</SectionLabel>
          <h1 className="font-display text-4xl md:text-6xl text-charcoal mt-2 leading-tight">
            {facility.name}
          </h1>
          <p className="text-stone mt-4 max-w-xl leading-relaxed">{facility.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {facility.amenities.map((a) => (
              <span
                key={a}
                className="text-[11px] tracking-wide uppercase px-2.5 py-1 border border-warm-gray/30 text-stone"
              >
                {a}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-sand p-6 space-y-3">
          <p className="flex items-center gap-2 text-sm text-charcoal">
            <MapPin size={14} strokeWidth={1.5} className="text-terracotta" />
            {facility.location}
          </p>
          <p className="flex items-center gap-2 text-sm text-charcoal">
            <Users size={14} strokeWidth={1.5} className="text-terracotta" />
            Capacity, {facility.capacity}
          </p>
          <p className="text-[11px] tracking-wide text-stone">
            Open {facility.available_from} to {facility.available_to}, daily
          </p>
        </div>
      </header>

      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <SectionLabel>This week</SectionLabel>
            <h2 className="font-display text-2xl md:text-3xl text-charcoal mt-2 leading-tight">
              Pick a slot
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[11px] tracking-wide text-stone">
            <LegendSwatch className="bg-cream border border-warm-gray/30" label="Available" />
            <LegendSwatch className="bg-terracotta" label="Selected" />
            <LegendSwatch className="bg-sand" label="Booked" />
          </div>
        </div>
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-5 items-start">
          <BookingCalendar facility={facility} bookings={bookings} onSelect={setSelectedSlot} />
          <BookingPanel facility={facility} selectedSlot={selectedSlot} />
        </div>
      </section>

      {myBookings.length > 0 && (
        <section className="space-y-4">
          <SectionLabel>My bookings here</SectionLabel>
          <div className="bg-warm-white border border-warm-gray/30 divide-y divide-warm-gray/15">
            {myBookings.map((b) => (
              <div key={b.id} className="flex flex-wrap items-center gap-3 px-5 py-4">
                <div className="font-display text-xl text-charcoal w-20 shrink-0">
                  {new Date(b.start_time).getDate()}{' '}
                  <span className="text-xs tracking-widest uppercase text-stone">
                    {new Date(b.start_time).toLocaleString('en-SG', { month: 'short' })}
                  </span>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <p className="text-sm text-charcoal">{b.purpose ?? 'Booking'}</p>
                  <p className="text-xs text-stone">
                    {formatTime(b.start_time)} to {formatTime(b.end_time)} · {b.attendee_count}{' '}
                    attendee{b.attendee_count === 1 ? '' : 's'}
                  </p>
                </div>
                <StatusPill status={b.status} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function LegendSwatch({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`w-3 h-3 ${className}`} />
      <span>{label}</span>
    </span>
  )
}
