import { cn } from '@/lib/utils'

type Tone = 'neutral' | 'terracotta' | 'success' | 'warning' | 'danger' | 'dark'

interface BadgeProps {
  children: React.ReactNode
  tone?: Tone
  className?: string
}

const tones: Record<Tone, string> = {
  neutral: 'bg-sand text-stone border-warm-gray/30',
  terracotta: 'bg-terracotta/10 text-terracotta-dark border-terracotta/30',
  success: 'bg-success-bg text-success-text border-success-text/30',
  warning: 'bg-warning-bg text-stone border-terracotta/40',
  danger: 'bg-terracotta/15 text-terracotta-dark border-terracotta/40',
  dark: 'bg-charcoal text-warm-white border-charcoal',
}

export default function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-sans font-medium tracking-wide uppercase border',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
