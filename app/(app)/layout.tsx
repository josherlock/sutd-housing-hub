import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import MobileNav from '@/components/layout/MobileNav'
import { getOpenTicketCount } from '@/lib/supabase/queries/maintenance'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const openTickets = await getOpenTicketCount()
  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar openTickets={openTickets} />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar />
        <main className="flex-1 pb-24 lg:pb-12">{children}</main>
      </div>
      <MobileNav />
    </div>
  )
}
