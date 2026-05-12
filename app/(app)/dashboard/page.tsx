import Link from 'next/link'
import AlertBanner from '@/components/dashboard/AlertBanner'
import QuickActions from '@/components/dashboard/QuickActions'
import LaundryPulse from '@/components/dashboard/LaundryPulse'
import EventsHero from '@/components/dashboard/EventsHero'
import SectionLabel from '@/components/ui/SectionLabel'
import StatusPill from '@/components/ui/StatusPill'
import { mockUser } from '@/lib/data/mock-user'
import { getOpenTicketCount } from '@/lib/data/mock-maintenance'
import { getUpcomingBookings } from '@/lib/data/mock-facilities'
import { getUpcomingEvents } from '@/lib/data/mock-events'
import { getOutstandingTotal, getNextDue } from '@/lib/data/mock-payments'
import { mockChats } from '@/lib/data/mock-chats'
import { formatCurrency, formatDate, formatTime } from '@/lib/utils'
import { ArrowRight, Send, Wallet, Wrench, CalendarClock } from 'lucide-react'

export default function DashboardPage() {
  const outstanding = getOutstandingTotal()
  const nextDue = getNextDue()
  const openTickets = getOpenTicketCount()
  const nextBooking = getUpcomingBookings(1)[0]
  const upcomingEvents = getUpcomingEvents(4)
  const pinnedChats = mockChats.filter((c) => c.pinned || c.unread > 0).slice(0, 3)

  return (
    <div className="container-wide py-8 md:py-12 space-y-10">
      <AlertBanner
        title="Bimonthly aircon servicing due"
        body={`Block ${mockUser.block} servicing runs 18 to 22 May. Pick your preferred slot before Thursday.`}
        ctaLabel="Pick a slot"
        ctaHref="/maintenance/new"
      />

      <EventsHero events={upcomingEvents} />

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

      <section className="grid lg:grid-cols-[1fr_1fr_1fr] gap-5">
        <div className="space-y-4">
          <SectionLabel>Your day</SectionLabel>
          {nextBooking ? (
            <Link
              href="/facilities"
              className="group flex items-center gap-4 p-5 bg-warm-white border border-warm-gray/30 hover:border-warm-gray/60 transition-all"
            >
              <div className="w-14 text-center bg-sand py-2 shrink-0">
                <p className="text-[10px] tracking-widest uppercase text-stone">
                  {new Date(nextBooking.start_time).toLocaleString('en-SG', { month: 'short' })}
                </p>
                <p className="font-display text-xl leading-none text-charcoal mt-1">
                  {new Date(nextBooking.start_time).getDate()}
                </p>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] tracking-widest uppercase text-terracotta">Booking</span>
                  <StatusPill status={nextBooking.status} />
                </div>
                <h3 className="text-sm font-medium text-charcoal mt-1 truncate">
                  {nextBooking.facility_name}
                </h3>
                <p className="text-xs text-stone mt-0.5">
                  {formatTime(nextBooking.start_time)} to {formatTime(nextBooking.end_time)}
                </p>
              </div>
            </Link>
          ) : (
            <div className="bg-sand/50 border border-warm-gray/20 p-5 text-sm text-stone">
              Nothing booked.
            </div>
          )}
        </div>

        <div className="space-y-4">
          <SectionLabel>Laundry</SectionLabel>
          <LaundryPulse block={mockUser.block} />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <SectionLabel>Chats</SectionLabel>
            <Link
              href="/chats"
              className="text-[10px] tracking-widest uppercase text-stone hover:text-terracotta transition-colors inline-flex items-center gap-1"
            >
              All
              <ArrowRight size={11} strokeWidth={1.5} />
            </Link>
          </div>
          <div className="bg-warm-white border border-warm-gray/30">
            <ul className="divide-y divide-warm-gray/15">
              {pinnedChats.map((c) => {
                const tgHref = c.handle.startsWith('http') ? c.handle : `https://${c.handle}`
                return (
                  <li key={c.id}>
                    <a
                      href={tgHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-sand/50 transition-colors group"
                    >
                      <Send
                        size={14}
                        strokeWidth={1.5}
                        className="text-terracotta shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-charcoal truncate">{c.name}</p>
                        {c.last_message && (
                          <p className="text-[11px] text-stone truncate">{c.last_message.body}</p>
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
        </div>
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
