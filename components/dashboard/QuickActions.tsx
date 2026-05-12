import Link from 'next/link'
import { WashingMachine, Wrench, CalendarRange, CreditCard } from 'lucide-react'

const actions = [
  { label: 'Start a wash', href: '/laundry', icon: WashingMachine },
  { label: 'Book a space', href: '/facilities', icon: CalendarRange },
  { label: 'Report an issue', href: '/maintenance/new', icon: Wrench },
  { label: 'Pay fees', href: '/payments', icon: CreditCard },
]

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {actions.map((a) => {
        const Icon = a.icon
        return (
          <Link
            key={a.label}
            href={a.href}
            className="group flex flex-col items-start gap-4 p-5 bg-warm-white border border-warm-gray/30 hover:border-terracotta/50 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-sand flex items-center justify-center group-hover:bg-terracotta group-hover:text-warm-white transition-colors">
              <Icon size={18} strokeWidth={1.5} />
            </div>
            <span className="text-sm font-medium text-charcoal group-hover:text-terracotta-dark transition-colors">
              {a.label}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
