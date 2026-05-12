import { cn, initials } from '@/lib/utils'

interface AvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  tone?: 'sand' | 'terracotta' | 'charcoal'
  className?: string
}

const sizes = {
  sm: 'w-8 h-8 text-[11px]',
  md: 'w-10 h-10 text-xs',
  lg: 'w-14 h-14 text-sm',
  xl: 'w-24 h-24 text-2xl font-display',
}

const tones = {
  sand: 'bg-sand text-charcoal',
  terracotta: 'bg-terracotta text-warm-white',
  charcoal: 'bg-charcoal text-warm-white',
}

export default function Avatar({ name, size = 'md', tone = 'sand', className }: AvatarProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full font-sans font-medium tracking-wider uppercase shrink-0',
        sizes[size],
        tones[tone],
        className,
      )}
    >
      {initials(name)}
    </div>
  )
}
