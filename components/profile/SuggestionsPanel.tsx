'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { suggestedOrgs, suggestedEvents } from '@/lib/data/interests'
import { ArrowRight, Compass, Sparkles, Send, MapPin } from 'lucide-react'
import { formatTime } from '@/lib/utils'

export default function SuggestionsPanel({ interests }: { interests: string[] }) {
  const orgs = useMemo(() => suggestedOrgs(interests), [interests])
  const events = useMemo(() => suggestedEvents(interests), [interests])

  if (interests.length === 0) return null
  if (orgs.length === 0 && events.length === 0) return null

  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-terracotta">
            Matched for you
          </p>
          <h2 className="font-display text-2xl text-charcoal leading-tight mt-2">
            Based on your interests
          </h2>
        </div>
      </div>

      {orgs.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-stone">
            <Compass size={14} strokeWidth={1.5} className="text-terracotta" />
            <p className="text-[10px] tracking-widest uppercase">Clubs you might love</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {orgs.map((o) => {
              const tg = o.telegram
                ? o.telegram.startsWith('http')
                  ? o.telegram
                  : `https://${o.telegram}`
                : null
              return (
                <div
                  key={o.id}
                  className="bg-warm-white border border-warm-gray/30 p-4 hover:border-warm-gray/60 transition-colors flex flex-col gap-3"
                >
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-stone">{o.type}</p>
                    <h3 className="text-sm font-medium text-charcoal mt-1 leading-snug">{o.name}</h3>
                    <p className="text-xs text-stone mt-1 line-clamp-2 leading-relaxed">
                      {o.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-warm-gray/15">
                    <Link
                      href="/orgs"
                      className="text-[11px] tracking-widest uppercase text-stone hover:text-terracotta transition-colors inline-flex items-center gap-1"
                    >
                      Details
                      <ArrowRight size={11} strokeWidth={1.5} />
                    </Link>
                    {tg && (
                      <a
                        href={tg}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-widest uppercase text-terracotta hover:text-terracotta-dark transition-colors"
                      >
                        <Send size={11} strokeWidth={1.5} />
                        Telegram
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {events.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-stone">
            <Sparkles size={14} strokeWidth={1.5} className="text-terracotta" />
            <p className="text-[10px] tracking-widest uppercase">Events to check out</p>
          </div>
          <div className="space-y-2">
            {events.map((e) => (
              <Link
                key={e.id}
                href="/events"
                className="flex items-center gap-4 bg-warm-white border border-warm-gray/30 p-4 hover:border-warm-gray/60 transition-colors group"
              >
                <div className="w-12 text-center bg-sand py-1.5 shrink-0">
                  <p className="text-[10px] tracking-widest uppercase text-stone">
                    {new Date(e.start_time).toLocaleString('en-SG', { month: 'short' })}
                  </p>
                  <p className="font-display text-lg leading-none text-charcoal mt-0.5">
                    {new Date(e.start_time).getDate()}
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-charcoal group-hover:text-terracotta-dark transition-colors">
                    {e.title}
                  </p>
                  <p className="text-xs text-stone mt-0.5 flex items-center gap-1.5 flex-wrap">
                    {formatTime(e.start_time)}
                    <span>·</span>
                    <MapPin size={11} strokeWidth={1.5} />
                    {e.location}
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  strokeWidth={1.5}
                  className="text-warm-gray group-hover:translate-x-0.5 transition-transform shrink-0"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
