'use client'

import { useMemo, useState, useEffect } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { cycleTypes, type Machine, type CycleType } from '@/lib/data/mock-laundry'
import { formatCurrency } from '@/lib/utils'
import { Check, Clock, Sparkles } from 'lucide-react'

interface BookingModalProps {
  open: boolean
  onClose: () => void
  machine: Machine | null
  mode: 'now' | 'schedule'
  balance: number
  onConfirm: (params: { machine: Machine; cycle: CycleType; startInMinutes: number }) => void
  onNeedTopUp: () => void
}

export default function BookingModal({
  open,
  onClose,
  machine,
  mode,
  balance,
  onConfirm,
  onNeedTopUp,
}: BookingModalProps) {
  const cycles = useMemo(
    () => cycleTypes.filter((c) => c.kind === machine?.kind),
    [machine?.kind],
  )
  const [cycleId, setCycleId] = useState(cycles[0]?.id ?? '')
  const [startInMinutes, setStartInMinutes] = useState(mode === 'now' ? 0 : 30)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (open) {
      setCycleId(cycles[0]?.id ?? '')
      setStartInMinutes(mode === 'now' ? 0 : 30)
      setDone(false)
      setSubmitting(false)
    }
  }, [open, mode, cycles])

  if (!machine) return null

  const cycle = cycles.find((c) => c.id === cycleId) ?? cycles[0]
  if (!cycle) return null
  const insufficient = balance < cycle.price

  function confirm() {
    if (!machine || !cycle) return
    if (insufficient) {
      onNeedTopUp()
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setDone(true)
      setTimeout(() => {
        onConfirm({ machine: machine!, cycle: cycle!, startInMinutes })
      }, 900)
    }, 600)
  }

  const timeSlots = mode === 'now' ? [0] : [15, 30, 45, 60, 90, 120, 180, 240]

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={done ? (mode === 'now' ? 'Cycle started' : 'Slot reserved') : mode === 'now' ? 'Start a cycle' : 'Reserve a slot'}
      size="md"
    >
      {done ? (
        <div className="text-center py-6">
          <div className="w-14 h-14 mx-auto bg-success-bg text-success-text flex items-center justify-center">
            <Check size={28} strokeWidth={1.5} />
          </div>
          <p className="mt-5 font-display text-2xl text-charcoal">
            {machine.label}, {cycle.label.toLowerCase()}
          </p>
          <p className="mt-2 text-sm text-stone">
            {mode === 'now'
              ? `We will ping you ${Math.max(1, Math.round(cycle.minutes - 3))} minutes in.`
              : `Hold lasts 10 minutes after start time. We will remind you.`}
          </p>
        </div>
      ) : (
        <>
          <div className="bg-sand p-4 -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-6 md:mb-8 px-6 md:px-8 py-5">
            <p className="text-[10px] tracking-widest uppercase text-stone">Machine</p>
            <p className="font-display text-2xl text-charcoal mt-1 leading-tight">
              {machine.label}
              <span className="text-stone text-sm font-sans tracking-wide ml-2">
                {machine.kind === 'washer' ? 'Washer' : 'Dryer'}
              </span>
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-[11px] tracking-widest uppercase text-stone mb-3">Cycle</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {cycles.map((c) => {
                  const active = c.id === cycleId
                  return (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => setCycleId(c.id)}
                      className={`text-left p-3 border transition-all ${
                        active
                          ? 'border-terracotta bg-terracotta/5'
                          : 'border-warm-gray/30 hover:border-warm-gray/60 bg-warm-white'
                      }`}
                    >
                      <p className={`text-sm font-medium ${active ? 'text-terracotta-dark' : 'text-charcoal'}`}>
                        {c.label}
                      </p>
                      <p className="text-[11px] text-stone mt-1">
                        {c.minutes} min · {formatCurrency(c.price)}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {mode === 'schedule' && (
              <div>
                <p className="text-[11px] tracking-widest uppercase text-stone mb-3">Start in</p>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map((t) => {
                    const active = t === startInMinutes
                    const label = t < 60 ? `${t}m` : `${Math.round(t / 60)}h${t % 60 ? ' ' + (t % 60) + 'm' : ''}`
                    return (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setStartInMinutes(t)}
                        className={`text-xs font-medium tracking-wide uppercase px-3 py-2 border transition-colors ${
                          active
                            ? 'border-charcoal bg-charcoal text-warm-white'
                            : 'border-warm-gray/30 text-stone hover:border-warm-gray/60'
                        }`}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
                <p className="text-[11px] text-stone mt-3">
                  We will hold the machine for 10 minutes after your start time. Forget to come down
                  and the slot opens up again.
                </p>
              </div>
            )}

            <div className="bg-sand/60 border border-warm-gray/20 p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] tracking-widest uppercase text-stone">Cost</p>
                <p className="font-display text-2xl text-charcoal leading-none mt-1">
                  {formatCurrency(cycle.price)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] tracking-widest uppercase text-stone">Wallet</p>
                <p className={`text-sm mt-1 ${insufficient ? 'text-terracotta-dark' : 'text-charcoal'}`}>
                  {formatCurrency(balance)}
                  {insufficient && ' · low'}
                </p>
              </div>
            </div>

            {insufficient && (
              <div className="bg-warning-bg border-l-2 border-terracotta px-4 py-3 text-sm text-stone">
                You need a top-up before this cycle can run.
              </div>
            )}

            <div className="flex gap-3 justify-end pt-2">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              {insufficient ? (
                <Button onClick={onNeedTopUp}>Top up wallet</Button>
              ) : (
                <Button onClick={confirm} disabled={submitting}>
                  {submitting ? 'Confirming' : mode === 'now' ? (
                    <>
                      <Sparkles size={14} strokeWidth={1.5} />
                      Start now
                    </>
                  ) : (
                    <>
                      <Clock size={14} strokeWidth={1.5} />
                      Reserve
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </Modal>
  )
}
