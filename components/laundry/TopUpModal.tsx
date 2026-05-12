'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'
import { Check, QrCode, CreditCard, Smartphone } from 'lucide-react'

type Method = 'paynow' | 'paylah' | 'card'

interface TopUpModalProps {
  open: boolean
  onClose: () => void
  onComplete: (amount: number, method: Method) => void
}

const amounts = [10, 20, 30, 50]

export default function TopUpModal({ open, onClose, onComplete }: TopUpModalProps) {
  const [amount, setAmount] = useState(20)
  const [method, setMethod] = useState<Method>('paynow')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  function reset() {
    setAmount(20)
    setMethod('paynow')
    setSubmitting(false)
    setDone(false)
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
      setTimeout(() => {
        onComplete(amount, method)
        handleClose()
      }, 900)
    }, 800)
  }

  return (
    <Modal open={open} onClose={handleClose} title={done ? 'Top up confirmed' : 'Top up wallet'} size="md">
      {done ? (
        <div className="text-center py-6">
          <div className="w-14 h-14 mx-auto bg-success-bg text-success-text flex items-center justify-center">
            <Check size={28} strokeWidth={1.5} />
          </div>
          <p className="mt-5 font-display text-2xl text-charcoal">
            {formatCurrency(amount)} added.
          </p>
          <p className="mt-2 text-sm text-stone">Ready to spin.</p>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            <div>
              <p className="text-[11px] tracking-widest uppercase text-stone mb-3">Amount</p>
              <div className="grid grid-cols-4 gap-2">
                {amounts.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAmount(a)}
                    className={`p-3 border transition-all ${
                      amount === a
                        ? 'border-terracotta bg-terracotta/5'
                        : 'border-warm-gray/30 hover:border-warm-gray/60 bg-warm-white'
                    }`}
                  >
                    <span className={`font-display text-xl ${amount === a ? 'text-terracotta-dark' : 'text-charcoal'}`}>
                      {formatCurrency(a)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] tracking-widest uppercase text-stone mb-3">Method</p>
              <div className="grid grid-cols-3 gap-2">
                <MethodCard
                  active={method === 'paynow'}
                  onClick={() => setMethod('paynow')}
                  title="PayNow"
                  sub="Scan QR"
                  icon={QrCode}
                />
                <MethodCard
                  active={method === 'paylah'}
                  onClick={() => setMethod('paylah')}
                  title="PayLah"
                  sub="DBS, OCBC"
                  icon={Smartphone}
                />
                <MethodCard
                  active={method === 'card'}
                  onClick={() => setMethod('card')}
                  title="Card"
                  sub="Visa, Master"
                  icon={CreditCard}
                />
              </div>
            </div>

            {method === 'paynow' && (
              <div className="flex flex-col items-center bg-sand p-6">
                <div className="w-44 h-44 bg-warm-white border border-warm-gray/30 flex items-center justify-center text-stone">
                  <QrCode size={120} strokeWidth={0.6} />
                </div>
                <p className="mt-3 text-xs text-stone text-center max-w-xs">
                  Scan with your bank app. Reference is auto-filled. The wallet credits in seconds.
                </p>
              </div>
            )}
            {method === 'paylah' && (
              <div className="bg-sand p-6 text-center">
                <p className="text-sm text-charcoal">
                  We will redirect you to PayLah to confirm a transfer of {formatCurrency(amount)}.
                </p>
              </div>
            )}
            {method === 'card' && (
              <div className="space-y-3">
                <input className="input-base" placeholder="Card number" />
                <div className="grid grid-cols-2 gap-3">
                  <input className="input-base" placeholder="MM / YY" />
                  <input className="input-base" placeholder="CVC" />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="ghost" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={confirm} disabled={submitting}>
                {submitting ? 'Processing' : `Top up ${formatCurrency(amount)}`}
              </Button>
            </div>
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
  icon: typeof QrCode
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
      <Icon size={16} strokeWidth={1.5} className={active ? 'text-terracotta' : 'text-stone'} />
      <div>
        <div className="text-sm font-medium text-charcoal">{title}</div>
        <div className="text-[11px] text-stone mt-0.5">{sub}</div>
      </div>
    </button>
  )
}
