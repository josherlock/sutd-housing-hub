'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { CommunityEvent } from '@/lib/data/mock-events'
import { formatDate, formatTime } from '@/lib/utils'
import { ArrowRight, MapPin, Users, Calendar } from 'lucide-react'

interface EventsHeroProps {
  events: CommunityEvent[]
}

const categoryLabels: Record<CommunityEvent['category'], string> = {
  sports: 'Sports',
  social: 'Social',
  academic: 'Academic',
  cultural: 'Cultural',
  official: 'Official',
}

export default function EventsHero({ events }: EventsHeroProps) {
  if (events.length === 0) return null
  const [featured, ...rest] = events
  if (!featured) return null

  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-terracotta">
            Events
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-charcoal mt-2 leading-tight">
            What is on this week
          </h2>
        </div>
        <Link
          href="/events"
          className="text-[11px] tracking-widest uppercase text-stone hover:text-terracotta transition-colors inline-flex items-center gap-1.5"
        >
          See all events
          <ArrowRight size={12} strokeWidth={1.5} />
        </Link>
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-5">
        <FeaturedEvent event={featured} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {rest.slice(0, 3).map((ev) => (
            <SmallEvent key={ev.id} event={ev} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedEvent({ event }: { event: CommunityEvent }) {
  const d = new Date(event.start_time)
  return (
    <Link
      href="/events"
      className="relative group min-h-[400px] lg:min-h-[460px] overflow-hidden block"
    >
      <Image
        src={event.cover_image_url}
        alt={event.title}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/10" />
      <div className="relative h-full flex flex-col justify-between p-6 md:p-8 text-warm-white">
        <div className="flex items-start justify-between gap-3">
          <div className="bg-warm-white/95 backdrop-blur-sm text-charcoal px-4 py-3 text-center">
            <p className="text-[10px] tracking-widest uppercase text-stone">
              {d.toLocaleString('en-SG', { month: 'short' })}
            </p>
            <p className="font-display text-3xl leading-none mt-1">{d.getDate()}</p>
            <p className="text-[10px] tracking-widest uppercase text-stone mt-1">
              {d.toLocaleString('en-SG', { weekday: 'short' })}
            </p>
          </div>
          <span className="text-[10px] tracking-widest uppercase bg-charcoal/60 backdrop-blur-sm text-warm-white px-3 py-1.5">
            Featured
          </span>
        </div>

        <div>
          <p className="text-[10px] tracking-widest uppercase text-terracotta-light">
            {categoryLabels[event.category]}
          </p>
          <h3 className="font-display text-3xl md:text-5xl mt-2 leading-tight">{event.title}</h3>
          <p className="mt-3 text-sm md:text-base text-warm-white/80 max-w-xl leading-relaxed line-clamp-2">
            {event.description}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-warm-white/85">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} strokeWidth={1.5} />
              {formatTime(event.start_time)}, {formatDate(event.start_time, { day: 'numeric', month: 'short' })}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={12} strokeWidth={1.5} />
              {event.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={12} strokeWidth={1.5} />
              {event.rsvp_count} going
            </span>
          </div>
          <span className="mt-5 inline-flex items-center gap-2 bg-terracotta px-5 py-2.5 text-xs font-medium tracking-wide uppercase group-hover:bg-terracotta-dark transition-colors">
            RSVP and details
            <ArrowRight size={14} strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </Link>
  )
}

function SmallEvent({ event }: { event: CommunityEvent }) {
  const d = new Date(event.start_time)
  return (
    <Link
      href="/events"
      className="group flex bg-warm-white border border-warm-gray/30 hover:border-warm-gray/60 transition-all duration-300 overflow-hidden h-32"
    >
      <div className="relative w-32 shrink-0 overflow-hidden">
        <Image
          src={event.cover_image_url}
          alt={event.title}
          fill
          sizes="160px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
        <div>
          <p className="text-[10px] tracking-widest uppercase text-terracotta">
            {categoryLabels[event.category]}
          </p>
          <h4 className="font-display text-base text-charcoal leading-tight mt-1 line-clamp-2 group-hover:text-terracotta-dark transition-colors">
            {event.title}
          </h4>
        </div>
        <p className="text-[11px] text-stone flex items-center gap-1.5 flex-wrap">
          <span className="font-medium text-charcoal">
            {d.toLocaleString('en-SG', { day: 'numeric', month: 'short' })}
          </span>
          <span>·</span>
          <span>{formatTime(event.start_time)}</span>
          <span>·</span>
          <span>{event.rsvp_count} going</span>
        </p>
      </div>
    </Link>
  )
}
