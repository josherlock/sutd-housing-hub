'use client'

import { useMemo, useState } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import MachineGrid from './MachineGrid'
import LaundryModal from './LaundryModal'
import CycleTimer from './CycleTimer'
import {
  mockMachines,
  mockMyActiveSession,
  mockBalance,
  freeCount,
  totalCount,
  type LaundryMachine,
  type LaundrySession,
  type CycleType,
} from '@/lib/data/mock-laundry'
import { Bell, Check, MapPin, Wallet } from 'lucide-react'

export default function LaundryPageClient() {
  const [machines, setMachines] = useState<LaundryMachine[]>(mockMachines)
  const [session, setSession] = useState<LaundrySession | null>(mockMyActiveSession)
  const [balance, setBalance] = useState<number>(mockBalance.current)
  const [bookingMachine, setBookingMachine] = useState<LaundryMachine | null>(null)
  const [doneFlash, setDoneFlash] = useState(false)

  const myMachine = useMemo(
    () => machines.find((m) => m.is_mine && m.status === 'running') ?? null,
    [machines],
  )

  const free = useMemo(() => freeCount(), [])
  const total = useMemo(() => totalCount(), [])

  function onMachineDone() {
    if (!session) return
    setDoneFlash(true)
    setMachines((arr) =>
      arr.map((m) =>
        m.id === session.machine_id
          ? { ...m, status: 'available', cycle_ends_at: null, is_mine: false, current_session_id: undefined }
          : m,
      ),
    )
    setSession((s) => (s ? { ...s, status: 'completed', cycle_ends_at: new Date().toISOString() } : s))
    setTimeout(() => setDoneFlash(false), 3000)
  }

  function onActivated({
    machine,
    cycle,
    method,
  }: {
    machine: LaundryMachine
    cycle: CycleType
    method: 'paynow' | 'balance'
  }) {
    const endsAt = new Date(Date.now() + cycle.minutes * 60_000).toISOString()
    setMachines((arr) =>
      arr.map((m) =>
        m.id === machine.id
          ? {
              ...m,
              status: 'running',
              cycle_ends_at: endsAt,
              is_mine: true,
              current_session_id: 'ls_' + Math.random().toString(36).slice(2, 8),
            }
          : m,
      ),
    )
    setSession({
      id: 'ls_' + Math.random().toString(36).slice(2, 8),
      user_id: 'u_001',
      machine_id: machine.id,
      paid_at: new Date().toISOString(),
      activated_at: new Date().toISOString(),
      cycle_duration_minutes: cycle.minutes,
      cycle_ends_at: endsAt,
      amount_paid: cycle.price,
      payment_ref: method === 'paynow' ? 'paynow_demo' : 'balance_deduct',
      status: 'active',
    })
    if (method === 'balance') {
      setBalance((b) => Math.max(0, b - cycle.price))
    }
    setBookingMachine(null)
  }

  return (
    <div className="container-wide py-8 md:py-12 space-y-10">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <SectionLabel>Laundry</SectionLabel>
          <h1 className="font-display text-4xl md:text-5xl text-charcoal mt-2 leading-tight">
            Live washers and dryers.
          </h1>
          <p className="text-stone mt-2 text-sm md:text-base max-w-xl">
            Pay from your phone, the relay starts the machine for you. You walk down once, when it
            is done.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-3 bg-warm-white border border-warm-gray/30">
          <Wallet size={14} strokeWidth={1.5} className="text-terracotta" />
          <div>
            <p className="text-[10px] tracking-widest uppercase text-stone">Laundry balance</p>
            <p className="text-base font-display text-charcoal leading-none mt-0.5">
              ${balance.toFixed(2)}
            </p>
          </div>
        </div>
      </header>

      {myMachine && myMachine.cycle_ends_at && (
        <ActiveSessionBanner machine={myMachine} cycleEndsAt={myMachine.cycle_ends_at} onDone={onMachineDone} />
      )}

      {doneFlash && (
        <div className="bg-success-bg border-l-2 border-success-text px-5 py-4 flex items-center gap-3 text-sm text-success-text">
          <Check size={16} strokeWidth={1.5} />
          Marked complete. We let your floor know that your machine is free.
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <p className="text-[11px] tracking-widest uppercase text-stone">
          {free} of {total} machines free now
        </p>
        <p className="text-[11px] tracking-widest uppercase text-stone hidden md:flex items-center gap-1.5">
          <Bell size={11} strokeWidth={1.5} />
          We will ping you when your wash is done
        </p>
      </div>

      <MachineGrid onBook={setBookingMachine} />

      <LaundryModal
        open={!!bookingMachine}
        machine={bookingMachine}
        balance={balance}
        onClose={() => setBookingMachine(null)}
        onActivated={onActivated}
      />
    </div>
  )
}

function ActiveSessionBanner({
  machine,
  cycleEndsAt,
  onDone,
}: {
  machine: LaundryMachine
  cycleEndsAt: string
  onDone: () => void
}) {
  return (
    <div className="relative bg-charcoal text-warm-white overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-terracotta/20 blur-3xl pointer-events-none" />
      <div className="relative grid md:grid-cols-[1.4fr_1fr] gap-6 items-center p-6 md:p-10">
        <div>
          <p className="text-[11px] tracking-widest uppercase text-terracotta-light">
            Your cycle is running
          </p>
          <h2 className="font-display text-4xl md:text-5xl mt-2 leading-tight">
            Machine {machine.machine_number}
          </h2>
          <p className="text-sm text-warm-white/70 mt-3 flex items-center gap-2 flex-wrap">
            <MapPin size={12} strokeWidth={1.5} />
            {machine.floor}, {machine.block}
            <span className="text-warm-white/40">·</span>
            <span>
              {machine.machine_type === 'washer' ? 'Washer' : 'Dryer'}
            </span>
          </p>
          <button
            onClick={onDone}
            className="mt-5 inline-flex items-center gap-2 bg-warm-white text-charcoal px-5 py-2.5 text-xs font-medium tracking-wide uppercase hover:bg-cream transition-colors"
          >
            <Check size={14} strokeWidth={1.5} />
            Collected my laundry
          </button>
        </div>
        <div className="relative bg-warm-white/5 border border-warm-white/15 p-6 text-center">
          <CycleTimer cycleEndsAt={cycleEndsAt} tone="dark" onComplete={() => undefined} />
        </div>
      </div>
    </div>
  )
}
