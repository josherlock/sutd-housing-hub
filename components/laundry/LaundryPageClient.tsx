'use client'

import { useMemo, useState } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import MachineCard from './MachineCard'
import BookingModal from './BookingModal'
import TopUpModal from './TopUpModal'
import { useNow } from './useNow'
import {
  mockRooms,
  mockMachines,
  mockReservations,
  mockWallet,
  type Machine,
  type CycleType,
  type LaundryReservation,
} from '@/lib/data/mock-laundry'
import { formatCurrency, formatTime, formatDate } from '@/lib/utils'
import { Plus, MapPin, AlertTriangle, Wallet, History, Bell } from 'lucide-react'
import Link from 'next/link'

export default function LaundryPageClient() {
  const [roomId, setRoomId] = useState(mockRooms[0]!.id)
  const [bookingMode, setBookingMode] = useState<'now' | 'schedule'>('now')
  const [bookingMachine, setBookingMachine] = useState<Machine | null>(null)
  const [topUpOpen, setTopUpOpen] = useState(false)
  const [wallet, setWallet] = useState(mockWallet)
  const [reservations, setReservations] = useState(mockReservations)
  const now = useNow(10_000)

  const machines = useMemo(() => mockMachines.filter((m) => m.room_id === roomId), [roomId])

  const stats = useMemo(() => {
    let available = 0
    let running = 0
    let broken = 0
    let nextFreeMin: number | null = null
    for (const m of machines) {
      if (m.state === 'available') {
        available++
      } else if (m.state === 'in_use' && m.started_at && m.duration_minutes) {
        const elapsed = (now - new Date(m.started_at).getTime()) / 60_000
        const remaining = Math.max(0, m.duration_minutes - elapsed)
        if (remaining <= 0) {
          available++
        } else {
          running++
          if (nextFreeMin === null || remaining < nextFreeMin) nextFreeMin = remaining
        }
      } else if (m.state === 'out_of_order') {
        broken++
      }
    }
    return { available, running, broken, nextFreeMin }
  }, [machines, now])

  function onUseNow(m: Machine) {
    setBookingMachine(m)
    setBookingMode('now')
  }
  function onBook(m: Machine) {
    setBookingMachine(m)
    setBookingMode('schedule')
  }

  function onConfirmBooking({
    machine,
    cycle,
    startInMinutes,
  }: {
    machine: Machine
    cycle: CycleType
    startInMinutes: number
  }) {
    setWallet((w) => ({
      ...w,
      balance: w.balance - cycle.price,
      transactions: [
        {
          id: 't_' + Math.random().toString(36).slice(2, 8),
          kind: 'spend' as const,
          amount: -cycle.price,
          description:
            (bookingMode === 'now' ? 'Started ' : 'Reserved ') +
            cycle.label.toLowerCase() +
            ', ' +
            machine.label,
          at: new Date().toISOString(),
        },
        ...w.transactions,
      ],
    }))
    if (bookingMode === 'schedule') {
      const newRes: LaundryReservation = {
        id: 'lr_' + Math.random().toString(36).slice(2, 8),
        machine_id: machine.id,
        machine_label: machine.label,
        room_id: roomId,
        room_name: mockRooms.find((r) => r.id === roomId)!.name,
        start_time: new Date(now + startInMinutes * 60_000).toISOString(),
        cycle_id: cycle.id,
        status: 'pending',
      }
      setReservations((r) => [newRes, ...r])
    }
    setBookingMachine(null)
  }

  function onTopUp(amount: number, method: 'paynow' | 'paylah' | 'card') {
    setWallet((w) => ({
      ...w,
      balance: w.balance + amount,
      transactions: [
        {
          id: 't_' + Math.random().toString(36).slice(2, 8),
          kind: 'topup' as const,
          amount,
          description: `Top up via ${method === 'paynow' ? 'PayNow' : method === 'paylah' ? 'PayLah' : 'Card'}`,
          method,
          at: new Date().toISOString(),
        },
        ...w.transactions,
      ],
    }))
  }

  const currentRoom = mockRooms.find((r) => r.id === roomId)!
  const washers = machines.filter((m) => m.kind === 'washer')
  const dryers = machines.filter((m) => m.kind === 'dryer')

  return (
    <div className="container-wide py-8 md:py-12">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <SectionLabel>Laundry</SectionLabel>
          <h1 className="font-display text-4xl md:text-5xl text-charcoal mt-2 leading-tight">
            Real-time washers and dryers.
          </h1>
          <p className="text-stone mt-2 text-sm md:text-base max-w-xl">
            See who is running, who is finishing, who is free. Reserve a slot so you walk down once
            and only once.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {mockRooms.map((r) => (
            <button
              key={r.id}
              onClick={() => setRoomId(r.id)}
              className={`text-xs font-medium tracking-wide uppercase px-3 py-2 border transition-colors ${
                roomId === r.id
                  ? 'border-charcoal bg-charcoal text-warm-white'
                  : 'border-warm-gray/30 text-stone hover:border-warm-gray/60'
              }`}
            >
              Block {r.block}
            </button>
          ))}
        </div>
      </header>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-8">
          <PulseBanner room={currentRoom} stats={stats} />

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl text-charcoal leading-tight">Washers</h2>
              <span className="text-xs tracking-widest uppercase text-stone">
                {washers.filter((m) => m.state === 'available').length} of {washers.length} free
              </span>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {washers.map((m) => (
                <MachineCard key={m.id} machine={m} onUseNow={onUseNow} onBook={onBook} />
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl text-charcoal leading-tight">Dryers</h2>
              <span className="text-xs tracking-widest uppercase text-stone">
                {dryers.filter((m) => m.state === 'available').length} of {dryers.length} free
              </span>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {dryers.map((m) => (
                <MachineCard key={m.id} machine={m} onUseNow={onUseNow} onBook={onBook} />
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <WalletPanel
            balance={wallet.balance}
            autoTopUp={wallet.auto_topup}
            onTopUp={() => setTopUpOpen(true)}
            onToggleAuto={() => setWallet((w) => ({ ...w, auto_topup: !w.auto_topup }))}
          />

          <UpcomingPanel reservations={reservations} />

          <HistoryPanel transactions={wallet.transactions.slice(0, 5)} />

          <NotificationsPanel />
        </aside>
      </div>

      <BookingModal
        open={!!bookingMachine}
        machine={bookingMachine}
        mode={bookingMode}
        balance={wallet.balance}
        onClose={() => setBookingMachine(null)}
        onConfirm={onConfirmBooking}
        onNeedTopUp={() => {
          setBookingMachine(null)
          setTopUpOpen(true)
        }}
      />
      <TopUpModal open={topUpOpen} onClose={() => setTopUpOpen(false)} onComplete={onTopUp} />
    </div>
  )
}

function PulseBanner({
  room,
  stats,
}: {
  room: (typeof mockRooms)[number]
  stats: { available: number; running: number; broken: number; nextFreeMin: number | null }
}) {
  const headline =
    stats.available > 0
      ? `${stats.available} machine${stats.available === 1 ? '' : 's'} free now`
      : stats.nextFreeMin !== null
      ? `Next free in ${Math.max(1, Math.round(stats.nextFreeMin))}m`
      : 'All machines busy or down'

  return (
    <div className="bg-charcoal text-warm-white p-6 md:p-8 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-terracotta/15 blur-3xl pointer-events-none" />
      <div className="relative grid md:grid-cols-[1.4fr_1fr] gap-6 items-end">
        <div>
          <p className="text-[11px] tracking-widest uppercase text-terracotta-light">
            {room.name}
          </p>
          <h2 className="font-display text-3xl md:text-4xl mt-2 leading-tight">{headline}</h2>
          <p className="text-sm text-warm-white/70 mt-3 flex items-center gap-2 flex-wrap">
            <MapPin size={12} strokeWidth={1.5} />
            {room.location}
            <span className="text-warm-white/40">·</span>
            <span>{stats.running} running</span>
            {stats.broken > 0 && (
              <>
                <span className="text-warm-white/40">·</span>
                <span className="inline-flex items-center gap-1 text-terracotta-light">
                  <AlertTriangle size={12} strokeWidth={1.5} />
                  {stats.broken} out of order
                </span>
              </>
            )}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <Stat label="Free" value={stats.available} tone="success" />
          <Stat label="Running" value={stats.running} tone="terracotta" />
          <Stat label="Broken" value={stats.broken} tone="muted" />
        </div>
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone: 'success' | 'terracotta' | 'muted'
}) {
  const cls =
    tone === 'success'
      ? 'bg-success-bg/20 text-success-bg'
      : tone === 'terracotta'
      ? 'bg-terracotta/20 text-terracotta-light'
      : 'bg-warm-white/10 text-warm-white/70'
  return (
    <div className={`${cls} px-3 py-3`}>
      <p className="font-display text-3xl leading-none">{value}</p>
      <p className="text-[10px] tracking-widest uppercase mt-1.5 opacity-80">{label}</p>
    </div>
  )
}

function WalletPanel({
  balance,
  autoTopUp,
  onTopUp,
  onToggleAuto,
}: {
  balance: number
  autoTopUp: boolean
  onTopUp: () => void
  onToggleAuto: () => void
}) {
  return (
    <div className="bg-warm-white border border-warm-gray/30 p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Wallet size={14} strokeWidth={1.5} className="text-terracotta" />
        <p className="text-[10px] tracking-widest uppercase text-stone">Laundry wallet</p>
      </div>
      <div>
        <p className="font-display text-4xl text-charcoal leading-none">
          {formatCurrency(balance)}
        </p>
        <p className="text-[11px] text-stone mt-1">
          Roughly {Math.floor(balance / 3)} normal washes
        </p>
      </div>
      <Button onClick={onTopUp} fullWidth>
        <Plus size={14} strokeWidth={1.5} />
        Top up
      </Button>
      <label className="flex items-center justify-between gap-3 cursor-pointer select-none">
        <span className="text-xs text-stone">Auto top-up when below $5</span>
        <button
          type="button"
          role="switch"
          aria-checked={autoTopUp}
          onClick={onToggleAuto}
          className={`relative w-10 h-5 transition-colors ${
            autoTopUp ? 'bg-terracotta' : 'bg-warm-gray/40'
          }`}
        >
          <span
            className={`absolute top-0.5 w-4 h-4 bg-warm-white transition-transform ${
              autoTopUp ? 'translate-x-[20px]' : 'translate-x-0.5'
            }`}
          />
        </button>
      </label>
    </div>
  )
}

function UpcomingPanel({ reservations }: { reservations: LaundryReservation[] }) {
  const upcoming = reservations.filter((r) => r.status === 'pending')
  if (upcoming.length === 0) return null
  return (
    <div className="bg-sand p-5 space-y-3">
      <p className="text-[10px] tracking-widest uppercase text-stone">Your reservations</p>
      <ul className="space-y-2">
        {upcoming.map((r) => (
          <li key={r.id} className="bg-warm-white p-3 border border-warm-gray/20">
            <p className="text-sm font-medium text-charcoal">{r.machine_label}</p>
            <p className="text-[11px] text-stone mt-0.5">
              {formatDate(r.start_time, { day: 'numeric', month: 'short' })}, {formatTime(r.start_time)}
              <span className="mx-1">·</span>
              {r.room_name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function HistoryPanel({
  transactions,
}: {
  transactions: typeof mockWallet.transactions
}) {
  return (
    <div className="bg-warm-white border border-warm-gray/30 p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History size={14} strokeWidth={1.5} className="text-stone" />
          <p className="text-[10px] tracking-widest uppercase text-stone">Recent activity</p>
        </div>
      </div>
      <ul className="space-y-2">
        {transactions.map((t) => (
          <li key={t.id} className="flex items-start justify-between gap-3 py-2 border-b border-warm-gray/10 last:border-0">
            <div className="min-w-0">
              <p className="text-xs text-charcoal truncate">{t.description}</p>
              <p className="text-[10px] text-warm-gray mt-0.5">
                {new Date(t.at).toLocaleString('en-SG', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true })}
              </p>
            </div>
            <span className={`text-sm tabular-nums shrink-0 ${t.amount > 0 ? 'text-success-text' : 'text-stone'}`}>
              {t.amount > 0 ? '+' : ''}
              {formatCurrency(t.amount)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function NotificationsPanel() {
  return (
    <div className="bg-cream border border-warm-gray/30 p-5 space-y-3">
      <div className="flex items-center gap-2">
        <Bell size={14} strokeWidth={1.5} className="text-terracotta" />
        <p className="text-[10px] tracking-widest uppercase text-stone">Pings</p>
      </div>
      <p className="text-xs text-stone leading-relaxed">
        We will buzz your phone when your cycle has three minutes left, when it finishes, and ten
        minutes after if you have not collected. Settings live in your{' '}
        <Link href="/profile" className="underline decoration-warm-gray/50 hover:text-terracotta">
          profile
        </Link>
        .
      </p>
    </div>
  )
}
