import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string
  sublabel?: string
  icon?: LucideIcon
  tone?: 'sand' | 'terracotta' | 'success' | 'cream'
}

const tones = {
  sand: 'bg-sand',
  terracotta: 'bg-terracotta/10 border-terracotta/30',
  success: 'bg-success-bg',
  cream: 'bg-cream',
}

export default function MetricCard({ label, value, sublabel, icon: Icon, tone = 'sand' }: MetricCardProps) {
  return (
    <div className={cn('p-6 border border-warm-gray/20 flex flex-col gap-3', tones[tone])}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] tracking-widest uppercase text-stone/80">{label}</span>
        {Icon && <Icon size={16} strokeWidth={1.5} className="text-stone/60" />}
      </div>
      <div className="font-display text-4xl md:text-5xl text-charcoal leading-none">{value}</div>
      {sublabel && <span className="text-xs text-stone leading-relaxed">{sublabel}</span>}
    </div>
  )
}
