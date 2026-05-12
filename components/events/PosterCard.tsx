'use client'

import type { Poster } from '@/lib/data/mock-posters'
import { motion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'

const palettes: Record<
  Poster['palette'],
  { bg: string; text: string; accent: string; pin: string }
> = {
  terracotta: {
    bg: 'bg-terracotta',
    text: 'text-warm-white',
    accent: 'text-terracotta-light',
    pin: 'bg-charcoal',
  },
  charcoal: {
    bg: 'bg-charcoal',
    text: 'text-warm-white',
    accent: 'text-terracotta-light',
    pin: 'bg-terracotta',
  },
  sand: {
    bg: 'bg-sand',
    text: 'text-charcoal',
    accent: 'text-terracotta-dark',
    pin: 'bg-terracotta',
  },
  sage: {
    bg: 'bg-success-bg',
    text: 'text-success-text',
    accent: 'text-success-text',
    pin: 'bg-terracotta',
  },
  cream: {
    bg: 'bg-cream',
    text: 'text-charcoal',
    accent: 'text-terracotta-dark',
    pin: 'bg-terracotta',
  },
  rose: {
    bg: 'bg-terracotta-light/35',
    text: 'text-charcoal',
    accent: 'text-terracotta-dark',
    pin: 'bg-charcoal',
  },
}

export default function PosterCard({ poster, onOpen }: { poster: Poster; onOpen?: (p: Poster) => void }) {
  const p = palettes[poster.palette]

  return (
    <motion.button
      type="button"
      onClick={() => onOpen?.(poster)}
      initial={{ opacity: 0, y: 12, rotate: poster.tilt - 1 }}
      whileInView={{ opacity: 1, y: 0, rotate: poster.tilt }}
      whileHover={{ rotate: 0, y: -4, scale: 1.02, transition: { duration: 0.25 } }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ transform: `rotate(${poster.tilt}deg)` }}
      className={`relative text-left ${p.bg} ${p.text} p-6 w-full shadow-[0_8px_30px_-12px_rgba(44,36,32,0.35)] hover:shadow-[0_18px_40px_-12px_rgba(44,36,32,0.4)] transition-shadow`}
    >
      <span className={`absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full ${p.pin} shadow-md`} aria-hidden />
      <div className="space-y-4 pt-2">
        <div>
          <p className={`text-[10px] tracking-widest uppercase ${p.accent}`}>{poster.tags[0] ?? 'Event'}</p>
          <h3 className="font-display text-2xl md:text-3xl leading-tight mt-1">{poster.title}</h3>
          <p className="font-display italic text-base md:text-lg opacity-80 mt-2 leading-snug">
            {poster.tagline}
          </p>
        </div>

        <p className="text-sm opacity-85 leading-relaxed">{poster.body}</p>

        <div className="space-y-1 text-xs opacity-80 pt-2 border-t border-current/15">
          <p className="flex items-center gap-1.5">
            <Calendar size={12} strokeWidth={1.5} />
            {poster.date_label}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin size={12} strokeWidth={1.5} />
            {poster.location}
          </p>
          <p className="text-[10px] tracking-widest uppercase opacity-70 pt-1">
            Pinned by {poster.pinned_by}
          </p>
        </div>
      </div>
    </motion.button>
  )
}
