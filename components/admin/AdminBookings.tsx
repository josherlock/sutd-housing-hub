'use client'

import { useMemo, useState } from 'react'
import StatusPill from '@/components/ui/StatusPill'
import { mockAdminBookings, bookingCounts } from '@/lib/data/admin/mock-admin-bookings'
import { mockFacilities } from '@/lib/data/mock-facilities'
import { studentLookup } from '@/lib/data/admin/mock-students'
import { formatDate, formatTime } from '@/lib/utils'
import { Filter, X, QrCode, ExternalLink } from 'lucide-react'
import type { Booking } from '@/lib/data/mock-facilities'

const statusOptions: { value: Booking['status'] | 'all' | 'upcoming'; label: string }[] = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'checked_in', label: 'Checked in' },
  { value: 'no_show', label: 'No show' },
  { value: 'cancelled', label: 'Cancelled' },
]

export default function AdminBookings() {
  const [status, setStatus] = useState<Booking['status'] | 'all' | 'upcoming'>('upcoming')
  const [facility, setFacility] = useState<string>('all')

  const filtered = useMemo(() => {
    const now = Date.now()
    return mockAdminBookings
      .filter((b) => {
        if (status === 'upcoming') return new Date(b.start_time).getTime() > now
        if (status !== 'all' && b.status !== status) return false
        return true
      })
      .filter((b) => (facility === 'all' ? true : b.facility_id === facility))
      .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
  }, [status, facility])

  return (
    <div className="p-6 lg:p-10 space-y-6">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-widest uppercase text-terracotta">Operations</p>
          <h1 className="font-display text-4xl text-charcoal mt-1 leading-tight">Facility bookings</h1>
          <p className="text-stone mt-2 text-sm max-w-xl">
            {bookingCounts.confirmed_upcoming} confirmed upcoming · {bookingCounts.pending} pending approval ·{' '}
            {bookingCounts.today} happening today.
          </p>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-3 bg-warm-white border border-warm-gray/30 px-4 py-3">
        <div className="flex items-center gap-2 text-stone">
          <Filter size={13} strokeWidth={1.5} />
          <span className="text-[10px] tracking-widest uppercase">Filter</span>
        </div>
        <FilterSelect label="Status" value={status} options={statusOptions} onChange={(v) => setStatus(v as any)} />
        <FilterSelect
          label="Facility"
          value={facility}
          options={[{ value: 'all', label: 'All facilities' }, ...mockFacilities.map((f) => ({ value: f.id, label: f.name }))]}
          onChange={setFacility}
        />
        {(status !== 'upcoming' || facility !== 'all') && (
          <button
            onClick={() => {
              setStatus('upcoming')
              setFacility('all')
            }}
            className="ml-auto text-[10px] tracking-widest uppercase text-stone hover:text-terracotta inline-flex items-center gap-1 transition-colors"
          >
            <X size={11} strokeWidth={1.5} />
            Reset
          </button>
        )}
      </div>

      <div className="bg-warm-white border border-warm-gray/30 overflow-x-auto">
        <table className="w-full text-sm min-w-[820px]">
          <thead>
            <tr className="bg-sand text-[10px] tracking-widest uppercase text-stone">
              <th className="text-left font-medium px-4 py-3">When</th>
              <th className="text-left font-medium px-4 py-3">Facility</th>
              <th className="text-left font-medium px-4 py-3">Resident</th>
              <th className="text-left font-medium px-4 py-3">Purpose</th>
              <th className="text-right font-medium px-4 py-3">Attendees</th>
              <th className="text-left font-medium px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-stone text-sm">
                  No bookings match the filter.
                </td>
              </tr>
            ) : (
              filtered.map((b) => {
                const s = studentLookup[b.student_id]
                return (
                  <tr key={b.id} className="border-t border-warm-gray/15 hover:bg-sand/40 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm text-charcoal font-medium">
                        {formatDate(b.start_time, { day: 'numeric', month: 'short' })}
                      </p>
                      <p className="text-[11px] text-stone mt-0.5">
                        {formatTime(b.start_time)} to {formatTime(b.end_time)}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-charcoal text-sm">{b.facility_name}</td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-charcoal">{s?.full_name ?? 'Unknown'}</p>
                      <p className="text-[11px] text-stone mt-0.5">
                        {s?.student_id} · Block {s?.block}, {s?.room_number}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-sm text-stone max-w-[260px] truncate">
                      {b.purpose ?? '—'}
                      {b.equipment_requests && b.equipment_requests.length > 0 && (
                        <p className="text-[11px] text-warm-gray mt-0.5 truncate">
                          {b.equipment_requests.join(', ')}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-sm text-charcoal">
                      {b.attendee_count}
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill status={b.status} />
                      {b.admin_note && (
                        <p className="text-[10px] text-warm-gray mt-1 max-w-[180px]">{b.admin_note}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        {b.status === 'pending' && (
                          <>
                            <button className="text-[11px] font-medium tracking-widest uppercase bg-terracotta text-warm-white px-3 py-1.5 hover:bg-terracotta-dark transition-colors">
                              Approve
                            </button>
                            <button className="text-[11px] font-medium tracking-widest uppercase border border-warm-gray/40 text-stone px-3 py-1.5 hover:border-warm-gray/70 transition-colors">
                              Reject
                            </button>
                          </>
                        )}
                        <button
                          aria-label="View QR"
                          className="inline-flex items-center justify-center w-8 h-8 border border-warm-gray/30 text-stone hover:text-charcoal hover:border-warm-gray/60 transition-colors"
                        >
                          <QrCode size={12} strokeWidth={1.5} />
                        </button>
                        <button
                          aria-label="Open detail"
                          className="inline-flex items-center justify-center w-8 h-8 border border-warm-gray/30 text-stone hover:text-charcoal hover:border-warm-gray/60 transition-colors"
                        >
                          <ExternalLink size={12} strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function FilterSelect({
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
