'use client'

import { Bell, ShieldCheck, Search } from 'lucide-react'
import { mockAdmin } from '@/lib/data/admin/mock-admin-user'

export default function AdminTopbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="border-b border-warm-gray/20 bg-cream sticky top-0 z-30">
      <div className="px-6 lg:px-10 py-4 flex items-center justify-between gap-6">
        <div className="flex items-center gap-4 min-w-0">
          <span className="hidden md:inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-terracotta-dark bg-terracotta/10 border border-terracotta/30 px-2.5 py-1">
            <ShieldCheck size={11} strokeWidth={1.5} />
            Staff portal
          </span>
          <div className="min-w-0">
            <h1 className="font-display text-xl md:text-2xl text-charcoal leading-tight truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[11px] tracking-wide text-stone mt-0.5 truncate">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-2 px-3 py-2 border border-warm-gray/30 bg-warm-white">
            <Search size={13} strokeWidth={1.5} className="text-warm-gray" />
            <input
              placeholder="Search students, tickets, bookings"
              className="bg-transparent text-xs text-charcoal placeholder:text-warm-gray focus:outline-none w-56"
            />
          </div>
          <button
            aria-label="Notifications"
            className="relative w-9 h-9 inline-flex items-center justify-center border border-warm-gray/30 bg-warm-white text-charcoal hover:border-warm-gray/60 transition-colors"
          >
            <Bell size={14} strokeWidth={1.5} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-terracotta rounded-full" />
          </button>
          <span className="hidden md:flex flex-col items-end">
            <span className="text-xs font-medium text-charcoal">{mockAdmin.name}</span>
            <span className="text-[10px] tracking-wide text-stone">{mockAdmin.role}</span>
          </span>
        </div>
      </div>
    </header>
  )
}
