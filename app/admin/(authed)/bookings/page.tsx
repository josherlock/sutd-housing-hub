import AdminTopbar from '@/components/admin/AdminTopbar'
import AdminBookings from '@/components/admin/AdminBookings'

export const metadata = { title: 'Bookings, Admin' }

export default function AdminBookingsPage() {
  return (
    <>
      <AdminTopbar title="Facility bookings" subtitle="Approve, reject, and check on every booking across all spaces." />
      <main className="flex-1">
        <AdminBookings />
      </main>
    </>
  )
}
