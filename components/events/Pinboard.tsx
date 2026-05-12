'use client'

import { useMemo, useState } from 'react'
import PosterCard from './PosterCard'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { mockPosters, allTags, type Poster } from '@/lib/data/mock-posters'
import { Search, Pin, Plus, MapPin, Calendar, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export default function Pinboard() {
  const [tag, setTag] = useState<string>('All')
  const [q, setQ] = useState('')
  const [open, setOpen] = useState<Poster | null>(null)

  const filtered = useMemo(() => {
    let list = mockPosters
    if (tag !== 'All') list = list.filter((p) => p.tags.includes(tag))
    if (q.trim()) {
      const n = q.trim().toLowerCase()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(n) ||
          p.tagline.toLowerCase().includes(n) ||
          p.body.toLowerCase().includes(n) ||
          p.host.toLowerCase().includes(n),
      )
    }
    return list
  }, [tag, q])

  return (
    <div className="space-y-8">
      <div className="bg-sand/60 border border-warm-gray/20 px-5 py-4 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-2 text-stone">
          <Pin size={14} strokeWidth={1.5} className="text-terracotta" />
          <span className="text-[11px] tracking-widest uppercase">
            Pinboard, {filtered.length} of {mockPosters.length} posters
          </span>
        </div>
        <div className="flex-1 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search posters"
              className="w-full pl-9 pr-3 py-2 border border-warm-gray/30 bg-warm-white text-charcoal text-sm focus:outline-none focus:border-terracotta"
            />
          </div>
          <Link
            href="/events/new"
            className="inline-flex items-center gap-2 bg-terracotta text-warm-white px-4 py-2 text-xs font-medium tracking-wide uppercase hover:bg-terracotta-dark transition-colors"
          >
            <Plus size={12} strokeWidth={1.5} />
            Pin a poster
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {['All', ...allTags].map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={`text-xs font-medium tracking-wide uppercase px-3 py-1.5 border transition-colors ${
              tag === t
                ? 'border-charcoal bg-charcoal text-warm-white'
                : 'border-warm-gray/30 text-stone hover:border-warm-gray/60'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Cork board */}
      <div
        className="relative p-6 md:p-10 border border-warm-gray/30"
        style={{
          backgroundColor: '#E8DCC8',
          backgroundImage:
            'radial-gradient(circle at 15% 25%, rgba(154,128,88,0.18) 0 1px, transparent 1px), radial-gradient(circle at 75% 65%, rgba(154,128,88,0.18) 0 1px, transparent 1px), radial-gradient(circle at 45% 85%, rgba(154,128,88,0.15) 0 1px, transparent 1px), radial-gradient(circle at 85% 20%, rgba(154,128,88,0.18) 0 1px, transparent 1px)',
          backgroundSize: '120px 120px, 160px 160px, 180px 180px, 140px 140px',
        }}
      >
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-stone text-sm">
            Nothing pinned here yet. Be the first.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((p) => (
              <PosterCard key={p.id} poster={p} onOpen={setOpen} />
            ))}
          </div>
        )}
      </div>

      <PosterModal poster={open} onClose={() => setOpen(null)} />
    </div>
  )
}

function PosterModal({ poster, onClose }: { poster: Poster | null; onClose: () => void }) {
  if (!poster) return null
  return (
    <Modal open={!!poster} onClose={onClose} title={poster.title} size="md">
      <div className="space-y-5">
        <p className="font-display italic text-xl text-charcoal leading-snug">{poster.tagline}</p>
        <p className="text-sm text-stone leading-relaxed">{poster.body}</p>

        <div className="bg-sand/60 border border-warm-gray/20 p-4 grid grid-cols-2 gap-3 text-sm text-charcoal">
          <p className="flex items-center gap-2">
            <Calendar size={14} strokeWidth={1.5} className="text-terracotta" />
            {poster.date_label}
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={14} strokeWidth={1.5} className="text-terracotta" />
            {poster.location}
          </p>
          <p className="col-span-2 text-[11px] tracking-widest uppercase text-stone">
            Hosted by {poster.host}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {poster.tags.map((t) => (
            <span key={t} className="text-[10px] tracking-widest uppercase px-2.5 py-1 border border-warm-gray/30 text-stone">
              {t}
            </span>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          {poster.cta && (
            <Button>
              {poster.cta}
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </Button>
          )}
        </div>
      </div>
    </Modal>
  )
}
