'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, WashingMachine, Send, Sparkles, Compass } from 'lucide-react'
import { cn } from '@/lib/utils'

const tabs = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/laundry', label: 'Laundry', icon: WashingMachine },
  { href: '/chats', label: 'Chats', icon: Send },
  { href: '/events', label: 'Events', icon: Sparkles },
  { href: '/orgs', label: 'Orgs', icon: Compass },
]

export default function MobileNav() {
  const pathname = usePathname()
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-sidebar-dark text-warm-white border-t border-warm-white/10">
      <ul className="grid grid-cols-5">
        {tabs.map((t) => {
          const Icon = t.icon
          const active = pathname === t.href || (t.href !== '/dashboard' && pathname.startsWith(t.href))
          return (
            <li key={t.href}>
              <Link
                href={t.href}
                className={cn(
                  'flex flex-col items-center gap-1 py-2.5 text-[10px] tracking-widest uppercase transition-colors',
                  active ? 'text-terracotta-light' : 'text-warm-white/60 hover:text-warm-white',
                )}
              >
                <Icon size={18} strokeWidth={1.5} />
                <span>{t.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
