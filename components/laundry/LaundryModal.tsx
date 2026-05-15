'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { cycleTypes, type CycleType, type CycleTypeId, type LaundryMachine } from '@/lib/data/mock-laundry'
import { activateMachine } from '@/lib/laundry-relay'
import { Check, QrCode, Wallet, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'

type Step = 1 | 2 | 3

interface LaundryModalProps {
  open: boolean
  machine: LaundryMachine | null
  balance: number
  onClose: () => void
  onActivated: (params: { machine: LaundryMachine; cycle: CycleType; method: PaymentMethod }) => void
}

type PaymentMethod = 'paynow' | 'balance'

export default function LaundryModal({ open, machine, balance, onClose, onActivated }: LaundryModalProps) {
  const [step, setStep] = useState<Step>(1)
  const [cycleId, setCycleId] = useState<CycleTypeId>('standard')
  const [method, setMethod] = useState<PaymentMethod>('paynow')
  const [activating, setActivating] = useState(false)
  const [activated, setActivated] = useState(false)

  useEffect(() => {
    if (open) {
      setStep(1)
      setCycleId('standard')
      setMethod('paynow')
      setActivating(false)
      setActivated(false)
    }
  }, [open, machine?.id])

  const cycle = cycleTypes.find((c) => c.id === cycleId) ?? cycleTypes[1]!
  const insufficient = method === 'balance' && balance < cycle.price

  if (!machine) return null

  async function handleConfirmPayment() {
    if (!machine || insufficient) return
    setStep(3)
    setActivating(true)
    await activateMachine(machine.id)
    setActivating(false)
    setActivated(true)
    setTimeout(() => {
      onActivated({ machine: machine!, cycle, method })
    }, 1400)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      title={
        activated
          ? `Machine ${machine.machine_number} is ready`
          : step === 1
          ? `Machine ${machine.machine_number}`
          : step === 2
          ? 'Payment'
          : 'Activating'
      }
      description={
        !activated
          ? `${machine.machine_type === 'washer' ? 'Washer' : 'Dryer'} · ${machine.floor}, ${machine.block}`
          : undefined
      }
    >
      <Stepper step={step} />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div>
              <p className="text-[11px] tracking-widest uppercase text-stone mb-3">Pick a cycle</p>
              <div className="space-y-2">
                {cycleTypes.map((c) => {
                  const active = c.id === cycleId
                  return (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => setCycleId(c.id)}
                      className={`w-full flex items-center justify-between gap-4 p-4 border text-left transition-all ${
                        active
                          ? 'border-terracotta bg-terracotta/5'
                          : 'border-warm-gray/30 hover:border-warm-gray/60 bg-warm-white'
                      }`}
                    >
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            active ? 'text-terracotta-dark' : 'text-charcoal'
                          }`}
                        >
                          {c.label}
                        </p>
                        <p className="text-[11px] text-stone mt-1">{c.minutes} minutes</p>
                      </div>
                      <p
                        className={`font-display text-2xl leading-none tabular-nums ${
                          active ? 'text-terracotta-dark' : 'text-charcoal'
                        }`}
                      >
                        ${c.price.toFixed(2)}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={() => setStep(2)}>
                Proceed to payment
                <ArrowRight size={14} strokeWidth={1.5} />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="bg-sand/60 border border-warm-gray/20 p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] tracking-widest uppercase text-stone">Total</p>
                <p className="font-display text-3xl text-charcoal leading-none mt-1">
                  ${cycle.price.toFixed(2)}
                </p>
                <p className="text-[11px] text-stone mt-2">
                  {cycle.label}, {cycle.minutes} minutes
                </p>
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-[11px] tracking-widest uppercase text-stone hover:text-terracotta transition-colors inline-flex items-center gap-1"
              >
                <ArrowLeft size={11} strokeWidth={1.5} />
                Change
              </button>
            </div>

            <div>
              <p className="text-[11px] tracking-widest uppercase text-stone mb-3">Pay with</p>
              <div className="grid grid-cols-2 gap-3">
                <PaymentTile
                  active={method === 'paynow'}
                  onClick={() => setMethod('paynow')}
                  icon={QrCode}
                  title="PayNow"
                  sub="Scan with your bank app"
                />
                <PaymentTile
                  active={method === 'balance'}
                  onClick={() => setMethod('balance')}
                  icon={Wallet}
                  title="In-app balance"
                  sub={`$${balance.toFixed(2)} available`}
                  disabled={balance <= 0}
                />
              </div>
            </div>

            {method === 'paynow' && (
              <div className="bg-sand p-6 flex flex-col items-center">
                <div className="w-40 h-40 bg-warm-white border border-warm-gray/30 flex items-center justify-center text-stone">
                  <QrCode size={120} strokeWidth={0.6} />
                </div>
                <p className="mt-3 text-[11px] tracking-wide text-stone text-center max-w-xs">
                  Scan with your banking app. Reference auto-filled. We will mark this paid the
                  moment your transfer lands.
                </p>
              </div>
            )}

            {method === 'balance' && (
              <div className="bg-sand/60 border border-warm-gray/20 p-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] tracking-widest uppercase text-stone">After this wash</p>
                  <p className="font-display text-2xl text-charcoal leading-none mt-1">
                    ${(balance - cycle.price).toFixed(2)}
                  </p>
                </div>
                {insufficient && (
                  <span className="text-[11px] text-terracotta-dark tracking-wide">
                    Balance too low
                  </span>
                )}
              </div>
            )}

            <p className="text-[11px] text-stone leading-relaxed">
              Once confirmed, your machine will activate within seconds.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="ghost" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleConfirmPayment} disabled={insufficient}>
                {method === 'paynow' ? 'I have paid' : 'Confirm payment'}
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-center py-6"
          >
            {activating ? (
              <>
                <div className="inline-flex w-14 h-14 items-center justify-center">
                  <Loader2 size={36} strokeWidth={1.5} className="text-terracotta animate-spin" />
                </div>
                <p className="font-display text-2xl text-charcoal mt-5">Activating machine</p>
                <p className="text-sm text-stone mt-2">
                  Closing the relay, this takes a couple of seconds.
                </p>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex w-16 h-16 items-center justify-center bg-success-bg text-success-text"
                >
                  <Check size={32} strokeWidth={1.5} />
                </motion.div>
                <p className="font-display text-3xl text-charcoal mt-5">
                  Machine {machine.machine_number} is ready.
                </p>
                <p className="text-sm text-stone mt-3 max-w-sm mx-auto">
                  Your {cycle.label.toLowerCase()} cycle is now running. We will ping you a few
                  minutes before it finishes and again when it is done.
                </p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  )
}

function Stepper({ step }: { step: Step }) {
  const items: { n: Step; label: string }[] = [
    { n: 1, label: 'Confirm' },
    { n: 2, label: 'Payment' },
    { n: 3, label: 'Ready' },
  ]
  return (
    <ol className="flex items-center gap-2 mb-6">
      {items.map((it, i) => {
        const reached = step >= it.n
        const active = step === it.n
        return (
          <li key={it.n} className="flex items-center gap-2 flex-1">
            <span
              className={`w-6 h-6 flex items-center justify-center text-[11px] font-medium border ${
                reached
                  ? 'bg-terracotta text-warm-white border-terracotta'
                  : 'bg-warm-white text-warm-gray border-warm-gray/40'
              }`}
            >
              {it.n}
            </span>
            <span
              className={`text-[10px] tracking-widest uppercase ${
                active ? 'text-terracotta' : reached ? 'text-stone' : 'text-warm-gray'
              }`}
            >
              {it.label}
            </span>
            {i < items.length - 1 && (
              <span
                className={`flex-1 h-px ${
                  step > it.n ? 'bg-terracotta/50' : 'bg-warm-gray/30'
                }`}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}

function PaymentTile({
  active,
  onClick,
  icon: Icon,
  title,
  sub,
  disabled,
}: {
  active: boolean
  onClick: () => void
  icon: typeof QrCode
  title: string
  sub: string
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col items-start gap-2 p-4 border text-left transition-all ${
        disabled
          ? 'opacity-50 cursor-not-allowed border-warm-gray/30'
          : active
          ? 'border-terracotta bg-terracotta/5'
          : 'border-warm-gray/30 hover:border-warm-gray/60 bg-warm-white'
      }`}
    >
      <Icon size={16} strokeWidth={1.5} className={active ? 'text-terracotta' : 'text-stone'} />
      <div>
        <p className="text-sm font-medium text-charcoal">{title}</p>
        <p className="text-[11px] text-stone mt-0.5">{sub}</p>
      </div>
    </button>
  )
}
