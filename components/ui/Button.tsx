import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'outline' | 'ghost' | 'light' | 'dark'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: React.ReactNode
  variant?: Variant
  size?: Size
  href?: string
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  fullWidth?: boolean
}

const base =
  'inline-flex items-center justify-center gap-2 font-sans font-medium tracking-wide transition-all duration-300 ease-out-expo focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream active:scale-[0.98]'

const variants: Record<Variant, string> = {
  primary: 'bg-terracotta text-warm-white hover:bg-terracotta-dark',
  outline: 'border border-charcoal text-charcoal hover:bg-charcoal hover:text-warm-white',
  ghost: 'text-charcoal hover:text-terracotta underline-offset-4 hover:underline',
  light: 'bg-warm-white text-charcoal hover:bg-cream border border-warm-gray/30',
  dark: 'bg-charcoal text-warm-white hover:bg-charcoal/90',
}

const sizes: Record<Size, string> = {
  sm: 'text-xs px-4 py-2',
  md: 'text-sm px-6 py-3',
  lg: 'text-sm px-8 py-4 tracking-wider',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className,
  onClick,
  type = 'button',
  disabled,
  fullWidth,
}: ButtonProps) {
  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    disabled && 'opacity-50 cursor-not-allowed',
    className,
  )

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
