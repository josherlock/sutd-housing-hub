'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { Check, CreditCard, QrCode } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import type { Invoice } from '@/lib/data/mock-payments'

interface PaymentModalProps {
  open: boolean
  onClose: () => void
  invoices: Invoice[]
}

type Method = 'paynow' | 'card'

export default function PaymentModal({ open, onClose, invoices }: PaymentModalProps) {
  const [method, setMethod] = useState<Method>('paynow')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const total = invoices.reduce((sum, i) => sum + i.amount, 0)

  function reset() {
    setDone(false)
    setSubmitting(false)
    setMethod('paynow')
  }

  function handleClose() {
    onClose()
    setTimeout(reset, 200)
  }

  function confirm() {
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setDone(true)
    }, 900)
  }

  return (
    <Modal open={open} onClose={handleClose} title={done ? 'Payment confirmed' : 'Pay invoices'} size="md">
      {done ? (
        <div className="text-center py-6">
          <div className="w-14 h-14 mx-auto bg-success-bg text-success-text flex items-center justify-center">
            <Check size={28} strokeWidth={1.5} />
          </div>
          <p className="mt-5 font-display text-2xl text-charcoal">
            {formatCurrency(total)} received.
          </p>
          <p className="mt-2 text-sm text-stone">
            A receipt has been emailed to you. You can also find it in payment history.
          </p>
          <div className="mt-8">
            <Button onClick={handleClose} variant="outline" fullWidth>
              Close
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <p className="text-[11px] tracking-widest uppercase text-stone">Selected invoices</p>
            <ul className="divide-y divide-warm-gray/15 border border-warm-gray/20">
              {invoices.map((i) => (
                <li key={i.id} className="flex items-center justify-between px-4 py-3 text-sm">
                  <span className="text-charcoal">{i.description}</span>
                  <span className="font-medium text-charcoal">{formatCurrency(i.amount)}</span>
                </li>
              ))}
              <li className="flex items-center justify-between px-4 py-3 bg-sand">
                <span className="text-[11px] tracking-widest uppercase text-stone">Total</span>
                <span className="font-display text-2xl text-charcoal leading-none">
                  {formatCurrency(total)}
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-[11px] tracking-widest uppercase text-stone">Payment method</p>
            <div className="grid grid-cols-2 gap-3">
              <MethodCard
                active={method === 'paynow'}
                onClick={() => setMethod('paynow')}
                title="PayNow"
                sub="Scan a QR code with your bank app"
                icon={QrCode}
              />
              <MethodCard
                active={method === 'card'}
                onClick={() => setMethod('card')}
                title="Card"
                sub="Visa, Mastercard, Amex"
                icon={CreditCard}
              />
            </div>
          </div>

          {method === 'paynow' && (
            <div className="mt-6 flex flex-col items-center bg-sand p-6">
              <div className="w-44 h-44 bg-warm-white border border-warm-gray/30 flex items-center justify-center text-stone">
                <QrCode size={120} strokeWidth={0.6} />
              </div>
              <p className="mt-4 text-xs text-stone text-center max-w-xs">
                Open your bank app, scan this code, and confirm the amount. We will mark the invoice
                as paid as soon as the transfer lands.
              </p>
            </div>
          )}

          {method === 'card' && (
            <div className="mt-6 space-y-3">
              <input className="input-base" placeholder="Card number" />
              <div className="grid grid-cols-2 gap-3">
                <input className="input-base" placeholder="MM / YY" />
                <input className="input-base" placeholder="CVC" />
              </div>
              <input className="input-base" placeholder="Cardholder name" />
            </div>
          )}

          <div className="mt-8 flex gap-3 justify-end">
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={confirm} disabled={submitting}>
              {submitting ? 'Processing' : `Pay ${formatCurrency(total)}`}
            </Button>
          </div>
        </>
      )}
    </Modal>
  )
}

function MethodCard({
  active,
  onClick,
  title,
  sub,
  icon: Icon,
}: {
  active: boolean
  onClick: () => void
  title: string
  sub: string
  icon: typeof CreditCard
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-start gap-2 p-4 border text-left transition-all ${
        active
          ? 'border-terracotta bg-terracotta/5'
          : 'border-warm-gray/30 hover:border-warm-gray/60'
      }`}
    >
      <Icon size={18} strokeWidth={1.5} className={active ? 'text-terracotta' : 'text-stone'} />
      <div>
        <div className="text-sm font-medium text-charcoal">{title}</div>
        <div className="text-xs text-stone mt-0.5">{sub}</div>
      </div>
    </button>
  )
}
