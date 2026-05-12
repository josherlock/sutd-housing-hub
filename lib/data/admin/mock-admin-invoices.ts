import type { InvoiceStatus } from '../mock-payments'

export interface AdminInvoice {
  id: string
  student_id: string
  description: string
  period: string
  amount: number
  tax: number
  due_date: string
  status: InvoiceStatus
  paid_at?: string
  method?: 'paynow' | 'card' | 'paylah' | 'bank_transfer'
}

const day = (d: number) => {
  const dt = new Date()
  dt.setDate(dt.getDate() + d)
  return dt.toISOString().split('T')[0]!
}
const dayIso = (d: number) => {
  const dt = new Date()
  dt.setDate(dt.getDate() + d)
  return dt.toISOString()
}

export const mockAdminInvoices: AdminInvoice[] = [
  // Active term housing fees, 13 students (multiple statuses)
  { id: 'inv_a_001', student_id: 's_001', description: 'Housing Fee, Term 6', period: 'May to Aug 2026', amount: 1850, tax: 0, due_date: day(13), status: 'unpaid' },
  { id: 'inv_a_002', student_id: 's_002', description: 'Housing Fee, Term 6', period: 'May to Aug 2026', amount: 1850, tax: 0, due_date: day(13), status: 'paid', paid_at: dayIso(-5), method: 'paynow' },
  { id: 'inv_a_003', student_id: 's_003', description: 'Housing Fee, Term 6', period: 'May to Aug 2026', amount: 1850, tax: 0, due_date: day(13), status: 'paid', paid_at: dayIso(-2), method: 'card' },
  { id: 'inv_a_004', student_id: 's_004', description: 'Housing Fee, Term 6', period: 'May to Aug 2026', amount: 1850, tax: 0, due_date: day(13), status: 'unpaid' },
  { id: 'inv_a_005', student_id: 's_005', description: 'Housing Fee, Term 6', period: 'May to Aug 2026', amount: 1850, tax: 0, due_date: day(13), status: 'paid', paid_at: dayIso(-8), method: 'paynow' },
  { id: 'inv_a_006', student_id: 's_006', description: 'Housing Fee, Term 6', period: 'May to Aug 2026', amount: 1850, tax: 0, due_date: day(13), status: 'paid', paid_at: dayIso(-3), method: 'bank_transfer' },
  { id: 'inv_a_007', student_id: 's_007', description: 'Housing Fee, Term 6', period: 'May to Aug 2026', amount: 1850, tax: 0, due_date: day(13), status: 'unpaid' },
  { id: 'inv_a_008', student_id: 's_008', description: 'Housing Fee, Term 6', period: 'May to Aug 2026', amount: 1850, tax: 0, due_date: day(13), status: 'overdue' },
  { id: 'inv_a_009', student_id: 's_009', description: 'Housing Fee, Term 6', period: 'May to Aug 2026', amount: 1850, tax: 0, due_date: day(13), status: 'paid', paid_at: dayIso(-1), method: 'paylah' },
  { id: 'inv_a_010', student_id: 's_010', description: 'Housing Fee, Term 6', period: 'May to Aug 2026', amount: 1850, tax: 0, due_date: day(13), status: 'overdue' },
  { id: 'inv_a_011', student_id: 's_011', description: 'Housing Fee, Term 6', period: 'May to Aug 2026', amount: 1850, tax: 0, due_date: day(13), status: 'paid', paid_at: dayIso(-6), method: 'card' },
  { id: 'inv_a_012', student_id: 's_012', description: 'Housing Fee, Term 6', period: 'May to Aug 2026', amount: 1850, tax: 0, due_date: day(13), status: 'unpaid' },
  { id: 'inv_a_013', student_id: 's_013', description: 'Housing Fee, Term 6', period: 'May to Aug 2026', amount: 2050, tax: 0, due_date: day(13), status: 'paid', paid_at: dayIso(-4), method: 'paynow' },
  { id: 'inv_a_014', student_id: 's_014', description: 'Housing Fee, Term 6', period: 'May to Aug 2026', amount: 1850, tax: 0, due_date: day(13), status: 'unpaid' },
  { id: 'inv_a_015', student_id: 's_016', description: 'Housing Fee, Term 6', period: 'May to Aug 2026', amount: 1850, tax: 0, due_date: day(13), status: 'paid', paid_at: dayIso(-7), method: 'paynow' },
  { id: 'inv_a_016', student_id: 's_017', description: 'Housing Fee, Term 6', period: 'May to Aug 2026', amount: 1850, tax: 0, due_date: day(13), status: 'overdue' },
  { id: 'inv_a_017', student_id: 's_018', description: 'Housing Fee, Term 6', period: 'May to Aug 2026', amount: 1850, tax: 0, due_date: day(13), status: 'unpaid' },

  // Aircon servicing levies
  { id: 'inv_a_101', student_id: 's_001', description: 'Aircon servicing, bimonthly', period: 'May 2026', amount: 35, tax: 0, due_date: day(-4), status: 'overdue' },
  { id: 'inv_a_102', student_id: 's_002', description: 'Aircon servicing, bimonthly', period: 'May 2026', amount: 35, tax: 0, due_date: day(-4), status: 'paid', paid_at: dayIso(-2), method: 'paynow' },
  { id: 'inv_a_103', student_id: 's_004', description: 'Aircon servicing, bimonthly', period: 'May 2026', amount: 35, tax: 0, due_date: day(-4), status: 'paid', paid_at: dayIso(-3), method: 'paylah' },
  { id: 'inv_a_104', student_id: 's_010', description: 'Aircon servicing, bimonthly', period: 'May 2026', amount: 35, tax: 0, due_date: day(-4), status: 'overdue' },

  // Damage levies (rare)
  { id: 'inv_a_201', student_id: 's_015', description: 'Common area damage levy', period: 'Apr 2026', amount: 120, tax: 0, due_date: day(-30), status: 'paid', paid_at: dayIso(-25), method: 'card' },
]

export function invoicesByStudent(studentId: string) {
  return mockAdminInvoices.filter((i) => i.student_id === studentId)
}

export const invoiceTotals = {
  outstanding: mockAdminInvoices
    .filter((i) => i.status === 'unpaid' || i.status === 'overdue')
    .reduce((s, i) => s + i.amount, 0),
  paid_term: mockAdminInvoices.filter((i) => i.status === 'paid').reduce((s, i) => s + i.amount, 0),
  overdue_count: mockAdminInvoices.filter((i) => i.status === 'overdue').length,
}
