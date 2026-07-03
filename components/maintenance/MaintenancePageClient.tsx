'use client'

import { useMemo, useState } from 'react'
import Button from '@/components/ui/Button'
import StatusPill from '@/components/ui/StatusPill'
import SectionLabel from '@/components/ui/SectionLabel'
import IconTile from '@/components/ui/IconTile'
import { categoryIcons, categoryLabels } from './categoryIcons'
import type { MaintenanceTicket, TicketStatus } from '@/lib/types/maintenance'
import { formatDate, formatDateTime } from '@/lib/utils'
import { Plus, Star, CalendarClock, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type Filter = 'all' | TicketStatus | 'scheduled'

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'submitted', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'scheduled', label: 'Scheduled' },
]

export default function MaintenancePageClient({ tickets }: { tickets: MaintenanceTicket[] }) {
  const [filter, setFilter] = useState<Filter>('all')
  const [selectedId, setSelectedId] = useState<string>(tickets[0]?.id ?? '')

  const filtered = useMemo(() => {
    if (filter === 'all') return tickets
    if (filter === 'scheduled') return tickets.filter((t) => t.is_scheduled_service)
    return tickets.filter((t) => t.status === filter)
  }, [tickets, filter])

  const selected = tickets.find((t) => t.id === selectedId) ?? filtered[0]

  return (
    <div className="container-wide py-8 md:py-12">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <SectionLabel>Maintenance</SectionLabel>
          <h1 className="font-display text-4xl md:text-5xl text-charcoal mt-2 leading-tight">
            Keep your room running.
          </h1>
          <p className="text-stone mt-2 text-sm md:text-base max-w-xl">
            Track open requests, follow the progress in real time, and rate the technician when the
            work is done.
          </p>
        </div>
        <Button href="/maintenance/new">
          <Plus size={16} strokeWidth={1.5} />
          New request
        </Button>
      </header>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`text-xs font-medium tracking-wide uppercase px-3 py-2 border transition-colors ${
                  filter === f.value
                    ? 'border-charcoal bg-charcoal text-warm-white'
                    : 'border-warm-gray/30 text-stone hover:border-warm-gray/60'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.length === 0 && (
              <div className="bg-sand/50 border border-warm-gray/20 p-8 text-center text-sm text-stone">
                Nothing here.
              </div>
            )}
            {filtered.map((t) => (
              <TicketRow
                key={t.id}
                ticket={t}
                active={t.id === selectedId}
                onClick={() => setSelectedId(t.id)}
              />
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <TicketDetail ticket={selected} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function TicketRow({
  ticket,
  active,
  onClick,
}: {
  ticket: MaintenanceTicket
  active: boolean
  onClick: () => void
}) {
  const Icon = categoryIcons[ticket.category]
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left bg-warm-white border p-5 transition-all ${
        active ? 'border-charcoal' : 'border-warm-gray/30 hover:border-warm-gray/60'
      }`}
    >
      <div className="flex items-start gap-4">
        <IconTile icon={Icon} tone={ticket.status === 'resolved' ? 'cream' : 'terracotta'} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap">
            <h3 className="text-sm font-medium text-charcoal">{ticket.title}</h3>
            {ticket.is_scheduled_service && (
              <span className="inline-flex items-center gap-1 text-[10px] tracking-widest uppercase text-terracotta">
                <CalendarClock size={12} strokeWidth={1.5} />
                Scheduled
              </span>
            )}
          </div>
          <p className="text-xs text-stone mt-1 line-clamp-2">{ticket.description}</p>
          <div className="flex items-center gap-3 mt-3">
            <StatusPill status={ticket.status} />
            <span className="text-[11px] text-stone">{formatDate(ticket.created_at)}</span>
          </div>
        </div>
      </div>
    </button>
  )
}

const stages: TicketStatus[] = ['submitted', 'assigned', 'in_progress', 'resolved']

function TicketDetail({ ticket }: { ticket: MaintenanceTicket }) {
  const Icon = categoryIcons[ticket.category]
  const currentIdx = stages.indexOf(ticket.status as TicketStatus)

  return (
    <div className="bg-warm-white border border-warm-gray/30 p-6 md:p-8 space-y-6">
      <div className="flex items-start gap-4">
        <IconTile icon={Icon} tone="terracotta" size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] tracking-widest uppercase text-terracotta">
              {categoryLabels[ticket.category]}
            </span>
            <StatusPill status={ticket.status} />
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-charcoal mt-2 leading-tight">
            {ticket.title}
          </h2>
          <p className="text-[11px] text-stone tracking-wide uppercase mt-1">
            Ticket {(ticket.code ?? ticket.id).toUpperCase()} · Opened {formatDate(ticket.created_at)}
          </p>
        </div>
      </div>

      <p className="text-sm text-stone leading-relaxed">{ticket.description}</p>

      {ticket.scheduled_at && (
        <div className="bg-sand p-4 border border-warm-gray/20 flex items-start gap-3">
          <CalendarClock size={18} strokeWidth={1.5} className="text-terracotta shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-charcoal">
              Appointment, {formatDateTime(ticket.scheduled_at)}
            </p>
            {ticket.technician_name && (
              <p className="text-xs text-stone mt-0.5">{ticket.technician_name}</p>
            )}
            <button className="mt-2 text-xs font-medium tracking-wide uppercase text-terracotta hover:text-terracotta-dark transition-colors">
              Reschedule
            </button>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-[11px] tracking-widest uppercase text-stone mb-4">Progress</h3>
        <ol className="space-y-4">
          {stages.map((stage, idx) => {
            const reached = idx <= currentIdx
            const entry = ticket.timeline.find((t) => t.stage === stage)
            return (
              <li key={stage} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      reached
                        ? 'bg-terracotta text-warm-white'
                        : 'bg-sand text-warm-gray border border-warm-gray/30'
                    }`}
                  >
                    {reached ? <CheckCircle2 size={14} strokeWidth={1.5} /> : <span className="text-[10px]">{idx + 1}</span>}
                  </div>
                  {idx < stages.length - 1 && (
                    <div className={`w-px flex-1 mt-1 ${reached ? 'bg-terracotta/50' : 'bg-warm-gray/30'}`} />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm font-medium text-charcoal capitalize">
                    {stage.replace('_', ' ')}
                  </p>
                  {entry && (
                    <p className="text-xs text-stone mt-0.5">
                      {formatDateTime(entry.at)}
                      {entry.note && ` · ${entry.note}`}
                    </p>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      {ticket.status === 'resolved' && ticket.rating && (
        <div className="bg-success-bg/40 border border-success-text/20 p-4">
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                strokeWidth={1.5}
                className={i < ticket.rating! ? 'fill-terracotta text-terracotta' : 'text-warm-gray/50'}
              />
            ))}
            <span className="text-xs text-stone ml-2">Rated {ticket.rating} out of 5</span>
          </div>
          {ticket.rating_comment && (
            <p className="text-sm text-stone italic mt-3 leading-relaxed">
              &ldquo;{ticket.rating_comment}&rdquo;
            </p>
          )}
        </div>
      )}
    </div>
  )
}
