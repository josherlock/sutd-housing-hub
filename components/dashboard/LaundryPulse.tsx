'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { useNow, formatRemaining } from '@/components/laundry/useNow'
import { mockMachines, mockRooms } from '@/lib/data/mock-laundry'
import { ArrowRight, WashingMachine } from 'lucide-react'

export default function LaundryPulse({ block }: { block: string }) {
  const now = useNow(15_000)
  const room = mockRooms.find((r) => r.block === block) ?? mockRooms[0]!

  const summary = useMemo(() => {
    const machines = mockMachines.filter((m) => m.room_id === room.id)
    let free = 0
    let nextFree: number | null = null
    let mineRemaining: number | null = null
    for (const m of machines) {
      if (m.state === 'available') {
        free++
        continue
      }
      if (m.state === 'in_use' && m.started_at && m.duration_minutes) {
        const elapsed = (now - new Date(m.started_at).getTime()) / 60_000
        const remaining = Math.max(0, m.duration_minutes - elapsed)
        if (remaining <= 0) {
          free++
        } else {
          if (nextFree === null || remaining < nextFree) nextFree = remaining
          if (m.is_mine) mineRemaining = remaining
        }
      }
    }
    return { free, total: machines.length, nextFree, mineRemaining }
  }, [room.id, now])

  const headline = summary.mineRemaining !== null
    ? `Your wash, ${formatRemaining(summary.mineRemaining)} left`
    : summary.free > 0
    ? `${summary.free} machine${summary.free === 1 ? '' : 's'} free`
    : summary.nextFree !== null
    ? `Free in ${Math.max(1, Math.round(summary.nextFree))}m`
    : 'All busy'

  return (
    <Link
      href="/laundry"
      className="group flex items-center gap-5 p-5 bg-warm-white border border-warm-gray/30 hover:border-warm-gray/60 transition-all"
    >
      <div className="w-16 h-16 bg-success-bg/60 text-success-text flex flex-col items-center justify-center shrink-0">
        <span className="font-display text-xl leading-none">{summary.free}</span>
        <span className="text-[9px] tracking-widest uppercase mt-1 opacity-80">free</span>
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[10px] tracking-widest uppercase text-terracotta">Laundry, Block {room.block}</span>
        <h3 className="font-display text-lg text-charcoal leading-tight mt-1">{headline}</h3>
        <p className="text-xs text-stone mt-1 flex items-center gap-1.5 flex-wrap">
          <WashingMachine size={11} strokeWidth={1.5} />
          {summary.total} machines tracked
          {summary.nextFree !== null && summary.free === 0 && (
            <>
              <span>·</span>
              <span>Next ready in {Math.max(1, Math.round(summary.nextFree))}m</span>
            </>
          )}
        </p>
      </div>
      <ArrowRight size={16} strokeWidth={1.5} className="text-warm-gray group-hover:translate-x-0.5 transition-transform shrink-0" />
    </Link>
  )
}
