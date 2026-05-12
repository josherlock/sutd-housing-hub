import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata = { title: 'SUTD Housing Admin' }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-cream">
      <AdminSidebar />
      <div className="flex-1 min-w-0 flex flex-col">{children}</div>
    </div>
  )
}
