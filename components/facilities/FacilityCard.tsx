import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, Users } from 'lucide-react'
import type { Facility } from '@/lib/data/mock-facilities'
import { bookingsForFacility } from '@/lib/data/mock-facilities'

const categoryLabels: Record<Facility['category'], string> = {
  sports: 'Sports',
  study: 'Study',
  event: 'Event',
  multipurpose: 'Multipurpose',
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
      <div className="relative h-44 overflow-hidden">
        <Image
          src={facility.image_url}
          alt={facility.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-charcoal/10" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-warm-white">
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
