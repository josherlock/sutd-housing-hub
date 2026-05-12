import { cn } from '@/lib/utils'

export default function Divider({ className }: { className?: string }) {
  return <div className={cn('h-px bg-warm-gray/20 w-full', className)} />
}
