import AdminTopbar from '@/components/admin/AdminTopbar'
import AdminStudents from '@/components/admin/AdminStudents'

export const metadata = { title: 'Residents, Admin' }

export default function AdminStudentsPage() {
  return (
    <>
      <AdminTopbar title="Resident directory" subtitle="Every student on file, with their housing, contact, and account state." />
      <main className="flex-1">
        <AdminStudents />
      </main>
    </>
  )
}
