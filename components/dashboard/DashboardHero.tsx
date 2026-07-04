'use client'

import Link from 'next/link'
import { mockUser } from '@/lib/data/mock-user'
import { freeCount, totalCount } from '@/lib/data/mock-laundry'
import { termLabel, ambientLine } from '@/lib/campus'
import { greeting, formatDate, initials } from '@/lib/utils'
import { useNow } from '@/lib/hooks/use-now'
import { ArrowUpRight } from 'lucide-react'

interface DashboardHeroProps {
  openTickets: number
  nextBooking?: { facility: string; whenLabel: string }
  nextEvent?: { title: string; whenLabel: string }
}

// The identity anchor of the app: a large editorial greeting that knows the
// person, the point in the term, and what is worth their attention today.
export default function DashboardHero({ openTickets, nextBooking, nextEvent }: DashboardHeroProps) {
  const now = useNow()

  const line = now
    ? ambientLine({
        hour: now.getHours(),
        freeMachines: freeCount(),
        totalMachines: totalCount(),
        openTickets,
        nextBooking,
        nextEvent,
      })
    : 'Everything about your time here, in one place.'

  const residentSince = new Date(mockUser.joined_at).toLocaleDateString('en-SG', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <section className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
      <div className="max-w-2xl">
        <p className="text-[11px] tracking-widest uppercase text-stone/70">
          {now ? `${formatDate(now, { weekday: 'long', day: 'numeric', month: 'long' })} · ${termLabel(now)}` : 'SUTD Housing Hub'}
        </p>
        <h1 className="font-display text-5xl md:text-6xl text-charcoal mt-3 leading-[1.05]">
          {now ? greeting(now) : 'Welcome back'}, {mockUser.display_name}.
        </h1>
        <p className="font-display italic text-xl md:text-2xl text-stone mt-4 leading-snug">
          {line}
        </p>
      </div>

      <Link
        href="/profile"
        className="group shrink-0 flex items-center gap-4 bg-warm-white border border-warm-gray/30 hover:border-warm-gray/60 transition-colors p-5 lg:min-w-[300px]"
      >
        <div className="w-14 h-14 rounded-full bg-terracotta text-warm-white flex items-center justify-center text-sm font-medium tracking-wider shrink-0">
          {initials(mockUser.full_name)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-charcoal truncate">{mockUser.full_name}</p>
          <p className="text-[11px] text-stone tracking-wide mt-0.5">
            {mockUser.classification} · Block {mockUser.block}, Room {mockUser.room_number}
          </p>
          <p className="text-[11px] text-stone/70 tracking-wide mt-0.5">
            Resident since {residentSince}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {mockUser.interests.slice(0, 3).map((interest) => (
              <span
                key={interest}
                className="text-[10px] tracking-wide uppercase text-stone bg-sand px-2 py-0.5"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
        <ArrowUpRight
          size={15}
          strokeWidth={1.5}
          className="text-warm-gray shrink-0 self-start transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>
    </section>
  )
}
