'use client'

import { Bell } from 'lucide-react'
import Link from 'next/link'
import { mockUser } from '@/lib/data/mock-user'
import { formatDate } from '@/lib/utils'
import { useNow } from '@/lib/hooks/use-now'

// Deliberately quiet: the dashboard hero carries the greeting and identity,
// so the topbar only holds ambient chrome (date, notifications, profile).
export default function Topbar() {
  const now = useNow()

  return (
    <header className="border-b border-warm-gray/20 bg-cream/70 backdrop-blur-md sticky top-0 z-30">
      <div className="px-6 lg:px-12 py-4 flex items-center justify-between gap-6">
        <p className="text-[11px] tracking-widest uppercase text-stone/70 min-w-0 truncate">
          {now
            ? formatDate(now, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
            : 'SUTD Housing Hub'}
        </p>

        <div className="flex items-center gap-3 shrink-0">
          <button
            aria-label="Notifications"
            className="relative w-10 h-10 inline-flex items-center justify-center border border-warm-gray/30 bg-warm-white text-charcoal hover:border-warm-gray/60 transition-colors"
          >
            <Bell size={16} strokeWidth={1.5} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-terracotta rounded-full" />
          </button>
          <Link
            href="/profile"
            className="hidden md:inline-flex w-10 h-10 items-center justify-center bg-terracotta text-warm-white text-xs font-medium tracking-wider rounded-full"
          >
            {mockUser.full_name
              .split(' ')
              .map((p) => p[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </Link>
        </div>
      </div>
    </header>
  )
}
