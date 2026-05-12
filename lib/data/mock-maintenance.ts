export type TicketCategory =
  | 'aircon'
  | 'electrical'
  | 'plumbing'
  | 'furniture'
  | 'internet'
  | 'pest'
  | 'other'

export type TicketStatus =
  | 'submitted'
  | 'assigned'
  | 'in_progress'
  | 'resolved'
  | 'cancelled'

export interface MaintenanceTicket {
  id: string
  category: TicketCategory
  title: string
  description: string
  status: TicketStatus
  scheduled_at?: string
  technician_name?: string
  rating?: number
  rating_comment?: string
  is_scheduled_service?: boolean
  created_at: string
  updated_at: string
  timeline: { stage: TicketStatus; at: string; note?: string }[]
}

export const mockTickets: MaintenanceTicket[] = [
  {
    id: 'tk_003',
    category: 'aircon',
    title: 'Bimonthly aircon servicing',
    description: 'Scheduled cleaning and gas top up for both units in Block 57, Room 412.',
    status: 'assigned',
    scheduled_at: '2026-05-18T14:00:00',
    technician_name: 'Mr Tan, Cool Breeze Services',
    is_scheduled_service: true,
    created_at: '2026-05-04T09:00:00',
    updated_at: '2026-05-09T16:20:00',
    timeline: [
      { stage: 'submitted', at: '2026-05-04T09:00:00', note: 'Auto-generated from servicing cycle' },
      { stage: 'assigned', at: '2026-05-09T16:20:00', note: 'Slot confirmed by Cool Breeze' },
    ],
  },
  {
    id: 'tk_002',
    category: 'plumbing',
    title: 'Bathroom sink draining slowly',
    description: 'Water sits in the sink for over a minute before draining. Looks like a clog further down the pipe.',
    status: 'in_progress',
    technician_name: 'Wei Ming, Housing Maintenance',
    created_at: '2026-05-07T19:42:00',
    updated_at: '2026-05-10T11:15:00',
    timeline: [
      { stage: 'submitted', at: '2026-05-07T19:42:00' },
      { stage: 'assigned', at: '2026-05-08T08:00:00', note: 'Wei Ming assigned' },
      { stage: 'in_progress', at: '2026-05-10T11:15:00', note: 'Technician arrived, inspecting drainage' },
    ],
  },
  {
    id: 'tk_001',
    category: 'electrical',
    title: 'Bedside lamp not working',
    description: 'Replaced the bulb but still no light. Suspect the socket.',
    status: 'resolved',
    technician_name: 'Wei Ming, Housing Maintenance',
    rating: 5,
    rating_comment: 'Quick, on time, very tidy.',
    created_at: '2026-04-22T20:10:00',
    updated_at: '2026-04-25T12:00:00',
    timeline: [
      { stage: 'submitted', at: '2026-04-22T20:10:00' },
      { stage: 'assigned', at: '2026-04-23T09:00:00' },
      { stage: 'in_progress', at: '2026-04-25T10:30:00' },
      { stage: 'resolved', at: '2026-04-25T12:00:00', note: 'Socket replaced, tested working.' },
    ],
  },
]

export function getOpenTicketCount() {
  return mockTickets.filter((t) => t.status !== 'resolved' && t.status !== 'cancelled').length
}
