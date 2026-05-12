'use client'

import { useMemo } from 'react'
import { useNow, formatRemaining } from './useNow'
import { getCycleType, type Machine } from '@/lib/data/mock-laundry'
import { WashingMachine, Wind, AlertTriangle, Lock, Clock, Wrench } from 'lucide-react'
import Link from 'next/link'

interface MachineCardProps {
  machine: Machine
  onUseNow: (m: Machine) => void
  onBook: (m: Machine) => void
}

const stateMeta: Record<
  Machine['state'],
  { label: string; cls: string; ringCls: string }
> = {
  available: {
    label: 'Free',
    cls: 'border-success-text/40 bg-success-bg/60',
    ringCls: 'text-success-text',
  },
  in_use: {
    label: 'Running',
    cls: 'border-terracotta/40 bg-terracotta/5',
    ringCls: 'text-terracotta',
  },
  finishing: {
    label: 'Finishing',
    cls: 'border-terracotta/60 bg-terracotta/10',
    ringCls: 'text-terracotta-dark',
  },
  reserved: {
    label: 'Reserved',
    cls: 'border-warm-gray/40 bg-sand',
    ringCls: 'text-stone',
  },
  out_of_order: {
    label: 'Broken',
    cls: 'border-terracotta-dark/40 bg-terracotta-dark/10',
    ringCls: 'text-terracotta-dark',
  },
}

export default function MachineCard({ machine, onUseNow, onBook }: MachineCardProps) {
  const now = useNow(5000)
  const cycle = getCycleType(machine.cycle_id)

  const { remainingMin, progress, derivedState } = useMemo(() => {
    if (machine.state !== 'in_use' || !machine.started_at || !machine.duration_minutes) {
      return { remainingMin: null as number | null, progress: 0, derivedState: machine.state }
    }
    const startedMs = new Date(machine.started_at).getTime()
    const elapsedMin = (now - startedMs) / 60_000
    const remaining = Math.max(0, machine.duration_minutes - elapsedMin)
    const pct = Math.min(100, (elapsedMin / machine.duration_minutes) * 100)
    const derived: Machine['state'] = remaining <= 0 ? 'available' : remaining < 5 ? 'finishing' : 'in_use'
    return { remainingMin: remaining, progress: pct, derivedState: derived }
  }, [machine, now])

  const meta = stateMeta[derivedState]
  const Icon = machine.kind === 'washer' ? WashingMachine : Wind

  return (
    <div className={`relative bg-warm-white border ${meta.cls} p-5 flex flex-col gap-4 transition-all`}>
      {machine.is_mine && (
        <span className="absolute top-3 right-3 text-[10px] tracking-widest uppercase text-terracotta">
          Mine
        </span>
      )}
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 bg-warm-white border ${meta.cls} flex items-center justify-center shrink-0`}>
          <Icon size={22} strokeWidth={1.5} className={meta.ringCls} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-charcoal">{machine.label}</h3>
          <p className="text-[11px] tracking-widest uppercase text-stone mt-0.5">
            {machine.kind === 'washer' ? 'Washer' : 'Dryer'} · {meta.label}
          </p>
        </div>
      </div>

      <div className="min-h-[60px] flex items-center">
        {derivedState === 'in_use' && remainingMin !== null && (
          <div className="w-full">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-3xl text-charcoal leading-none">
                {formatRemaining(remainingMin)}
              </span>
              <span className="text-[10px] tracking-widest uppercase text-stone">
                {cycle?.label ?? 'Cycle'}
              </span>
            </div>
            <div className="mt-3 h-1 bg-warm-gray/20 overflow-hidden">
              <div
                className="h-full bg-terracotta transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
        {derivedState === 'finishing' && (
          <div>
            <span className="font-display text-2xl text-terracotta-dark leading-none">
              {remainingMin !== null && formatRemaining(remainingMin)}
            </span>
            <p className="text-xs text-stone mt-1">Wrap up soon, free in a moment.</p>
          </div>
        )}
        {derivedState === 'available' && (
          <p className="text-sm text-stone">
            {cycle ? `Last cycle, ${cycle.label.toLowerCase()}.` : 'Ready when you are.'}
          </p>
        )}
        {derivedState === 'reserved' && (
          <div className="flex items-center gap-2 text-sm text-stone">
            <Lock size={14} strokeWidth={1.5} />
            <span>
              Held for {machine.reserved_by ?? 'someone'}
              {machine.reserved_for && ` at ${new Date(machine.reserved_for).toLocaleTimeString('en-SG', { hour: 'numeric', minute: '2-digit', hour12: true })}`}
            </span>
          </div>
        )}
        {derivedState === 'out_of_order' && (
          <div className="flex items-start gap-2 text-sm text-stone">
            <AlertTriangle size={14} strokeWidth={1.5} className="text-terracotta-dark mt-0.5 shrink-0" />
            <span>{machine.fault_note ?? 'Reported broken, awaiting fix.'}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-warm-gray/15">
        {derivedState === 'available' && (
          <>
            <button
              onClick={() => onUseNow(machine)}
              className="flex-1 inline-flex items-center justify-center bg-terracotta text-warm-white text-xs font-medium tracking-wide uppercase px-3 py-2 hover:bg-terracotta-dark transition-colors"
            >
              Use now
            </button>
            <button
              onClick={() => onBook(machine)}
              className="inline-flex items-center justify-center gap-1.5 border border-warm-gray/40 text-xs font-medium tracking-wide uppercase px-3 py-2 text-stone hover:border-warm-gray/70 hover:text-charcoal transition-colors"
            >
              <Clock size={12} strokeWidth={1.5} />
              Book
            </button>
          </>
        )}
        {(derivedState === 'in_use' || derivedState === 'finishing') && (
          <button
            onClick={() => onBook(machine)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 border border-warm-gray/40 text-xs font-medium tracking-wide uppercase px-3 py-2 text-stone hover:border-warm-gray/70 hover:text-charcoal transition-colors"
          >
            <Clock size={12} strokeWidth={1.5} />
            Reserve next slot
          </button>
        )}
        {derivedState === 'reserved' && (
          <span className="flex-1 text-center text-[11px] tracking-widest uppercase text-stone py-2">
            Held for {machine.reserved_for && new Date(machine.reserved_for).toLocaleTimeString('en-SG', { hour: 'numeric', minute: '2-digit', hour12: true })}
          </span>
        )}
        {derivedState === 'out_of_order' ? (
          <Link
            href="/maintenance/new"
            className="flex-1 inline-flex items-center justify-center gap-1.5 border border-warm-gray/40 text-xs font-medium tracking-wide uppercase px-3 py-2 text-stone hover:border-warm-gray/70 hover:text-charcoal transition-colors"
          >
            <Wrench size={12} strokeWidth={1.5} />
            View report
          </Link>
        ) : (
          derivedState !== 'reserved' && (
            <Link
              href="/maintenance/new"
              aria-label="Report broken"
              className="inline-flex items-center justify-center w-9 h-9 border border-warm-gray/30 text-stone hover:text-terracotta-dark hover:border-terracotta/40 transition-colors"
            >
              <AlertTriangle size={14} strokeWidth={1.5} />
            </Link>
          )
        )}
      </div>
    </div>
  )
}
