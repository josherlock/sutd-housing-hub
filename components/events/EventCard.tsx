import Image from 'next/image'
import { MapPin, Users } from 'lucide-react'
import type { CommunityEvent } from '@/lib/data/mock-events'
import { formatTime } from '@/lib/utils'

const categoryLabels: Record<CommunityEvent['category'], string> = {
  sports: 'Sports',
  social: 'Social',
  academic: 'Academic',
  cultural: 'Cultural',
  official: 'Official',
}

interface EventCardProps {
  event: CommunityEvent
  onClick?: () => void
  rsvpStatus?: 'going' | 'maybe' | 'not_going' | null
}

export default function EventCard({ event, onClick, rsvpStatus }: EventCardProps) {
  const d = new Date(event.start_time)
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left group flex flex-col bg-warm-white border border-warm-gray/30 hover:border-warm-gray/60 transition-all duration-300 w-full"
    >
      <div className="relative h-44 overflow-hidden">
        <Image
          src={event.cover_image_url}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-charcoal/0" />
        <div className="absolute top-4 left-4 bg-warm-white/95 backdrop-blur-sm px-3 py-2 text-center">
          <p className="text-[10px] tracking-widest uppercase text-stone">
            {d.toLocaleString('en-SG', { month: 'short' })}
          </p>
          <p className="font-display text-2xl leading-none text-charcoal mt-1">{d.getDate()}</p>
        </div>
        <span className="absolute top-4 right-4 text-[10px] tracking-widest uppercase text-warm-white bg-charcoal/60 backdrop-blur-sm px-2.5 py-1">
          {categoryLabels[event.category]}
        </span>
        <h3 className="absolute inset-x-0 bottom-0 p-5 font-display text-xl md:text-2xl text-warm-white leading-tight">
          {event.title}
        </h3>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="space-y-1.5 text-xs text-stone">
          <p className="flex items-center gap-1.5">
            <span className="font-medium text-charcoal">{formatTime(event.start_time)}</span>
            <span>·</span>
            <MapPin size={12} strokeWidth={1.5} />
            {event.location}
          </p>
          <p className="flex items-center gap-1.5">
            <Users size={12} strokeWidth={1.5} />
            {event.rsvp_count} going{event.max_attendees ? ` of ${event.max_attendees}` : ''}
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-warm-gray/15 flex items-center justify-between">
          <span className="text-[10px] tracking-widest uppercase text-stone">
            by {event.organiser}
          </span>
          {rsvpStatus === 'going' ? (
            <span className="text-[11px] tracking-widest uppercase text-success-text">Going</span>
          ) : (
            <span className="text-[11px] tracking-widest uppercase text-terracotta">RSVP</span>
          )}
        </div>
      </div>
    </button>
  )
}
