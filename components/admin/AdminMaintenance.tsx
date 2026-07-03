'use client'

import { useMemo, useState } from 'react'
import StatusPill from '@/components/ui/StatusPill'
import { mockAdminTickets, ticketCounts, type AdminTicket, type Priority } from '@/lib/data/admin/mock-admin-tickets'
import { studentLookup } from '@/lib/data/admin/mock-students'
import { categoryIcons, categoryLabels } from '@/components/maintenance/categoryIcons'
import { formatDate, formatDateTime } from '@/lib/utils'
import type { TicketStatus } from '@/lib/data/mock-maintenance'
import { Filter, X, AlertCircle, Check, ChevronRight } from 'lucide-react'

const statusFilters: { value: TicketStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'submitted', label: 'New' },
  { value: 'assigned', label: 'Assigned' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'cancelled', label: 'Cancelled' },
]

const priorityClasses: Record<Priority, string> = {
  urgent: 'bg-terracotta text-warm-white',
  high: 'bg-terracotta/15 text-terracotta-dark border border-terracotta/30',
  normal: 'bg-sand text-stone border border-warm-gray/30',
  low: 'bg-warm-white text-warm-gray border border-warm-gray/30',
}

const priorityLabels: Record<Priority, string> = {
  urgent: 'Urgent',
  high: 'High',
  normal: 'Normal',
  low: 'Low',
}

export default function AdminMaintenance() {
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all')
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all')
  const [blockFilter, setBlockFilter] = useState<string>('all')
  const [selectedId, setSelectedId] = useState<string | null>(mockAdminTickets[0]?.id ?? null)

  const filtered = useMemo(() => {
    return mockAdminTickets.filter((t) => {
      if (statusFilter !== 'all' && t.status !== statusFilter) return false
      if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false
      if (blockFilter !== 'all' && t.block !== blockFilter) return false
      return true
    })
  }, [statusFilter, priorityFilter, blockFilter])

  const selected = selectedId ? mockAdminTickets.find((t) => t.id === selectedId) : null
  const blocks = Array.from(new Set(mockAdminTickets.map((t) => t.block))).sort()

  return (
    <div className="p-6 lg:p-10 space-y-6">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-widest uppercase text-terracotta">Operations</p>
          <h1 className="font-display text-4xl text-charcoal mt-1 leading-tight">Maintenance queue</h1>
          <p className="text-stone mt-2 text-sm max-w-xl">
            {ticketCounts.open + ticketCounts.assigned + ticketCounts.in_progress} active tickets across
            all blocks. {ticketCounts.urgent} marked urgent.
          </p>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-3 bg-warm-white border border-warm-gray/30 px-4 py-3">
        <div className="flex items-center gap-2 text-stone">
          <Filter size={13} strokeWidth={1.5} />
          <span className="text-[10px] tracking-widest uppercase">Filter</span>
        </div>
        <FilterGroup label="Status" value={statusFilter} options={statusFilters} onChange={(v) => setStatusFilter(v as TicketStatus | 'all')} />
        <FilterGroup
          label="Priority"
          value={priorityFilter}
          options={[
            { value: 'all', label: 'All' },
            { value: 'urgent', label: 'Urgent' },
            { value: 'high', label: 'High' },
            { value: 'normal', label: 'Normal' },
            { value: 'low', label: 'Low' },
          ]}
          onChange={(v) => setPriorityFilter(v as Priority | 'all')}
        />
        <FilterGroup
          label="Block"
          value={blockFilter}
          options={[{ value: 'all', label: 'All' }, ...blocks.map((b) => ({ value: b, label: `Block ${b}` }))]}
          onChange={setBlockFilter}
        />
        {(statusFilter !== 'all' || priorityFilter !== 'all' || blockFilter !== 'all') && (
          <button
            onClick={() => {
              setStatusFilter('all')
              setPriorityFilter('all')
              setBlockFilter('all')
            }}
            className="ml-auto text-[10px] tracking-widest uppercase text-stone hover:text-terracotta inline-flex items-center gap-1 transition-colors"
          >
            <X size={11} strokeWidth={1.5} />
            Clear
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-5">
        <div className="bg-warm-white border border-warm-gray/30 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-sand text-[10px] tracking-widest uppercase text-stone">
                <th className="text-left font-medium px-4 py-3">Ticket</th>
                <th className="text-left font-medium px-4 py-3 hidden md:table-cell">Student</th>
                <th className="text-left font-medium px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-stone text-sm">
                    No tickets match the filter.
                  </td>
                </tr>
              ) : (
                filtered.map((t) => {
                  const Icon = categoryIcons[t.category]
                  const s = studentLookup[t.student_id]
                  const isSel = selectedId === t.id
                  return (
                    <tr
                      key={t.id}
                      onClick={() => setSelectedId(t.id)}
                      className={`border-t border-warm-gray/15 cursor-pointer transition-colors ${
                        isSel ? 'bg-terracotta/5' : 'hover:bg-sand/40'
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-terracotta/10 text-terracotta-dark flex items-center justify-center shrink-0">
                            <Icon size={14} strokeWidth={1.5} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-medium text-charcoal truncate">{t.title}</span>
                              <span className={`text-[9px] tracking-widest uppercase px-1.5 py-0.5 ${priorityClasses[t.priority]}`}>
                                {priorityLabels[t.priority]}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone mt-0.5">
                              {categoryLabels[t.category]} · Block {t.block}, {t.room_number} · {formatDate(t.created_at, { day: 'numeric', month: 'short' })}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-stone hidden md:table-cell">
                        <p className="text-charcoal">{s?.full_name ?? 'Unknown'}</p>
                        <p className="text-[10px] tracking-wide text-warm-gray">{s?.student_id}</p>
                      </td>
                      <td className="px-4 py-3">
                        <StatusPill status={t.status} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <ChevronRight size={14} strokeWidth={1.5} className="text-warm-gray" />
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="lg:sticky lg:top-20 h-fit">
          {selected ? (
            <TicketDetail ticket={selected} />
          ) : (
            <div className="bg-sand/50 border border-warm-gray/20 p-12 text-center text-sm text-stone">
              Select a ticket to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FilterGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (v: string) => void
}) {
  return (
    <label className="inline-flex items-center gap-2 text-xs text-stone">
      <span className="text-[10px] tracking-widest uppercase">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-warm-gray/30 bg-warm-white text-charcoal text-xs px-2 py-1 focus:outline-none focus:border-terracotta"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}

function TicketDetail({ ticket }: { ticket: AdminTicket }) {
  const Icon = categoryIcons[ticket.category]
  const s = studentLookup[ticket.student_id]

  return (
    <div className="bg-warm-white border border-warm-gray/30 p-6 space-y-5">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-terracotta/10 text-terracotta-dark flex items-center justify-center shrink-0">
          <Icon size={20} strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] tracking-widest uppercase text-stone">
              {categoryLabels[ticket.category]}
            </span>
            <StatusPill status={ticket.status} />
            <span className={`text-[9px] tracking-widest uppercase px-1.5 py-0.5 ${priorityClasses[ticket.priority]}`}>
              {priorityLabels[ticket.priority]}
            </span>
          </div>
          <h2 className="font-display text-2xl text-charcoal mt-2 leading-tight">{ticket.title}</h2>
          <p className="text-[11px] tracking-wide text-stone mt-1">
            Ticket {ticket.id.toUpperCase()} · Opened {formatDate(ticket.created_at)}
          </p>
        </div>
      </div>

      <p className="text-sm text-stone leading-relaxed">{ticket.description}</p>

      {s && (
        <div className="bg-sand p-4 border border-warm-gray/20 space-y-2 text-sm">
          <p className="text-[10px] tracking-widest uppercase text-stone">Reported by</p>
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <p className="font-medium text-charcoal">{s.full_name}</p>
              <p className="text-[11px] text-stone mt-0.5">
                {s.student_id} · {s.email}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-stone">Block {ticket.block}, Room {ticket.room_number}</p>
              <p className="text-[11px] text-stone">{s.classification} · {s.pillar}</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <p className="text-[11px] tracking-widest uppercase text-stone">Assign technician</p>
        <select
          defaultValue={ticket.technician ?? ''}
          className="input-base"
        >
          <option value="">Unassigned</option>
          <option value="Wei Ming, Housing Maintenance">Wei Ming, Housing Maintenance</option>
          <option value="Mr Tan, Cool Breeze Services">Mr Tan, Cool Breeze Services</option>
          <option value="Rentokil">Rentokil</option>
          <option value="IT Services">IT Services</option>
          <option value="Block 55 RA team">Block 55 RA team</option>
        </select>
      </div>

      {ticket.scheduled_at && (
        <div className="text-sm text-charcoal">
          <p className="text-[10px] tracking-widest uppercase text-stone">Scheduled visit</p>
          <p className="mt-1">{formatDateTime(ticket.scheduled_at)}</p>
        </div>
      )}

      {ticket.rating && (
        <div className="bg-success-bg/40 border border-success-text/20 p-4">
          <p className="text-[10px] tracking-widest uppercase text-success-text">Resident rating</p>
          <p className="font-display text-2xl text-charcoal mt-1">{ticket.rating} out of 5</p>
          {ticket.rating_comment && (
            <p className="text-sm text-stone italic mt-2 leading-relaxed">
              &ldquo;{ticket.rating_comment}&rdquo;
            </p>
          )}
        </div>
      )}

      {ticket.admin_note && (
        <div className="bg-warning-bg border-l-2 border-terracotta px-4 py-3 text-sm text-stone">
          <p className="text-[10px] tracking-widest uppercase text-stone mb-1">Internal note</p>
          {ticket.admin_note}
        </div>
      )}

      <div className="flex flex-wrap gap-2 pt-2 border-t border-warm-gray/15">
        <button className="inline-flex items-center gap-1.5 bg-terracotta text-warm-white text-xs font-medium tracking-wide uppercase px-4 py-2 hover:bg-terracotta-dark transition-colors">
          <Check size={12} strokeWidth={1.5} />
          Mark resolved
        </button>
        <button className="inline-flex items-center gap-1.5 border border-warm-gray/40 text-xs font-medium tracking-wide uppercase px-4 py-2 text-stone hover:border-warm-gray/70 hover:text-charcoal transition-colors">
          Update status
        </button>
        <button className="inline-flex items-center gap-1.5 border border-warm-gray/40 text-xs font-medium tracking-wide uppercase px-4 py-2 text-stone hover:border-warm-gray/70 hover:text-charcoal transition-colors">
          Add note
        </button>
        <button className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase px-3 py-2 text-terracotta hover:text-terracotta-dark transition-colors">
          <AlertCircle size={12} strokeWidth={1.5} />
          Escalate
        </button>
      </div>
    </div>
  )
}
