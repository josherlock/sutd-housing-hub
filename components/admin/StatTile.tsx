import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface StatTileProps {
  label: string
  value: string | number
  sublabel?: string
  href?: string
  icon?: LucideIcon
  tone?: 'neutral' | 'urgent' | 'success'
}

const tones = {
  neutral: 'bg-warm-white border-warm-gray/30',
  urgent: 'bg-terracotta/10 border-terracotta/40',
  success: 'bg-success-bg/60 border-success-text/30',
}

const iconTones = {
  neutral: 'bg-sand text-charcoal',
  urgent: 'bg-terracotta text-warm-white',
  success: 'bg-success-text text-warm-white',
}

export default function StatTile({ label, value, sublabel, href, icon: Icon, tone = 'neutral' }: StatTileProps) {
  const inner = (
    <div className={`group p-5 border transition-all duration-300 ${tones[tone]} ${href ? 'hover:border-warm-gray/60' : ''}`}>
      <div className="flex items-center gap-3 mb-3">
        {Icon && (
          <div className={`w-8 h-8 flex items-center justify-center shrink-0 ${iconTones[tone]}`}>
            <Icon size={14} strokeWidth={1.5} />
          </div>
        )}
        <p className="text-[10px] tracking-widest uppercase text-stone/80">{label}</p>
        {href && (
          <ArrowRight
            size={14}
            strokeWidth={1.5}
            className="ml-auto text-warm-gray group-hover:translate-x-0.5 transition-transform"
          />
        )}
      </div>
      <p className={`font-display text-3xl leading-none ${tone === 'urgent' ? 'text-terracotta-dark' : 'text-charcoal'}`}>
        {value}
      </p>
      {sublabel && <p className="text-xs text-stone mt-2">{sublabel}</p>}
    </div>
  )
  if (href) return <Link href={href}>{inner}</Link>
  return inner
}
