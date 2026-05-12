'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { mockUser } from '@/lib/data/mock-user'
import { getOpenTicketCount } from '@/lib/data/mock-maintenance'
import { getTotalUnread } from '@/lib/data/mock-chats'
import { cn, initials } from '@/lib/utils'
import {
  LayoutDashboard,
  Wallet,
  Wrench,
  CalendarRange,
  WashingMachine,
  Send,
  Sparkles,
  UsersRound,
  Compass,
  FileText,
  PackageCheck,
  CircleUser,
} from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: typeof LayoutDashboard
  badge?: number
}

export default function Sidebar() {
  const pathname = usePathname()
  const openTickets = getOpenTicketCount()
  const unreadChats = getTotalUnread()

  const main: NavItem[] = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Payments', href: '/payments', icon: Wallet },
    { label: 'Maintenance', href: '/maintenance', icon: Wrench, badge: openTickets },
    { label: 'Laundry', href: '/laundry', icon: WashingMachine },
    { label: 'Book Facilities', href: '/facilities', icon: CalendarRange },
  ]

  const community: NavItem[] = [
    { label: 'Chats', href: '/chats', icon: Send, badge: unreadChats },
    { label: 'Events', href: '/events', icon: Sparkles },
    { label: 'Community Feed', href: '/community', icon: UsersRound },
    { label: 'Student Orgs', href: '/orgs', icon: Compass },
  ]

  const account: NavItem[] = [
    { label: 'My Application', href: '/profile', icon: FileText },
    { label: 'Inventory', href: '/profile', icon: PackageCheck },
    { label: 'Profile', href: '/profile', icon: CircleUser },
  ]

  return (
    <aside className="hidden lg:flex w-[260px] shrink-0 flex-col bg-sidebar-dark text-warm-white border-r border-charcoal/40">
      <div className="px-6 pt-7 pb-6 border-b border-warm-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-terracotta flex items-center justify-center font-display text-xl text-warm-white leading-none">
            S
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg tracking-wide">Housing Hub</span>
            <span className="text-[10px] tracking-widest uppercase text-warm-white/50">
              SUTD, Office of Housing
            </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-6">
        <NavGroup label="Main" items={main} pathname={pathname} />
        <NavGroup label="Community" items={community} pathname={pathname} />
        <NavGroup label="Account" items={account} pathname={pathname} />
      </nav>

      <div className="border-t border-warm-white/10 p-4">
        <Link
          href="/profile"
          className="flex items-center gap-3 group hover:bg-warm-white/5 -m-2 p-2 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-terracotta text-warm-white flex items-center justify-center text-xs font-medium tracking-wider">
            {initials(mockUser.full_name)}
          </div>
          <div className="min-w-0 flex flex-col">
            <span className="text-sm font-medium truncate">{mockUser.full_name}</span>
            <span className="text-[11px] text-warm-white/60 tracking-wide">
              Block {mockUser.block}, Room {mockUser.room_number}
            </span>
          </div>
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
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <li key={item.label + item.href}>
              <Link
                href={item.href}
                className={cn(
                  'relative flex items-center gap-3 px-3 py-2.5 text-sm font-sans transition-colors',
                  active
                    ? 'bg-terracotta/10 text-warm-white'
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
