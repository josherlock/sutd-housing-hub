'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import EventCard from './EventCard'
import EventDetailModal from './EventDetailModal'
import Pinboard from './Pinboard'
import { mockEvents, type CommunityEvent } from '@/lib/data/mock-events'
import { formatDate, formatTime } from '@/lib/utils'
import { Plus, MapPin, ArrowRight } from 'lucide-react'

type Tab = 'upcoming' | 'mine' | 'pinboard'
type RsvpStatus = 'going' | 'maybe' | 'not_going'

const categoryFilters = [
  { value: 'all', label: 'All' },
  { value: 'sports', label: 'Sports' },
  { value: 'social', label: 'Social' },
  { value: 'academic', label: 'Academic' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'official', label: 'Official' },
] as const

export default function EventsPageClient() {
  const [tab, setTab] = useState<Tab>('upcoming')
  const [category, setCategory] = useState<(typeof categoryFilters)[number]['value']>('all')
  const [rsvps, setRsvps] = useState<Record<string, RsvpStatus | null>>({
    ev_005: 'going',
    ev_003: 'going',
    ev_002: 'going',
  })
  const [openEvent, setOpenEvent] = useState<CommunityEvent | null>(null)

  const events = useMemo(() => {
    let list = [...mockEvents].sort(
      (a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime(),
    )
    if (tab === 'mine') list = list.filter((e) => rsvps[e.id] === 'going')
    if (category !== 'all') list = list.filter((e) => e.category === category)
    return list
  }, [tab, category, rsvps])

  const featured = events[0]
  const rest = events.slice(1)

  function setRsvp(id: string, status: RsvpStatus) {
    setRsvps((s) => ({ ...s, [id]: s[id] === status ? null : status }))
  }

  return (
    <div className="container-wide py-8 md:py-12 space-y-10">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <SectionLabel>Events</SectionLabel>
          <h1 className="font-display text-4xl md:text-5xl text-charcoal mt-2 leading-tight">
            What is happening around campus.
          </h1>
          <p className="text-stone mt-2 text-sm md:text-base max-w-xl">
            Resident-run socials, sports, study groups and official housing events.
          </p>
        </div>
        <Button href="/events/new">
          <Plus size={16} strokeWidth={1.5} />
          Create event
        </Button>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex border border-warm-gray/30 bg-warm-white">
          {(['upcoming', 'mine', 'pinboard'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-xs font-medium tracking-wide uppercase transition-colors ${
                tab === t ? 'bg-charcoal text-warm-white' : 'text-stone hover:text-charcoal'
              }`}
            >
              {t === 'upcoming' ? 'Upcoming' : t === 'mine' ? 'My Events' : 'Pinboard'}
            </button>
          ))}
        </div>
        {tab !== 'pinboard' && (
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={`text-xs font-medium tracking-wide uppercase px-3 py-1.5 border transition-colors ${
                  category === c.value
                    ? 'border-charcoal bg-charcoal text-warm-white'
                    : 'border-warm-gray/30 text-stone hover:border-warm-gray/60'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {tab === 'pinboard' && <Pinboard />}

      {tab !== 'pinboard' && featured && (
        <FeaturedEvent
          event={featured}
          onOpen={() => setOpenEvent(featured)}
          rsvpStatus={rsvps[featured.id] ?? null}
          onRsvp={(s) => setRsvp(featured.id, s)}
        />
      )}

      {tab !== 'pinboard' && rest.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((e) => (
            <EventCard
              key={e.id}
              event={e}
              onClick={() => setOpenEvent(e)}
              rsvpStatus={rsvps[e.id] ?? null}
            />
          ))}
        </div>
      )}

      {tab !== 'pinboard' && events.length === 0 && (
        <div className="bg-sand/50 border border-warm-gray/20 p-12 text-center">
          <p className="text-sm text-stone">No events match your filter.</p>
          <Link
            href="/events/new"
            className="inline-flex items-center gap-2 mt-4 text-xs tracking-widest uppercase text-terracotta hover:text-terracotta-dark transition-colors"
          >
            Be the first to host one
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      )}

      <EventDetailModal
        event={openEvent}
        onClose={() => setOpenEvent(null)}
        rsvpStatus={openEvent ? rsvps[openEvent.id] ?? null : null}
        onRsvp={(s) => openEvent && setRsvp(openEvent.id, s)}
      />
    </div>
  )
}

function FeaturedEvent({
  event,
  onOpen,
  rsvpStatus,
  onRsvp,
}: {
  event: CommunityEvent
  onOpen: () => void
  rsvpStatus: RsvpStatus | null
  onRsvp: (s: RsvpStatus) => void
}) {
  return (
    <div className="bg-charcoal text-warm-white grid md:grid-cols-[1fr_1.2fr] overflow-hidden">
      <div className="relative p-8 md:p-12 flex flex-col justify-between min-h-[280px]">
        <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-terracotta/20 blur-3xl" />
        <div className="relative">
          <span className="text-[11px] tracking-widest uppercase text-terracotta-light">
            Featured event
          </span>
          <h2 className="font-display text-4xl md:text-5xl mt-3 leading-tight">{event.title}</h2>
          <p className="text-sm text-warm-white/70 mt-4 max-w-md leading-relaxed">
            {event.description}
          </p>
        </div>
        <div className="relative mt-8 flex flex-wrap gap-3">
          <Button
            variant={rsvpStatus === 'going' ? 'primary' : 'light'}
            onClick={() => onRsvp('going')}
          >
            {rsvpStatus === 'going' ? 'Going' : 'I am in'}
          </Button>
          <Button variant="ghost" onClick={onOpen} className="text-warm-white hover:text-terracotta-light">
            Details
            <ArrowRight size={14} strokeWidth={1.5} />
          </Button>
        </div>
      </div>
      <div className="bg-terracotta/15 p-8 md:p-12 border-l border-warm-white/10 grid grid-cols-2 gap-6 content-center">
        <div>
          <p className="text-[10px] tracking-widest uppercase text-warm-white/60">When</p>
          <p className="font-display text-2xl mt-2 leading-tight">
            {formatDate(event.start_time, { weekday: 'short', day: 'numeric', month: 'short' })}
          </p>
          <p className="text-sm text-warm-white/70 mt-1">
            {formatTime(event.start_time)} to {formatTime(event.end_time)}
          </p>
        </div>
        <div>
          <p className="text-[10px] tracking-widest uppercase text-warm-white/60">Where</p>
          <p className="font-display text-2xl mt-2 leading-tight">{event.location}</p>
          <p className="text-sm text-warm-white/70 mt-1 flex items-center gap-1.5">
            <MapPin size={12} strokeWidth={1.5} />
            On campus
          </p>
        </div>
        <div>
          <p className="text-[10px] tracking-widest uppercase text-warm-white/60">Going</p>
          <p className="font-display text-2xl mt-2 leading-tight">{event.rsvp_count}</p>
          {event.max_attendees && (
            <p className="text-sm text-warm-white/70 mt-1">of {event.max_attendees} max</p>
          )}
        </div>
        <div>
          <p className="text-[10px] tracking-widest uppercase text-warm-white/60">Host</p>
          <p className="font-display text-2xl mt-2 leading-tight">{event.organiser.split(' ')[0]}</p>
          <p className="text-sm text-warm-white/70 mt-1">{event.organiser}</p>
        </div>
      </div>
    </div>
  )
}
