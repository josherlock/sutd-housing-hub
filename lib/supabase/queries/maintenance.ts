import { createClient, isSupabaseConfigured } from '@/lib/supabase/server'
import { mockTickets } from '@/lib/data/mock-maintenance'
import type { MaintenanceTicket, TicketCategory, TicketStatus } from '@/lib/types/maintenance'

interface TicketRow {
  id: string
  code: string
  category: TicketCategory
  title: string
  description: string
  status: TicketStatus
  scheduled_at: string | null
  technician_name: string | null
  rating: number | null
  rating_comment: string | null
  is_scheduled_service: boolean
  created_at: string
  updated_at: string
  timeline: { stage: TicketStatus; at: string; note: string | null }[]
}

function toTicket(row: TicketRow): MaintenanceTicket {
  return {
    id: row.id,
    code: row.code,
    category: row.category,
    title: row.title,
    description: row.description,
    status: row.status,
    scheduled_at: row.scheduled_at ?? undefined,
    technician_name: row.technician_name ?? undefined,
    rating: row.rating ?? undefined,
    rating_comment: row.rating_comment ?? undefined,
    is_scheduled_service: row.is_scheduled_service,
    created_at: row.created_at,
    updated_at: row.updated_at,
    timeline: [...row.timeline]
      .sort((a, b) => a.at.localeCompare(b.at))
      .map((e) => ({ stage: e.stage, at: e.at, note: e.note ?? undefined })),
  }
}

export async function getMaintenanceTickets(): Promise<MaintenanceTicket[]> {
  // Until .env.local has Supabase credentials, keep the app runnable on mocks.
  if (!isSupabaseConfigured()) {
    console.warn('[maintenance] Supabase env vars missing, serving mock tickets.')
    return mockTickets
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('maintenance_tickets')
    .select('*, timeline:maintenance_ticket_events(stage, at, note)')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to load maintenance tickets: ${error.message}`)
  }

  return (data as TicketRow[]).map(toTicket)
}

export async function getOpenTicketCount(): Promise<number> {
  if (!isSupabaseConfigured()) {
    return mockTickets.filter((t) => t.status !== 'resolved' && t.status !== 'cancelled').length
  }

  const supabase = await createClient()
  const { count, error } = await supabase
    .from('maintenance_tickets')
    .select('id', { count: 'exact', head: true })
    .not('status', 'in', '(resolved,cancelled)')

  if (error) {
    throw new Error(`Failed to count open tickets: ${error.message}`)
  }

  return count ?? 0
}
