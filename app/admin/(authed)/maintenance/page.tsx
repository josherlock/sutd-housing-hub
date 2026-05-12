import AdminTopbar from '@/components/admin/AdminTopbar'
import AdminMaintenance from '@/components/admin/AdminMaintenance'

export const metadata = { title: 'Maintenance, Admin' }

export default function AdminMaintenancePage() {
  return (
    <>
      <AdminTopbar title="Maintenance queue" subtitle="Track, assign, and close out housing maintenance tickets across all blocks." />
      <main className="flex-1">
        <AdminMaintenance />
      </main>
    </>
  )
}
