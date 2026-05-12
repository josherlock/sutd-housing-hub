import Link from 'next/link'
import AlertBanner from '@/components/dashboard/AlertBanner'
import QuickActions from '@/components/dashboard/QuickActions'
import LaundryPulse from '@/components/dashboard/LaundryPulse'
import SectionLabel from '@/components/ui/SectionLabel'
import StatusPill from '@/components/ui/StatusPill'
import { mockUser } from '@/lib/data/mock-user'
import { getOpenTicketCount } from '@/lib/data/mock-maintenance'
import { getUpcomingBookings } from '@/lib/data/mock-facilities'
import { getUpcomingEvents } from '@/lib/data/mock-events'
import { getOutstandingTotal, getNextDue } from '@/lib/data/mock-payments'
import { mockChats } from '@/lib/data/mock-chats'
import { formatCurrency, formatDate, formatTime } from '@/lib/utils'
import { ArrowRight, Send, MapPin, Wallet, Wrench, CalendarClock } from 'lucide-react'

export default function DashboardPage() {
  const outstanding = getOutstandingTotal()
  const nextDue = getNextDue()
  const openTickets = getOpenTicketCount()
  const nextBooking = getUpcomingBookings(1)[0]
  const nextEvent = getUpcomingEvents(1)[0]
  const pinnedChats = mockChats.filter((c) => c.pinned || c.unread > 0).slice(0, 4)

  return (
    <div className="container-wide py-8 md:py-12 space-y-10">
      <AlertBanner
        title="Bimonthly aircon servicing due"
        body={`Block ${mockUser.block} servicing runs 18 to 22 May. Pick your preferred slot before Thursday.`}
        ctaLabel="Pick a slot"
        ctaHref="/maintenance/new"
      />

      <section className="grid lg:grid-cols-3 gap-3">
        <SummaryStat
          label="Balance"
          value={outstanding > 0 ? formatCurrency(outstanding) : 'All clear'}
          sublabel={
            nextDue && outstanding > 0 ? `Next due ${formatDate(nextDue.due_date)}` : 'Nothing outstanding'
          }
          href="/payments"
          icon={Wallet}
          urgent={outstanding > 0}
        />
        <SummaryStat
          label="Open tickets"
          value={String(openTickets)}
          sublabel={openTickets > 0 ? 'Tap to view progress' : 'No issues reported'}
          href="/maintenance"
          icon={Wrench}
        />
        <SummaryStat
          label="Next booking"
          value={nextBooking ? formatDate(nextBooking.start_time, { day: 'numeric', month: 'short' }) : '—'}
          sublabel={nextBooking ? `${formatTime(nextBooking.start_time)}, ${nextBooking.facility_name}` : 'Nothing on the calendar'}
          href="/facilities"
          icon={CalendarClock}
        />
      </section>

      <section className="space-y-4">
        <SectionLabel>Quick actions</SectionLabel>
        <QuickActions />
      </section>

      <section className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
        <UpNext nextBooking={nextBooking} nextEvent={nextEvent} />
        <ChatsRail chats={pinnedChats} />
      </section>
    </div>
  )
}

function SummaryStat({
  label,
  value,
  sublabel,
  href,
  icon: Icon,
  urgent,
}: {
  label: string
  value: string
  sublabel: string
  href: string
  icon: typeof Wallet
  urgent?: boolean
}) {
  return (
    <Link
      href={href}
      className={`group flex items-center gap-5 p-6 border transition-all duration-300 ${
        urgent
          ? 'bg-terracotta/10 border-terracotta/30 hover:border-terracotta/60'
          : 'bg-warm-white border-warm-gray/30 hover:border-warm-gray/60'
      }`}
    >
      <div
        className={`w-12 h-12 flex items-center justify-center shrink-0 ${
          urgent ? 'bg-terracotta text-warm-white' : 'bg-sand text-charcoal'
        }`}
      >
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] tracking-widest uppercase text-stone/80">{label}</p>
        <p
          className={`font-display text-3xl leading-none mt-1 ${urgent ? 'text-terracotta-dark' : 'text-charcoal'}`}
        >
          {value}
        </p>
        <p className="text-xs text-stone mt-1.5 truncate">{sublabel}</p>
      </div>
      <ArrowRight
        size={16}
        strokeWidth={1.5}
        className={`shrink-0 transition-transform group-hover:translate-x-0.5 ${urgent ? 'text-terracotta' : 'text-warm-gray'}`}
      />
    </Link>
  )
}

function UpNext({
  nextBooking,
  nextEvent,
}: {
  nextBooking: ReturnType<typeof getUpcomingBookings>[number] | undefined
  nextEvent: ReturnType<typeof getUpcomingEvents>[number] | undefined
}) {
  return (
    <div className="space-y-4">
      <SectionLabel>Up next</SectionLabel>
      <div className="space-y-3">
        {nextBooking && (
          <Link
            href="/facilities"
            className="group flex items-center gap-5 p-5 bg-warm-white border border-warm-gray/30 hover:border-warm-gray/60 transition-all"
          >
            <div className="w-16 text-center bg-sand py-2 shrink-0">
              <p className="text-[10px] tracking-widest uppercase text-stone">
                {new Date(nextBooking.start_time).toLocaleString('en-SG', { month: 'short' })}
              </p>
              <p className="font-display text-2xl leading-none text-charcoal mt-1">
                {new Date(nextBooking.start_time).getDate()}
              </p>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] tracking-widest uppercase text-terracotta">Your booking</span>
                <StatusPill status={nextBooking.status} />
              </div>
              <h3 className="font-display text-lg text-charcoal leading-tight mt-1">
                {nextBooking.facility_name}
              </h3>
              <p className="text-xs text-stone mt-1">
                {formatTime(nextBooking.start_time)} to {formatTime(nextBooking.end_time)}
                {nextBooking.purpose && ` · ${nextBooking.purpose}`}
              </p>
            </div>
            <ArrowRight size={16} strokeWidth={1.5} className="text-warm-gray group-hover:translate-x-0.5 transition-transform shrink-0" />
          </Link>
        )}
        {nextEvent && (
          <Link
            href="/events"
            className="group flex items-center gap-5 p-5 bg-warm-white border border-warm-gray/30 hover:border-warm-gray/60 transition-all"
          >
            <div className="w-16 text-center bg-terracotta/10 py-2 shrink-0">
              <p className="text-[10px] tracking-widest uppercase text-terracotta-dark">
                {new Date(nextEvent.start_time).toLocaleString('en-SG', { month: 'short' })}
              </p>
              <p className="font-display text-2xl leading-none text-terracotta-dark mt-1">
                {new Date(nextEvent.start_time).getDate()}
              </p>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] tracking-widest uppercase text-terracotta">Event</span>
              <h3 className="font-display text-lg text-charcoal leading-tight mt-1">
                {nextEvent.title}
              </h3>
              <p className="text-xs text-stone mt-1 flex items-center gap-1.5 flex-wrap">
                <span>{formatTime(nextEvent.start_time)}</span>
                <span>·</span>
                <MapPin size={11} strokeWidth={1.5} />
                {nextEvent.location}
                <span>·</span>
                <span>{nextEvent.rsvp_count} going</span>
              </p>
            </div>
            <ArrowRight size={16} strokeWidth={1.5} className="text-warm-gray group-hover:translate-x-0.5 transition-transform shrink-0" />
          </Link>
        )}
        <LaundryPulse block={mockUser.block} />
        {!nextBooking && !nextEvent && (
          <div className="bg-sand/50 border border-warm-gray/20 p-8 text-center text-sm text-stone">
            Nothing on the calendar. Spare moment? Book a court or join an event.
          </div>
        )}
      </div>
    </div>
  )
}

function ChatsRail({ chats }: { chats: typeof mockChats }) {
  return (
    <div className="bg-charcoal text-warm-white p-6 flex flex-col gap-4 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-terracotta/15 blur-3xl pointer-events-none" />
      <div className="relative flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] tracking-widest uppercase text-terracotta-light">Chats</p>
          <h3 className="font-display text-xl mt-1 leading-tight">Stay in the loop</h3>
        </div>
        <Link
          href="/chats"
          className="text-[10px] tracking-widest uppercase text-warm-white/70 hover:text-warm-white transition-colors inline-flex items-center gap-1 shrink-0"
        >
          All chats
          <ArrowRight size={12} strokeWidth={1.5} />
        </Link>
      </div>
      <ul className="relative space-y-2.5">
        {chats.map((c) => {
          const tgHref = c.handle.startsWith('http') ? c.handle : `https://${c.handle}`
          return (
            <li key={c.id}>
              <a
                href={tgHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-3 py-2.5 -mx-3 hover:bg-warm-white/5 transition-colors"
              >
                <Send size={14} strokeWidth={1.5} className="text-terracotta-light shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{c.name}</p>
                  {c.last_message && (
                    <p className="text-[11px] text-warm-white/60 truncate">{c.last_message.body}</p>
                  )}
                </div>
                {c.unread > 0 && (
                  <span className="bg-terracotta text-warm-white text-[10px] font-medium px-1.5 min-w-[18px] h-[18px] inline-flex items-center justify-center shrink-0">
                    {c.unread}
                  </span>
                )}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
