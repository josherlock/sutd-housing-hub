import MaintenancePageClient from '@/components/maintenance/MaintenancePageClient'
import { getMaintenanceTickets } from '@/lib/supabase/queries/maintenance'

export const metadata = { title: 'Maintenance' }

export default async function MaintenancePage() {
  const tickets = await getMaintenanceTickets()
  return <MaintenancePageClient tickets={tickets} />
}
