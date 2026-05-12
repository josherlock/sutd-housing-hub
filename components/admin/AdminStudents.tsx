'use client'

import { useMemo, useState } from 'react'
import { mockStudents, type StudentRecord } from '@/lib/data/admin/mock-students'
import { invoicesByStudent } from '@/lib/data/admin/mock-admin-invoices'
import { mockAdminTickets } from '@/lib/data/admin/mock-admin-tickets'
import { mockAdminBookings } from '@/lib/data/admin/mock-admin-bookings'
import { formatCurrency, formatDate, initials } from '@/lib/utils'
import { Search, Filter, X, Mail, Phone } from 'lucide-react'

const statusClasses: Record<StudentRecord['status'], string> = {
  active: 'bg-success-bg text-success-text border-success-text/30',
  on_leave: 'bg-warning-bg text-stone border-terracotta/40',
  moved_out: 'bg-sand text-warm-gray border-warm-gray/40',
}

export default function AdminStudents() {
  const [q, setQ] = useState('')
  const [block, setBlock] = useState<string>('all')
  const [classification, setClassification] = useState<string>('all')
  const [selectedId, setSelectedId] = useState<string | null>(mockStudents[0]?.id ?? null)

  const filtered = useMemo(() => {
    return mockStudents
      .filter((s) => (block === 'all' ? true : s.block === block))
      .filter((s) => (classification === 'all' ? true : s.classification === classification))
      .filter((s) => {
        if (!q.trim()) return true
        const n = q.trim().toLowerCase()
        return (
          s.full_name.toLowerCase().includes(n) ||
          s.student_id.includes(n) ||
          s.email.toLowerCase().includes(n) ||
          s.room_number.includes(n)
        )
      })
  }, [q, block, classification])

  const selected = selectedId ? mockStudents.find((s) => s.id === selectedId) : null
  const blocks = Array.from(new Set(mockStudents.map((s) => s.block))).sort()
  const classifications = Array.from(new Set(mockStudents.map((s) => s.classification)))

  return (
    <div className="p-6 lg:p-10 space-y-6">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-widest uppercase text-terracotta">Directory</p>
          <h1 className="font-display text-4xl text-charcoal mt-1 leading-tight">Residents</h1>
          <p className="text-stone mt-2 text-sm max-w-xl">
            {mockStudents.length} students on file. Search by name, ID, room, or email.
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search
            size={14}
            strokeWidth={1.5}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray"
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search residents"
            className="w-full pl-9 pr-3 py-2.5 border border-warm-gray/40 bg-warm-white text-charcoal text-sm focus:outline-none focus:border-terracotta"
          />
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-3 bg-warm-white border border-warm-gray/30 px-4 py-3">
        <div className="flex items-center gap-2 text-stone">
          <Filter size={13} strokeWidth={1.5} />
          <span className="text-[10px] tracking-widest uppercase">Filter</span>
        </div>
        <FilterSelect
          label="Block"
          value={block}
          options={[{ value: 'all', label: 'All blocks' }, ...blocks.map((b) => ({ value: b, label: `Block ${b}` }))]}
          onChange={setBlock}
        />
        <FilterSelect
          label="Year"
          value={classification}
          options={[
            { value: 'all', label: 'All years' },
            ...classifications.map((c) => ({ value: c, label: c })),
          ]}
          onChange={setClassification}
        />
        {(block !== 'all' || classification !== 'all') && (
          <button
            onClick={() => {
              setBlock('all')
              setClassification('all')
            }}
            className="ml-auto text-[10px] tracking-widest uppercase text-stone hover:text-terracotta inline-flex items-center gap-1 transition-colors"
          >
            <X size={11} strokeWidth={1.5} />
            Clear
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-5">
        <div className="bg-warm-white border border-warm-gray/30 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-sand text-[10px] tracking-widest uppercase text-stone">
                <th className="text-left font-medium px-4 py-3">Resident</th>
                <th className="text-left font-medium px-4 py-3 hidden md:table-cell">Room</th>
                <th className="text-left font-medium px-4 py-3 hidden md:table-cell">Year</th>
                <th className="text-left font-medium px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-stone text-sm">
                    No residents match the filter.
                  </td>
                </tr>
              ) : (
                filtered.map((s) => {
                  const sel = selectedId === s.id
                  return (
                    <tr
                      key={s.id}
                      onClick={() => setSelectedId(s.id)}
                      className={`border-t border-warm-gray/15 cursor-pointer transition-colors ${
                        sel ? 'bg-terracotta/5' : 'hover:bg-sand/40'
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-sand text-charcoal rounded-full flex items-center justify-center text-xs font-medium tracking-wider shrink-0">
                            {initials(s.full_name)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-charcoal truncate">{s.full_name}</p>
                            <p className="text-[11px] text-stone mt-0.5">
                              {s.student_id} · {s.pillar}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-stone hidden md:table-cell">
                        Block {s.block}, {s.room_number}
                      </td>
                      <td className="px-4 py-3 text-xs text-stone hidden md:table-cell">
                        {s.classification}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 text-[10px] tracking-widest uppercase border ${statusClasses[s.status]}`}
                        >
                          {s.status === 'on_leave' ? 'On leave' : s.status === 'moved_out' ? 'Moved out' : 'Active'}
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="lg:sticky lg:top-20 h-fit">
          {selected ? <StudentDetail student={selected} /> : (
            <div className="bg-sand/50 border border-warm-gray/20 p-12 text-center text-sm text-stone">
              Select a resident to view their profile.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StudentDetail({ student }: { student: StudentRecord }) {
  const invoices = invoicesByStudent(student.id)
  const outstanding = invoices
    .filter((i) => i.status === 'unpaid' || i.status === 'overdue')
    .reduce((s, i) => s + i.amount, 0)
  const ticketCount = mockAdminTickets.filter((t) => t.student_id === student.id).length
  const bookingCount = mockAdminBookings.filter((b) => b.student_id === student.id).length

  return (
    <div className="bg-warm-white border border-warm-gray/30 p-6 space-y-6">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-sand text-charcoal rounded-full flex items-center justify-center font-display text-xl shrink-0">
          {initials(student.full_name)}
        </div>
        <div className="min-w-0">
          <h2 className="font-display text-2xl text-charcoal leading-tight">{student.full_name}</h2>
          <p className="text-[11px] tracking-wide text-stone mt-1">
            {student.student_id} · {student.classification} · {student.pillar}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <a
          href={`mailto:${student.email}`}
          className="flex items-center gap-2 px-3 py-2 border border-warm-gray/30 hover:border-warm-gray/60 text-charcoal transition-colors"
        >
          <Mail size={13} strokeWidth={1.5} className="text-terracotta" />
          <span className="text-xs truncate">{student.email}</span>
        </a>
        <a
          href={`tel:${student.phone.replace(/\s/g, '')}`}
          className="flex items-center gap-2 px-3 py-2 border border-warm-gray/30 hover:border-warm-gray/60 text-charcoal transition-colors"
        >
          <Phone size={13} strokeWidth={1.5} className="text-terracotta" />
          <span className="text-xs truncate">{student.phone}</span>
        </a>
      </div>

      <div className="bg-sand p-4 grid grid-cols-2 gap-3 text-sm">
        <Detail label="Block" value={student.block} />
        <Detail label="Room" value={student.room_number} />
        <Detail label="Moved in" value={formatDate(student.move_in)} />
        <Detail label="Status" value={student.status.replace('_', ' ')} />
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <Mini label="Tickets" value={ticketCount} />
        <Mini label="Bookings" value={bookingCount} />
        <Mini label="Outstanding" value={formatCurrency(outstanding)} urgent={outstanding > 0} />
      </div>

      {invoices.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] tracking-widest uppercase text-stone">Latest invoices</p>
          <ul className="divide-y divide-warm-gray/15 border border-warm-gray/20">
            {invoices.slice(0, 4).map((i) => (
              <li key={i.id} className="flex items-center justify-between gap-3 px-3 py-2 text-xs">
                <div className="min-w-0">
                  <p className="text-charcoal truncate">{i.description}</p>
                  <p className="text-[10px] text-warm-gray">Due {formatDate(i.due_date)}</p>
                </div>
                <span className="text-charcoal tabular-nums">{formatCurrency(i.amount)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-2 pt-2 border-t border-warm-gray/15">
        <button className="inline-flex items-center gap-1.5 bg-charcoal text-warm-white text-xs font-medium tracking-wide uppercase px-4 py-2 hover:bg-charcoal/90 transition-colors">
          Send a message
        </button>
        <button className="inline-flex items-center gap-1.5 border border-warm-gray/40 text-xs font-medium tracking-wide uppercase px-4 py-2 text-stone hover:border-warm-gray/70 hover:text-charcoal transition-colors">
          View full record
        </button>
      </div>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] tracking-widest uppercase text-stone">{label}</p>
      <p className="font-medium text-charcoal mt-1 capitalize text-sm">{value}</p>
    </div>
  )
}

function Mini({ label, value, urgent }: { label: string; value: string | number; urgent?: boolean }) {
  return (
    <div className={`p-3 border ${urgent ? 'border-terracotta/40 bg-terracotta/10' : 'border-warm-gray/20 bg-cream'}`}>
      <p className={`font-display text-xl leading-none ${urgent ? 'text-terracotta-dark' : 'text-charcoal'}`}>{value}</p>
      <p className="text-[10px] tracking-widest uppercase text-stone mt-1.5">{label}</p>
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
