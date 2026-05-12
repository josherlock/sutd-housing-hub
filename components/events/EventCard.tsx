import { MapPin, Users } from 'lucide-react'
import type { CommunityEvent } from '@/lib/data/mock-events'
import { formatTime } from '@/lib/utils'

const tones: Record<CommunityEvent['cover_tone'], string> = {
  terracotta: 'bg-terracotta text-warm-white',
  charcoal: 'bg-charcoal text-warm-white',
  sand: 'bg-sand text-charcoal',
  sage: 'bg-success-bg text-success-text',
}

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
      <div className={`relative h-32 p-5 flex items-end ${tones[event.cover_tone]}`}>
        <Pattern tone={event.cover_tone} />
        <div className="relative flex items-center gap-3">
          <div className="bg-warm-white/15 backdrop-blur-sm px-3 py-2 text-center">
            <p className="text-[10px] tracking-widest uppercase opacity-80">
              {d.toLocaleString('en-SG', { month: 'short' })}
            </p>
            <p className="font-display text-2xl leading-none mt-1">{d.getDate()}</p>
          </div>
          <span className="text-[10px] tracking-widest uppercase opacity-80">
            {categoryLabels[event.category]}
          </span>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-display text-xl text-charcoal leading-tight group-hover:text-terracotta-dark transition-colors">
          {event.title}
        </h3>
        <div className="mt-3 space-y-1.5 text-xs text-stone">
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

function Pattern({ tone }: { tone: CommunityEvent['cover_tone'] }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-20"
      viewBox="0 0 200 100"
      preserveAspectRatio="none"
    >
      {tone === 'terracotta' && (
        <>
          <circle cx="180" cy="20" r="60" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <circle cx="180" cy="20" r="40" fill="none" stroke="currentColor" strokeWidth="0.4" />
        </>
      )}
      {tone === 'charcoal' && (
        <path d="M0,60 L40,30 L80,70 L120,20 L160,60 L200,30" fill="none" stroke="currentColor" strokeWidth="0.4" />
      )}
      {tone === 'sand' && (
        <>
          <line x1="0" y1="20" x2="200" y2="20" stroke="currentColor" strokeWidth="0.4" />
          <line x1="0" y1="50" x2="200" y2="50" stroke="currentColor" strokeWidth="0.4" />
          <line x1="0" y1="80" x2="200" y2="80" stroke="currentColor" strokeWidth="0.4" />
        </>
      )}
      {tone === 'sage' && (
        <path d="M-10,80 Q40,30 100,70 T210,40" fill="none" stroke="currentColor" strokeWidth="0.4" />
      )}
    </svg>
  )
}
