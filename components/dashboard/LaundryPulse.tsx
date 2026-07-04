'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { mockMachines, mockMyActiveSession } from '@/lib/data/mock-laundry'
import { useNow } from '@/lib/hooks/use-now'
import { ArrowRight, WashingMachine } from 'lucide-react'

export default function LaundryPulse() {
  // null during SSR/hydration so server and client markup match; time-based
  // details fill in after mount.
  const now = useNow()

  const summary = useMemo(() => {
    let free = 0
    let nextFree: number | null = null
    let mineRemaining: number | null = null

    for (const m of mockMachines) {
      if (m.status === 'available') {
        free++
        continue
      }
      if (now !== null && m.status === 'running' && m.cycle_ends_at) {
        const remaining = Math.max(0, (new Date(m.cycle_ends_at).getTime() - now.getTime()) / 60_000)
        if (remaining <= 0) {
          free++
        } else {
          if (nextFree === null || remaining < nextFree) nextFree = remaining
          if (m.is_mine) mineRemaining = remaining
        }
      }
    }

    return { free, total: mockMachines.length, nextFree, mineRemaining }
  }, [now])

  const headline =
    summary.mineRemaining !== null
      ? `Your cycle, ${Math.max(0, Math.round(summary.mineRemaining))}m left`
      : summary.free > 0
      ? `${summary.free} machine${summary.free === 1 ? '' : 's'} free`
      : summary.nextFree !== null
      ? `Free in ${Math.max(1, Math.round(summary.nextFree))}m`
      : 'All busy'

  const yourCycle = summary.mineRemaining !== null

  return (
    <Link
      href="/laundry"
      className={`group flex items-center gap-5 p-5 border transition-all duration-300 ${
        yourCycle
          ? 'bg-terracotta/10 border-terracotta/40 hover:border-terracotta/60'
          : 'bg-warm-white border-warm-gray/30 hover:border-warm-gray/60'
      }`}
    >
      <div
        className={`w-12 h-12 flex items-center justify-center shrink-0 ${
          yourCycle ? 'bg-terracotta text-warm-white' : 'bg-sand text-charcoal'
        }`}
      >
        <WashingMachine size={20} strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] tracking-widest uppercase text-stone/80">Laundry</p>
        <p
          className={`font-display text-3xl leading-none mt-1 ${
            yourCycle ? 'text-terracotta-dark' : 'text-charcoal'
          }`}
        >
          {headline}
        </p>
        <p className="text-xs text-stone mt-1.5">
          {summary.total} machines tracked
          {!yourCycle && summary.nextFree !== null && summary.free === 0 && (
            <>
              {' · '}
              Next ready in {Math.max(1, Math.round(summary.nextFree))}m
            </>
          )}
          {!yourCycle && mockMyActiveSession === null && summary.free > 0 && (
            <>
              {' · '}
              Tap to start a wash
            </>
          )}
        </p>
      </div>
      <ArrowRight
        size={16}
        strokeWidth={1.5}
        className={`shrink-0 transition-transform group-hover:translate-x-0.5 ${
          yourCycle ? 'text-terracotta' : 'text-warm-gray'
        }`}
      />
    </Link>
  )
}
