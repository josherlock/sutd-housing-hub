'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn, initials } from '@/lib/utils'
import { mockAdmin } from '@/lib/data/admin/mock-admin-user'
import { ticketCounts } from '@/lib/data/admin/mock-admin-tickets'
import { bookingCounts } from '@/lib/data/admin/mock-admin-bookings'
import { invoiceTotals } from '@/lib/data/admin/mock-admin-invoices'
import {
  LayoutDashboard,
  Wrench,
  CalendarRange,
  Receipt,
  Users,
  Megaphone,
  ArrowLeft,
} from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: typeof LayoutDashboard
  badge?: number
}

export default function AdminSidebar() {
  const pathname = usePathname()

  const main: NavItem[] = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    {
      label: 'Maintenance',
      href: '/admin/maintenance',
      icon: Wrench,
      badge: ticketCounts.open + ticketCounts.assigned + ticketCounts.in_progress,
    },
    { label: 'Bookings', href: '/admin/bookings', icon: CalendarRange, badge: bookingCounts.pending },
    { label: 'Payments', href: '/admin/payments', icon: Receipt, badge: invoiceTotals.overdue_count },
    { label: 'Residents', href: '/admin/students', icon: Users },
  ]

  const tools: NavItem[] = [
    { label: 'Announcements', href: '/admin', icon: Megaphone },
  ]

  return (
    <aside className="hidden lg:flex w-[260px] shrink-0 flex-col bg-charcoal text-warm-white border-r border-warm-white/5">
      <div className="px-6 pt-7 pb-6 border-b border-warm-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-warm-white text-charcoal flex items-center justify-center font-display text-xl leading-none">
            S
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg tracking-wide">Housing Admin</span>
            <span className="text-[10px] tracking-widest uppercase text-warm-white/50">
              SUTD, staff portal
            </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-6">
        <NavGroup label="Operations" items={main} pathname={pathname} />
        <NavGroup label="Communicate" items={tools} pathname={pathname} />
      </nav>

      <div className="border-t border-warm-white/10 p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-terracotta text-warm-white flex items-center justify-center text-xs font-medium tracking-wider">
            {initials(mockAdmin.name)}
          </div>
          <div className="min-w-0 flex flex-col">
            <span className="text-sm font-medium truncate">{mockAdmin.name}</span>
            <span className="text-[11px] text-warm-white/60 tracking-wide">{mockAdmin.role}</span>
          </div>
        </div>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-warm-white/60 hover:text-warm-white transition-colors"
        >
          <ArrowLeft size={11} strokeWidth={1.5} />
          Switch to resident view
        </Link>
      </div>
    </aside>
  )
}

function NavGroup({
  label,
  items,
  pathname,
}: {
  label: string
  items: NavItem[]
  pathname: string
}) {
  return (
    <div>
      <div className="px-3 mb-2 text-[10px] tracking-widest uppercase text-warm-white/40 font-medium">
        {label}
      </div>
      <ul className="space-y-px">
        {items.map((item) => {
          const Icon = item.icon
          const active =
            pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <li key={item.label + item.href}>
              <Link
                href={item.href}
                className={cn(
                  'relative flex items-center gap-3 px-3 py-2.5 text-sm font-sans transition-colors',
                  active
                    ? 'bg-terracotta/15 text-warm-white'
                    : 'text-warm-white/75 hover:text-warm-white hover:bg-warm-white/5',
                )}
              >
                {active && <span className="absolute left-0 top-1 bottom-1 w-[2px] bg-terracotta" />}
                <Icon size={16} strokeWidth={1.5} />
                <span className="flex-1">{item.label}</span>
                {typeof item.badge === 'number' && item.badge > 0 && (
                  <span className="bg-terracotta text-warm-white text-[10px] font-medium px-1.5 min-w-[18px] h-[18px] inline-flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
