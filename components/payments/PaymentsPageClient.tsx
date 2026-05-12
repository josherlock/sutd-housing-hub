'use client'

import { useMemo, useState } from 'react'
import Button from '@/components/ui/Button'
import StatusPill from '@/components/ui/StatusPill'
import SectionLabel from '@/components/ui/SectionLabel'
import PaymentModal from './PaymentModal'
import { mockInvoices, type Invoice } from '@/lib/data/mock-payments'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Download } from 'lucide-react'

export default function PaymentsPageClient() {
  const [autoPay, setAutoPay] = useState(false)
  const [openInvoiceIds, setOpenInvoiceIds] = useState<string[] | null>(null)

  const active = useMemo(
    () => mockInvoices.filter((i) => i.status !== 'paid'),
    [],
  )
  const history = useMemo(
    () => mockInvoices.filter((i) => i.status === 'paid'),
    [],
  )

  const outstanding = active
    .filter((i) => i.status === 'unpaid' || i.status === 'overdue')
    .reduce((s, i) => s + i.amount, 0)

  const selected: Invoice[] = openInvoiceIds
    ? mockInvoices.filter((i) => openInvoiceIds.includes(i.id))
    : []

  return (
    <div className="container-wide py-8 md:py-12 space-y-12">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <SectionLabel>Payments</SectionLabel>
          <h1 className="font-display text-4xl md:text-5xl text-charcoal mt-2 leading-tight">
            {outstanding > 0 ? formatCurrency(outstanding) + ' outstanding' : 'Nothing outstanding'}
          </h1>
          <p className="text-stone mt-2 text-sm md:text-base max-w-xl">
            All your housing-related bills in one place. PayNow or card, full breakdown, downloadable
            receipts.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-3 text-sm text-stone cursor-pointer select-none">
            <span className="text-[11px] tracking-widest uppercase">Auto-pay</span>
            <button
              type="button"
              role="switch"
              aria-checked={autoPay}
              onClick={() => setAutoPay((v) => !v)}
              className={`relative w-11 h-6 transition-colors ${
                autoPay ? 'bg-terracotta' : 'bg-warm-gray/40'
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-warm-white transition-transform ${
                  autoPay ? 'translate-x-[22px]' : 'translate-x-0.5'
                }`}
              />
            </button>
          </label>
          {outstanding > 0 && (
            <Button onClick={() => setOpenInvoiceIds(active.filter((i) => i.amount > 0).map((i) => i.id))}>
              Pay all outstanding
            </Button>
          )}
        </div>
      </header>

      <section>
        <div className="hidden md:block bg-warm-white border border-warm-gray/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-sand text-[10px] tracking-widest uppercase text-stone">
                <th className="text-left font-medium px-5 py-3">Description</th>
                <th className="text-left font-medium px-5 py-3">Period</th>
                <th className="text-right font-medium px-5 py-3">Amount</th>
                <th className="text-right font-medium px-5 py-3">Tax</th>
                <th className="text-right font-medium px-5 py-3">Balance</th>
                <th className="text-left font-medium px-5 py-3">Due</th>
                <th className="text-left font-medium px-5 py-3">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {active.map((i) => (
                <tr key={i.id} className="border-t border-warm-gray/15 hover:bg-sand/40 transition-colors">
                  <td className="px-5 py-4 text-charcoal">{i.description}</td>
                  <td className="px-5 py-4 text-stone">{i.period}</td>
                  <td className="px-5 py-4 text-right tabular-nums">{formatCurrency(i.amount)}</td>
                  <td className="px-5 py-4 text-right tabular-nums text-stone">{formatCurrency(i.tax)}</td>
                  <td className="px-5 py-4 text-right tabular-nums font-medium">
                    {formatCurrency(i.status === 'waived' ? 0 : i.amount)}
                  </td>
                  <td className="px-5 py-4 text-stone">{formatDate(i.due_date)}</td>
                  <td className="px-5 py-4">
                    <StatusPill status={i.status} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    {i.status === 'unpaid' || i.status === 'overdue' ? (
                      <button
                        onClick={() => setOpenInvoiceIds([i.id])}
                        className="text-xs font-medium tracking-wide uppercase text-terracotta hover:text-terracotta-dark transition-colors"
                      >
                        Pay now
                      </button>
                    ) : (
                      <span className="text-xs text-stone tracking-wide uppercase">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-3">
          {active.map((i) => (
            <div key={i.id} className="bg-warm-white border border-warm-gray/30 p-5">
              <div className="flex justify-between gap-3">
                <div>
                  <h3 className="text-sm font-medium text-charcoal">{i.description}</h3>
                  <p className="text-xs text-stone mt-0.5">{i.period}</p>
                </div>
                <StatusPill status={i.status} />
              </div>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <div className="font-display text-2xl text-charcoal leading-none">
                    {formatCurrency(i.amount)}
                  </div>
                  <p className="text-[11px] text-stone mt-1">Due {formatDate(i.due_date)}</p>
                </div>
                {(i.status === 'unpaid' || i.status === 'overdue') && (
                  <Button size="sm" onClick={() => setOpenInvoiceIds([i.id])}>
                    Pay now
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <SectionLabel>Payment history</SectionLabel>
        <div className="bg-sand/50 border border-warm-gray/20">
          <ul className="divide-y divide-warm-gray/15">
            {history.map((i) => (
              <li key={i.id} className="flex items-center gap-4 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-charcoal">{i.description}</p>
                  <p className="text-xs text-stone mt-0.5">
                    Paid {i.paid_at ? formatDate(i.paid_at) : ''} · {i.period}
                  </p>
                </div>
                <div className="font-display text-lg text-charcoal tabular-nums">
                  {formatCurrency(i.amount)}
                </div>
                <a
                  href={i.receipt_url ?? '#'}
                  className="inline-flex items-center gap-1.5 text-xs tracking-wide uppercase text-stone hover:text-terracotta transition-colors"
                >
                  <Download size={14} strokeWidth={1.5} />
                  Receipt
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PaymentModal
        open={openInvoiceIds !== null && selected.length > 0}
        onClose={() => setOpenInvoiceIds(null)}
        invoices={selected}
      />
    </div>
  )
}
