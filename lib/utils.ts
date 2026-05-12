import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'SGD') {
  return new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(date: Date | string, opts?: Intl.DateTimeFormatOptions) {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-SG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...opts,
  }).format(d)
}

export function formatTime(date: Date | string) {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-SG', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(d)
}

export function formatDateTime(date: Date | string) {
  return `${formatDate(date)}, ${formatTime(date)}`
}

export function relativeTime(date: Date | string) {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = Date.now()
  const diff = d.getTime() - now
  const absSec = Math.abs(diff) / 1000
  const sign = diff < 0 ? -1 : 1
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  if (absSec < 60) return rtf.format(sign * Math.round(absSec), 'second')
  if (absSec < 3600) return rtf.format(sign * Math.round(absSec / 60), 'minute')
  if (absSec < 86400) return rtf.format(sign * Math.round(absSec / 3600), 'hour')
  if (absSec < 604800) return rtf.format(sign * Math.round(absSec / 86400), 'day')
  return formatDate(d)
}

export function greeting(date: Date = new Date()) {
  const h = date.getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]!.toUpperCase())
    .join('')
}
