import Link from 'next/link'
import AdminTopbar from '@/components/admin/AdminTopbar'
import StatTile from '@/components/admin/StatTile'
import StatusPill from '@/components/ui/StatusPill'
import { mockAdminTickets, ticketCounts } from '@/lib/data/admin/mock-admin-tickets'
import { mockAdminBookings, bookingCounts } from '@/lib/data/admin/mock-admin-bookings'
import { mockAdminInvoices, invoiceTotals } from '@/lib/data/admin/mock-admin-invoices'
import { mockStudents, studentLookup } from '@/lib/data/admin/mock-students'
import { formatCurrency, formatDate, formatTime } from '@/lib/utils'
import {
  Wrench,
  CalendarRange,
  Receipt,
  Users,
  AlertCircle,
  ArrowRight,
  Clock,
} from 'lucide-react'

export const metadata = { title: 'Admin Overview' }

export default function AdminOverviewPage() {
  const urgentTickets = mockAdminTickets
    .filter((t) => t.priority === 'urgent' && t.status !== 'resolved' && t.status !== 'cancelled')
    .slice(0, 4)
  const pendingBookings = mockAdminBookings.filter((b) => b.status === 'pending')
  const overdueInvoices = mockAdminInvoices.filter((i) => i.status === 'overdue')
  const activeResidents = mockStudents.filter((s) => s.status === 'active').length

  const recentActivity = [
    ...mockAdminTickets.slice(0, 6).map((t) => ({
      kind: 'ticket' as const,
      at: t.updated_at,
      title: t.title,
      student: studentLookup[t.student_id],
      status: t.status,
      href: `/admin/maintenance`,
    })),
    ...mockAdminBookings.slice(0, 4).map((b) => ({
      kind: 'booking' as const,
      at: b.start_time,
      title: `${b.facility_name}, ${b.purpose ?? 'booking'}`,
      student: studentLookup[b.student_id],
      status: b.status,
      href: `/admin/bookings`,
    })),
  ]
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, 8)

  return (
    <>
      <AdminTopbar
        title="Office of Housing, today"
        subtitle={`${ticketCounts.urgent} urgent tickets · ${bookingCounts.pending} pending approvals · ${overdueInvoices.length} overdue payments`}
      />

      <main className="p-6 lg:p-10 space-y-10">
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatTile
            label="Open tickets"
            value={ticketCounts.open + ticketCounts.assigned + ticketCounts.in_progress}
            sublabel={`${ticketCounts.urgent} urgent`}
            href="/admin/maintenance"
            icon={Wrench}
            tone={ticketCounts.urgent > 0 ? 'urgent' : 'neutral'}
          />
          <StatTile
            label="Pending bookings"
            value={bookingCounts.pending}
            sublabel="Awaiting approval"
            href="/admin/bookings"
            icon={CalendarRange}
          />
          <StatTile
            label="Overdue payments"
            value={formatCurrency(overdueInvoices.reduce((s, i) => s + i.amount, 0))}
            sublabel={`${overdueInvoices.length} invoices`}
            href="/admin/payments"
            icon={Receipt}
            tone={overdueInvoices.length > 0 ? 'urgent' : 'neutral'}
          />
          <StatTile
            label="Active residents"
            value={activeResidents}
            sublabel={`Across ${new Set(mockStudents.map((s) => s.block)).size} blocks`}
            href="/admin/students"
            icon={Users}
          />
        </section>

        <section className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
          <div className="space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11px] tracking-widest uppercase text-terracotta">Needs you</p>
                <h2 className="font-display text-2xl text-charcoal mt-1 leading-tight">Urgent queue</h2>
              </div>
              <Link
                href="/admin/maintenance"
                className="text-[11px] tracking-widest uppercase text-stone hover:text-terracotta transition-colors inline-flex items-center gap-1.5"
              >
                Open queue
                <ArrowRight size={12} strokeWidth={1.5} />
              </Link>
            </div>

            {urgentTickets.length === 0 ? (
              <div className="bg-success-bg/40 border border-success-text/20 p-8 text-center text-sm text-success-text">
                Nothing urgent right now.
              </div>
            ) : (
              <ul className="bg-warm-white border border-warm-gray/30 divide-y divide-warm-gray/15">
                {urgentTickets.map((t) => {
                  const s = studentLookup[t.student_id]
                  return (
                    <li key={t.id}>
                      <Link
                        href="/admin/maintenance"
                        className="flex items-start gap-4 px-5 py-4 hover:bg-sand/50 transition-colors group"
                      >
                        <div className="w-9 h-9 bg-terracotta text-warm-white flex items-center justify-center shrink-0">
                          <AlertCircle size={16} strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium text-charcoal truncate">
                              {t.title}
                            </span>
                            <StatusPill status={t.status} />
                          </div>
                          <p className="text-[11px] text-stone mt-1">
                            {s?.full_name ?? 'Unknown'} · {s?.student_id} · Block {t.block}, Room {t.room_number}
                          </p>
                        </div>
                        <span className="text-[10px] tracking-widest uppercase text-warm-gray shrink-0">
                          {formatDate(t.created_at, { day: 'numeric', month: 'short' })}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-[11px] tracking-widest uppercase text-terracotta">Pending approval</p>
              <h2 className="font-display text-2xl text-charcoal mt-1 leading-tight">Bookings</h2>
            </div>
            {pendingBookings.length === 0 ? (
              <div className="bg-sand/50 border border-warm-gray/20 p-6 text-sm text-stone text-center">
                Nothing pending.
              </div>
            ) : (
              <ul className="space-y-3">
                {pendingBookings.map((b) => {
                  const s = studentLookup[b.student_id]
                  return (
                    <li key={b.id} className="bg-warm-white border border-warm-gray/30 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-charcoal truncate">
                            {b.facility_name}
                          </p>
                          <p className="text-[11px] text-stone mt-0.5">
                            {formatDate(b.start_time, { day: 'numeric', month: 'short' })}, {formatTime(b.start_time)}
                          </p>
                          <p className="text-[11px] text-stone mt-0.5">
                            {s?.full_name ?? 'Unknown'} · {s?.student_id}
                          </p>
                        </div>
                        <StatusPill status={b.status} />
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <button className="flex-1 bg-terracotta text-warm-white text-[11px] font-medium tracking-widest uppercase px-3 py-1.5 hover:bg-terracotta-dark transition-colors">
                          Approve
                        </button>
                        <button className="flex-1 border border-warm-gray/40 text-[11px] font-medium tracking-widest uppercase px-3 py-1.5 text-stone hover:border-warm-gray/70 transition-colors">
                          Reject
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] tracking-widest uppercase text-terracotta">Live feed</p>
              <h2 className="font-display text-2xl text-charcoal mt-1 leading-tight">
                Recent activity
              </h2>
            </div>
          </div>
          <ul className="bg-warm-white border border-warm-gray/30 divide-y divide-warm-gray/15">
            {recentActivity.map((a, i) => (
              <li key={i}>
                <Link
                  href={a.href}
                  className="flex items-center gap-4 px-5 py-3 hover:bg-sand/50 transition-colors group"
                >
                  <div
                    className={`w-7 h-7 flex items-center justify-center shrink-0 ${
                      a.kind === 'ticket' ? 'bg-terracotta/15 text-terracotta-dark' : 'bg-sand text-stone'
                    }`}
                  >
                    {a.kind === 'ticket' ? <Wrench size={12} strokeWidth={1.5} /> : <CalendarRange size={12} strokeWidth={1.5} />}
                  </div>
                  <div className="flex-1 min-w-0 flex items-center gap-3">
                    <span className="text-sm text-charcoal truncate flex-1">{a.title}</span>
                    {a.student && (
                      <span className="text-[11px] text-stone truncate hidden md:inline">
                        {a.student.full_name}, {a.student.student_id}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] tracking-wide text-warm-gray shrink-0 inline-flex items-center gap-1">
                    <Clock size={10} strokeWidth={1.5} />
                    {new Date(a.at).toLocaleString('en-SG', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true })}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}
