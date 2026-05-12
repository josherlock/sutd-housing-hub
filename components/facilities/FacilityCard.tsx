import Link from 'next/link'
import { ArrowRight, MapPin, Users } from 'lucide-react'
import type { Facility } from '@/lib/data/mock-facilities'
import { bookingsForFacility } from '@/lib/data/mock-facilities'

const categoryLabels: Record<Facility['category'], string> = {
  sports: 'Sports',
  study: 'Study',
  event: 'Event',
  multipurpose: 'Multipurpose',
}

const tones: Record<Facility['category'], string> = {
  sports: 'bg-charcoal text-warm-white',
  study: 'bg-sand text-charcoal',
  event: 'bg-terracotta text-warm-white',
  multipurpose: 'bg-terracotta-light/30 text-charcoal',
}

export default function FacilityCard({ facility }: { facility: Facility }) {
  const bookings = bookingsForFacility(facility.id)
  const now = new Date()
  const upcoming = bookings.find((b) => new Date(b.start_time) > now)
  const isFreeNow = !bookings.some(
    (b) => new Date(b.start_time) <= now && new Date(b.end_time) > now,
  )

  return (
    <Link
      href={`/facilities/${facility.slug}`}
      className="group flex flex-col bg-warm-white border border-warm-gray/30 hover:border-warm-gray/60 transition-all duration-300"
    >
      <div className={`h-32 relative flex items-end p-5 ${tones[facility.category]}`}>
        <FacilityPattern category={facility.category} />
        <div className="relative">
          <span className="text-[10px] tracking-widest uppercase opacity-80">
            {categoryLabels[facility.category]}
          </span>
          <h3 className="font-display text-2xl mt-1 leading-tight">{facility.name}</h3>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="space-y-2 text-xs text-stone">
          <p className="flex items-center gap-1.5">
            <MapPin size={12} strokeWidth={1.5} />
            {facility.location}
          </p>
          <p className="flex items-center gap-1.5">
            <Users size={12} strokeWidth={1.5} />
            Up to {facility.capacity}
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-warm-gray/15 flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-widest uppercase text-stone">
              {isFreeNow ? 'Available now' : 'Booked'}
            </p>
            {upcoming && (
              <p className="text-xs text-charcoal mt-0.5">
                Next at{' '}
                {new Date(upcoming.start_time).toLocaleString('en-SG', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                })}
              </p>
            )}
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase text-terracotta group-hover:text-terracotta-dark transition-colors">
            Book
            <ArrowRight size={14} strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </Link>
  )
}

function FacilityPattern({ category }: { category: Facility['category'] }) {
  if (category === 'sports') {
    return (
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 100" preserveAspectRatio="none">
        <circle cx="170" cy="20" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="50" x2="200" y2="50" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    )
  }
  if (category === 'multipurpose') {
    return (
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 200 100" preserveAspectRatio="none">
        <path d="M0,80 Q50,40 100,60 T200,40" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    )
  }
  return (
    <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 200 100" preserveAspectRatio="none">
      <line x1="0" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.5" />
      <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" />
      <line x1="100" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" />
      <line x1="150" y1="0" x2="150" y2="100" stroke="currentColor" strokeWidth="0.5" />
      <line x1="200" y1="0" x2="200" y2="100" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  )
}
