'use client'

import { useMemo, useState } from 'react'
import StatusPill from '@/components/ui/StatusPill'
import StatTile from './StatTile'
import { mockAdminInvoices, invoiceTotals } from '@/lib/data/admin/mock-admin-invoices'
import { studentLookup, mockStudents } from '@/lib/data/admin/mock-students'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Filter, X, Receipt, AlertCircle, CheckCircle2, Send, Download } from 'lucide-react'
import type { InvoiceStatus } from '@/lib/data/mock-payments'

const statusOptions: { value: InvoiceStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'unpaid', label: 'Unpaid' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'paid', label: 'Paid' },
  { value: 'waived', label: 'Waived' },
]

const methodLabels: Record<string, string> = {
  paynow: 'PayNow',
  paylah: 'PayLah',
  card: 'Card',
  bank_transfer: 'Bank',
}

export default function AdminPayments() {
  const [status, setStatus] = useState<InvoiceStatus | 'all'>('all')
  const [block, setBlock] = useState<string>('all')

  const filtered = useMemo(() => {
    return mockAdminInvoices
      .filter((i) => (status === 'all' ? true : i.status === status))
      .filter((i) => {
        if (block === 'all') return true
        const s = studentLookup[i.student_id]
        return s?.block === block
      })
      .sort((a, b) => new Date(b.due_date).getTime() - new Date(a.due_date).getTime())
  }, [status, block])

  const blocks = Array.from(new Set(mockStudents.map((s) => s.block))).sort()

  return (
    <div className="p-6 lg:p-10 space-y-8">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-widest uppercase text-terracotta">Finance</p>
          <h1 className="font-display text-4xl text-charcoal mt-1 leading-tight">Payments</h1>
          <p className="text-stone mt-2 text-sm max-w-xl">
            Every invoice across every resident. Filter, chase, mark paid.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-1.5 border border-warm-gray/40 text-xs font-medium tracking-wide uppercase px-3 py-2 text-stone hover:border-warm-gray/70 hover:text-charcoal transition-colors">
            <Download size={12} strokeWidth={1.5} />
            Export CSV
          </button>
          <button className="inline-flex items-center gap-1.5 bg-charcoal text-warm-white text-xs font-medium tracking-wide uppercase px-3 py-2 hover:bg-charcoal/90 transition-colors">
            <Send size={12} strokeWidth={1.5} />
            Send reminders
          </button>
        </div>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatTile
          label="Outstanding"
          value={formatCurrency(invoiceTotals.outstanding)}
          sublabel={`${mockAdminInvoices.filter((i) => i.status === 'unpaid' || i.status === 'overdue').length} invoices`}
          icon={Receipt}
          tone={invoiceTotals.outstanding > 0 ? 'urgent' : 'neutral'}
        />
        <StatTile
          label="Overdue"
          value={invoiceTotals.overdue_count}
          sublabel="Past due date"
          icon={AlertCircle}
          tone={invoiceTotals.overdue_count > 0 ? 'urgent' : 'neutral'}
        />
        <StatTile
          label="Collected"
          value={formatCurrency(invoiceTotals.paid_term)}
          sublabel="This term"
          icon={CheckCircle2}
          tone="success"
        />
        <StatTile
          label="Residents on file"
          value={mockStudents.length}
          sublabel="Active accounts"
        />
      </section>

      <div className="flex flex-wrap items-center gap-3 bg-warm-white border border-warm-gray/30 px-4 py-3">
        <div className="flex items-center gap-2 text-stone">
          <Filter size={13} strokeWidth={1.5} />
          <span className="text-[10px] tracking-widest uppercase">Filter</span>
        </div>
        <FilterSelect label="Status" value={status} options={statusOptions} onChange={(v) => setStatus(v as InvoiceStatus | 'all')} />
        <FilterSelect
          label="Block"
          value={block}
          options={[{ value: 'all', label: 'All' }, ...blocks.map((b) => ({ value: b, label: `Block ${b}` }))]}
          onChange={setBlock}
        />
        {(status !== 'all' || block !== 'all') && (
          <button
            onClick={() => {
              setStatus('all')
              setBlock('all')
            }}
            className="ml-auto text-[10px] tracking-widest uppercase text-stone hover:text-terracotta inline-flex items-center gap-1 transition-colors"
          >
            <X size={11} strokeWidth={1.5} />
            Clear
          </button>
        )}
      </div>

      <div className="bg-warm-white border border-warm-gray/30 overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="bg-sand text-[10px] tracking-widest uppercase text-stone">
              <th className="text-left font-medium px-4 py-3">Resident</th>
              <th className="text-left font-medium px-4 py-3">Description</th>
              <th className="text-left font-medium px-4 py-3">Period</th>
              <th className="text-right font-medium px-4 py-3">Amount</th>
              <th className="text-left font-medium px-4 py-3">Due</th>
              <th className="text-left font-medium px-4 py-3">Status</th>
              <th className="text-left font-medium px-4 py-3">Paid via</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-stone text-sm">
                  No invoices match.
                </td>
              </tr>
            ) : (
              filtered.map((i) => {
                const s = studentLookup[i.student_id]
                const overdue = i.status === 'overdue'
                return (
                  <tr
                    key={i.id}
                    className={`border-t border-warm-gray/15 hover:bg-sand/40 transition-colors ${
                      overdue ? 'bg-terracotta/[0.04]' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-charcoal">{s?.full_name ?? 'Unknown'}</p>
                      <p className="text-[11px] text-stone mt-0.5">
                        {s?.student_id} · Block {s?.block}, {s?.room_number}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-charcoal">{i.description}</td>
                    <td className="px-4 py-3 text-stone text-xs">{i.period}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-charcoal font-medium">
                      {formatCurrency(i.amount)}
                    </td>
                    <td className="px-4 py-3 text-stone text-xs">{formatDate(i.due_date)}</td>
                    <td className="px-4 py-3">
                      <StatusPill status={i.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-stone">
                      {i.paid_at ? (
                        <>
                          <p className="text-charcoal">{i.method ? methodLabels[i.method] : 'Paid'}</p>
                          <p className="text-[10px] text-warm-gray">{formatDate(i.paid_at)}</p>
                        </>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        {(i.status === 'unpaid' || i.status === 'overdue') && (
                          <>
                            <button className="text-[11px] font-medium tracking-widest uppercase bg-terracotta text-warm-white px-3 py-1.5 hover:bg-terracotta-dark transition-colors">
                              Mark paid
                            </button>
                            <button
                              aria-label="Send reminder"
                              className="inline-flex items-center justify-center w-8 h-8 border border-warm-gray/30 text-stone hover:text-charcoal hover:border-warm-gray/60 transition-colors"
                            >
                              <Send size={12} strokeWidth={1.5} />
                            </button>
                          </>
                        )}
                        {i.status === 'paid' && (
                          <button
                            aria-label="Download receipt"
                            className="inline-flex items-center justify-center w-8 h-8 border border-warm-gray/30 text-stone hover:text-charcoal hover:border-warm-gray/60 transition-colors"
                          >
                            <Download size={12} strokeWidth={1.5} />
                          </button>
                        )}
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
