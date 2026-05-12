import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface IconTileProps {
  icon: LucideIcon
  tone?: 'sand' | 'terracotta' | 'charcoal' | 'cream'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const tones = {
  sand: 'bg-sand text-charcoal',
  terracotta: 'bg-terracotta/10 text-terracotta-dark',
  charcoal: 'bg-charcoal text-warm-white',
  cream: 'bg-cream text-charcoal border border-warm-gray/30',
}

const sizes = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
}

const iconSizes = {
  sm: 14,
  md: 18,
  lg: 22,
}

export default function IconTile({ icon: Icon, tone = 'sand', size = 'md', className }: IconTileProps) {
  return (
    <div className={cn('flex items-center justify-center shrink-0', sizes[size], tones[tone], className)}>
      <Icon size={iconSizes[size]} strokeWidth={1.5} />
    </div>
  )
}
