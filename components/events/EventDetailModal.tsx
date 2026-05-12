'use client'

import Modal from '@/components/ui/Modal'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import { CalendarClock, MapPin, Users, CheckCircle2, MinusCircle } from 'lucide-react'
import type { CommunityEvent } from '@/lib/data/mock-events'
import { formatDate, formatTime } from '@/lib/utils'

interface Props {
  event: CommunityEvent | null
  onClose: () => void
  rsvpStatus: 'going' | 'maybe' | 'not_going' | null
  onRsvp: (status: 'going' | 'maybe' | 'not_going') => void
}

const tones: Record<CommunityEvent['cover_tone'], string> = {
  terracotta: 'bg-terracotta text-warm-white',
  charcoal: 'bg-charcoal text-warm-white',
  sand: 'bg-sand text-charcoal',
  sage: 'bg-success-bg text-success-text',
}

export default function EventDetailModal({ event, onClose, rsvpStatus, onRsvp }: Props) {
  if (!event) return null

  return (
    <Modal open={!!event} onClose={onClose} size="lg" title={event.title}>
      <div className={`${tones[event.cover_tone]} -m-6 md:-m-8 mb-6 md:mb-8 px-6 md:px-8 py-8`}>
        <p className="text-[10px] tracking-widest uppercase opacity-80">
          {event.category}
        </p>
        <p className="font-display text-3xl md:text-4xl mt-1 leading-tight">
          {formatDate(event.start_time, { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
        <p className="text-sm opacity-80 mt-2">
          {formatTime(event.start_time)} to {formatTime(event.end_time)}
        </p>
      </div>

      <div className="space-y-5">
        <p className="text-sm text-stone leading-relaxed">{event.description}</p>

        <div className="grid sm:grid-cols-2 gap-3 text-sm text-charcoal">
          <p className="flex items-center gap-2">
            <MapPin size={14} strokeWidth={1.5} className="text-terracotta" />
            {event.location}
          </p>
          <p className="flex items-center gap-2">
            <Users size={14} strokeWidth={1.5} className="text-terracotta" />
            {event.rsvp_count} going{event.max_attendees ? ` of ${event.max_attendees}` : ''}
          </p>
          <p className="flex items-center gap-2 sm:col-span-2">
            <CalendarClock size={14} strokeWidth={1.5} className="text-terracotta" />
            Organised by {event.organiser}
          </p>
        </div>

        {event.facility_booking_id && (
          <div className="bg-sand/60 border border-warm-gray/20 px-4 py-3 text-sm text-stone">
            Space reserved through Facilities. Check in at the door with your QR code.
          </div>
        )}

        <div>
          <p className="text-[11px] tracking-widest uppercase text-stone mb-3">Attending</p>
          <div className="flex flex-wrap items-center gap-2">
            {event.attendees.map((a, i) => (
              <div key={i} className="flex items-center gap-2 pr-3 pl-1 py-1 bg-sand/60 border border-warm-gray/20">
                <Avatar name={a.name} size="sm" tone={a.avatar_tone} />
                <span className="text-xs text-charcoal">{a.name}</span>
              </div>
            ))}
            {event.rsvp_count > event.attendees.length && (
              <span className="text-xs text-stone">
                +{event.rsvp_count - event.attendees.length} more
              </span>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-warm-gray/15 flex flex-wrap gap-2">
          <Button
            variant={rsvpStatus === 'going' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onRsvp('going')}
          >
            <CheckCircle2 size={14} strokeWidth={1.5} />
            Going
          </Button>
          <Button
            variant={rsvpStatus === 'maybe' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onRsvp('maybe')}
          >
            Maybe
          </Button>
          <Button
            variant={rsvpStatus === 'not_going' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onRsvp('not_going')}
          >
            <MinusCircle size={14} strokeWidth={1.5} />
            Not going
          </Button>
        </div>
      </div>
    </Modal>
  )
}
