import AdminTopbar from '@/components/admin/AdminTopbar'
import AdminPayments from '@/components/admin/AdminPayments'

export const metadata = { title: 'Payments, Admin' }

export default function AdminPaymentsPage() {
  return (
    <>
      <AdminTopbar title="Payments and invoices" subtitle="Track outstanding fees, chase late payers, reconcile receipts." />
      <main className="flex-1">
        <AdminPayments />
      </main>
    </>
  )
}
