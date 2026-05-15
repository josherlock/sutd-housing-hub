'use client'

import { useEffect, useState } from 'react'
import type { LaundryMachine } from '@/lib/data/mock-laundry'
import { WashingMachine, Wind, AlertTriangle, Wrench } from 'lucide-react'
import Link from 'next/link'

interface MachineCardProps {
  machine: LaundryMachine
  onBook: (machine: LaundryMachine) => void
}

function useTick(intervalMs: number = 30_000) {
  const [now, setNow] = useState<number>(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
}

function minutesRemaining(cycleEndsAt: string | null, now: number) {
  if (!cycleEndsAt) return null
  const diffMs = new Date(cycleEndsAt).getTime() - now
  return Math.max(0, Math.ceil(diffMs / 60_000))
}

export default function MachineCard({ machine, onBook }: MachineCardProps) {
  const now = useTick(30_000)
  const Icon = machine.machine_type === 'washer' ? WashingMachine : Wind
  const remaining = minutesRemaining(machine.cycle_ends_at, now)
  const totalCycle = 45
  const progress = remaining !== null ? Math.max(0, Math.min(100, ((totalCycle - remaining) / totalCycle) * 100)) : 0

  if (machine.status === 'available') {
    return (
      <button
        type="button"
        onClick={() => onBook(machine)}
        className="group relative w-full text-left bg-cream border border-warm-gray/30 hover:border-terracotta/60 transition-all duration-300 p-5 flex flex-col gap-4 border-l-2 border-l-terracotta"
      >
        <Header machine={machine} Icon={Icon} />
        <div className="flex items-end justify-between">
          <span className="text-[11px] tracking-widest uppercase text-success-text">
            Available
          </span>
          <span className="text-xs text-stone">${machine.price_sgd.toFixed(2)}</span>
        </div>
        <span className="absolute bottom-5 right-5 text-[11px] tracking-widest uppercase text-terracotta opacity-0 group-hover:opacity-100 transition-opacity">
          Book
        </span>
      </button>
    )
  }

  if (machine.status === 'running') {
    return (
      <div
        className={`relative bg-sand border p-5 flex flex-col gap-4 transition-colors ${
          machine.is_mine
            ? 'border-l-2 border-l-terracotta border-y-warm-gray/30 border-r-warm-gray/30'
            : 'border-warm-gray/30'
        }`}
      >
        {machine.is_mine && (
          <span className="absolute top-3 right-3 text-[10px] tracking-widest uppercase text-terracotta bg-terracotta/10 px-2 py-0.5 border border-terracotta/30">
            Your machine
          </span>
        )}
        <Header machine={machine} Icon={Icon} muted />
        <div>
          <p className="font-display text-2xl text-charcoal leading-none">
            {remaining === null ? '~' : remaining === 0 ? 'Finishing' : `~${remaining}m`}
            <span className="font-sans text-[11px] tracking-widest uppercase text-stone ml-2 align-middle">
              left
            </span>
          </p>
          <div className="mt-3 h-1 bg-warm-gray/25 overflow-hidden">
            <div
              className="h-full bg-terracotta/70 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    )
  }

  // out_of_order
  return (
    <div className="relative bg-warm-gray/10 border border-warm-gray/30 p-5 flex flex-col gap-4">
      <Header machine={machine} Icon={Icon} muted strikethrough />
      <div>
        <p className="inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-stone">
          <AlertTriangle size={12} strokeWidth={1.5} className="text-terracotta-dark" />
          Out of order
        </p>
        {machine.fault_note && (
          <p className="text-xs text-warm-gray mt-2 leading-relaxed">{machine.fault_note}</p>
        )}
        <Link
          href="/maintenance/new"
          className="mt-3 inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-stone hover:text-terracotta transition-colors"
        >
          <Wrench size={11} strokeWidth={1.5} />
          View report
        </Link>
      </div>
    </div>
  )
}

function Header({
  machine,
  Icon,
  muted,
  strikethrough,
}: {
  machine: LaundryMachine
  Icon: typeof WashingMachine
  muted?: boolean
  strikethrough?: boolean
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`w-10 h-10 flex items-center justify-center shrink-0 ${
          muted ? 'bg-warm-white text-warm-gray' : 'bg-warm-white text-terracotta border border-warm-gray/30'
        }`}
      >
        <Icon size={18} strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`font-display text-3xl leading-none ${
            muted ? 'text-stone' : 'text-charcoal'
          } ${strikethrough ? 'line-through decoration-warm-gray/60' : ''}`}
        >
          {machine.machine_number}
        </p>
        <p className="text-[10px] tracking-widest uppercase text-stone mt-2">
          {machine.machine_type === 'washer' ? 'Washer' : 'Dryer'}
        </p>
      </div>
    </div>
  )
}
