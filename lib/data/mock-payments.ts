export type InvoiceStatus = 'unpaid' | 'paid' | 'overdue' | 'waived'

export interface Invoice {
  id: string
  description: string
  period: string
  amount: number
  tax: number
  due_date: string
  status: InvoiceStatus
  paid_at?: string
  receipt_url?: string
}

export const mockInvoices: Invoice[] = [
  {
    id: 'inv_005',
    description: 'Housing Fee, Term 6',
    period: 'May 2026 to Aug 2026',
    amount: 1850,
    tax: 0,
    due_date: '2026-05-25',
    status: 'unpaid',
  },
  {
    id: 'inv_004',
    description: 'Aircon servicing, bimonthly',
    period: 'May 2026',
    amount: 35,
    tax: 0,
    due_date: '2026-05-08',
    status: 'overdue',
  },
  {
    id: 'inv_003',
    description: 'Common area damage levy (waived)',
    period: 'Apr 2026',
    amount: 0,
    tax: 0,
    due_date: '2026-04-30',
    status: 'waived',
  },
  {
    id: 'inv_002',
    description: 'Housing Fee, Term 5',
    period: 'Jan 2026 to Apr 2026',
    amount: 1850,
    tax: 0,
    due_date: '2026-01-25',
    paid_at: '2026-01-12T10:32:00',
    status: 'paid',
    receipt_url: '#',
  },
  {
    id: 'inv_001',
    description: 'Refundable security deposit',
    period: 'Sep 2023',
    amount: 500,
    tax: 0,
    due_date: '2023-09-01',
    paid_at: '2023-08-21T09:14:00',
    status: 'paid',
    receipt_url: '#',
  },
]

export function getOutstandingTotal(): number {
  return mockInvoices
    .filter((i) => i.status === 'unpaid' || i.status === 'overdue')
    .reduce((sum, i) => sum + i.amount, 0)
}

export function getNextDue(): Invoice | null {
  const outstanding = mockInvoices
    .filter((i) => i.status === 'unpaid' || i.status === 'overdue')
    .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())
  return outstanding[0] ?? null
}
