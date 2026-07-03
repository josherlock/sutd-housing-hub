'use server'

import { revalidatePath } from 'next/cache'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server'
import type { TicketCategory } from '@/lib/types/maintenance'

const validCategories: TicketCategory[] = [
  'aircon', 'electrical', 'plumbing', 'furniture', 'internet', 'pest', 'other',
]

export interface CreateTicketResult {
  ok: boolean
  error?: string
}

// Server Functions are reachable by direct POST, so validate everything here
// rather than trusting the form.
export async function createMaintenanceTicket(input: {
  category: TicketCategory
  title: string
  description: string
}): Promise<CreateTicketResult> {
  const title = input.title?.trim() ?? ''
  const description = input.description?.trim() ?? ''

  if (!validCategories.includes(input.category)) {
    return { ok: false, error: 'Pick a valid category.' }
  }
  if (title.length < 3 || title.length > 120) {
    return { ok: false, error: 'Title must be between 3 and 120 characters.' }
  }
  if (!description) {
    return { ok: false, error: 'Describe the issue so housing can triage it.' }
  }

  // Demo mode: pretend it worked so the flow stays demonstrable without a DB.
  if (!isSupabaseConfigured()) {
    console.warn('[maintenance] Supabase env vars missing, simulating ticket creation.')
    return { ok: true }
  }

  const supabase = await createClient()

  // user_id stays null pre-auth; once the permissive dev RLS policies are
  // replaced, unauthenticated inserts will be rejected by the database.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { error } = await supabase.from('maintenance_tickets').insert({
    category: input.category,
    title,
    description,
    user_id: user?.id ?? null,
  })

  if (error) {
    console.error('[maintenance] insert failed:', error.message)
    return { ok: false, error: 'Could not submit the request. Try again in a moment.' }
  }

  revalidatePath('/maintenance')
  return { ok: true }
}
