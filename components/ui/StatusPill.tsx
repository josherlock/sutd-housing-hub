import { cn } from '@/lib/utils'

type Status =
  | 'paid'
  | 'unpaid'
  | 'overdue'
  | 'waived'
  | 'submitted'
  | 'assigned'
  | 'in_progress'
  | 'resolved'
  | 'cancelled'
  | 'pending'
  | 'confirmed'
  | 'rejected'
  | 'checked_in'
  | 'no_show'
  | 'going'
  | 'maybe'
  | 'not_going'
  | 'active'
  | 'draft'

const config: Record<Status, { label: string; cls: string }> = {
  paid: { label: 'Paid', cls: 'bg-success-bg text-success-text border-success-text/30' },
  unpaid: { label: 'Unpaid', cls: 'bg-warning-bg text-stone border-terracotta/40' },
  overdue: { label: 'Overdue', cls: 'bg-terracotta/15 text-terracotta-dark border-terracotta/50' },
  waived: { label: 'Waived', cls: 'bg-sand text-stone border-warm-gray/40' },
  submitted: { label: 'Submitted', cls: 'bg-sand text-stone border-warm-gray/40' },
  assigned: { label: 'Assigned', cls: 'bg-warning-bg text-stone border-terracotta/40' },
  in_progress: { label: 'In Progress', cls: 'bg-terracotta/10 text-terracotta-dark border-terracotta/30' },
  resolved: { label: 'Resolved', cls: 'bg-success-bg text-success-text border-success-text/30' },
  cancelled: { label: 'Cancelled', cls: 'bg-sand text-warm-gray border-warm-gray/40' },
  pending: { label: 'Pending', cls: 'bg-warning-bg text-stone border-terracotta/40' },
  confirmed: { label: 'Confirmed', cls: 'bg-success-bg text-success-text border-success-text/30' },
  rejected: { label: 'Rejected', cls: 'bg-terracotta/15 text-terracotta-dark border-terracotta/50' },
  checked_in: { label: 'Checked In', cls: 'bg-charcoal text-warm-white border-charcoal' },
  no_show: { label: 'No Show', cls: 'bg-terracotta/15 text-terracotta-dark border-terracotta/50' },
  going: { label: 'Going', cls: 'bg-success-bg text-success-text border-success-text/30' },
  maybe: { label: 'Maybe', cls: 'bg-warning-bg text-stone border-terracotta/40' },
  not_going: { label: 'Not going', cls: 'bg-sand text-warm-gray border-warm-gray/40' },
  active: { label: 'Active', cls: 'bg-success-bg text-success-text border-success-text/30' },
  draft: { label: 'Draft', cls: 'bg-sand text-stone border-warm-gray/40' },
}

interface StatusPillProps {
  status: Status
  className?: string
}

export default function StatusPill({ status, className }: StatusPillProps) {
  const { label, cls } = config[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-sans font-medium tracking-wide uppercase border',
        cls,
        className,
      )}
    >
      {label}
    </span>
  )
}
