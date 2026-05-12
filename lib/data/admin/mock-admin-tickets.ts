import type { TicketCategory, TicketStatus } from '../mock-maintenance'

export type Priority = 'low' | 'normal' | 'high' | 'urgent'

export interface AdminTicket {
  id: string
  student_id: string
  category: TicketCategory
  title: string
  description: string
  status: TicketStatus
  priority: Priority
  technician?: string
  scheduled_at?: string
  block: string
  room_number: string
  created_at: string
  updated_at: string
  rating?: number
  rating_comment?: string
  admin_note?: string
}

const ago = (h: number) => new Date(Date.now() - h * 3600_000).toISOString()
const ahead = (h: number) => new Date(Date.now() + h * 3600_000).toISOString()

export const mockAdminTickets: AdminTicket[] = [
  { id: 'tk_a_023', student_id: 's_014', category: 'aircon', title: 'Aircon dripping water onto floor', description: 'Started this morning, small puddle forming. Tray seems full.', status: 'submitted', priority: 'high', block: '59', room_number: '308', created_at: ago(3), updated_at: ago(3) },
  { id: 'tk_a_022', student_id: 's_004', category: 'electrical', title: 'Power socket sparks when plugged', description: 'Bedside socket sparked twice today. Have stopped using it.', status: 'submitted', priority: 'urgent', block: '57', room_number: '411', created_at: ago(5), updated_at: ago(5) },
  { id: 'tk_a_021', student_id: 's_011', category: 'plumbing', title: 'Toilet flush stuck', description: 'Handle goes down but no flush. Tried jiggling.', status: 'assigned', priority: 'high', technician: 'Wei Ming, Housing Maintenance', block: '53', room_number: '112', created_at: ago(8), updated_at: ago(2) },
  { id: 'tk_a_020', student_id: 's_001', category: 'aircon', title: 'Bimonthly aircon servicing', description: 'Scheduled cleaning and gas top up for both units.', status: 'assigned', priority: 'normal', technician: 'Mr Tan, Cool Breeze Services', scheduled_at: ahead(48), block: '57', room_number: '412', created_at: ago(168), updated_at: ago(48) },
  { id: 'tk_a_019', student_id: 's_001', category: 'plumbing', title: 'Bathroom sink draining slowly', description: 'Water sits for over a minute before draining.', status: 'in_progress', priority: 'normal', technician: 'Wei Ming, Housing Maintenance', block: '57', room_number: '412', created_at: ago(96), updated_at: ago(26) },
  { id: 'tk_a_018', student_id: 's_007', category: 'internet', title: 'Wifi keeps dropping in the evenings', description: 'Around 7pm to 11pm, signal drops every 10 minutes. Other floors fine.', status: 'in_progress', priority: 'normal', technician: 'IT Services', block: '55', room_number: '203', created_at: ago(72), updated_at: ago(18) },
  { id: 'tk_a_017', student_id: 's_009', category: 'furniture', title: 'Desk drawer track broken', description: 'Drawer fell out when opened, track on one side is bent.', status: 'in_progress', priority: 'low', technician: 'Block 55 RA team', block: '55', room_number: '215', created_at: ago(120), updated_at: ago(24) },
  { id: 'tk_a_016', student_id: 's_010', category: 'pest', title: 'Ants in pantry corner', description: 'Trail along skirting board, traced to a crack near the window.', status: 'in_progress', priority: 'normal', technician: 'Rentokil', block: '53', room_number: '108', created_at: ago(144), updated_at: ago(40) },
  { id: 'tk_a_015', student_id: 's_002', category: 'aircon', title: 'Aircon not cooling enough', description: 'Set to 22, room stays 26. Filter looks clean.', status: 'resolved', priority: 'normal', technician: 'Cool Breeze Services', block: '57', room_number: '408', rating: 4, rating_comment: 'Quick fix, gas was low.', created_at: ago(200), updated_at: ago(170) },
  { id: 'tk_a_014', student_id: 's_001', category: 'electrical', title: 'Bedside lamp not working', description: 'Replaced bulb, still nothing. Socket suspect.', status: 'resolved', priority: 'normal', technician: 'Wei Ming, Housing Maintenance', block: '57', room_number: '412', rating: 5, rating_comment: 'Quick, on time, very tidy.', created_at: ago(480), updated_at: ago(440) },
  { id: 'tk_a_013', student_id: 's_006', category: 'plumbing', title: 'Shower head leaks at the joint', description: 'Drips while not in use. Towel underneath catching it.', status: 'resolved', priority: 'low', technician: 'Wei Ming, Housing Maintenance', block: '57', room_number: '410', rating: 4, created_at: ago(720), updated_at: ago(690) },
  { id: 'tk_a_012', student_id: 's_008', category: 'furniture', title: 'Wardrobe door hinge loose', description: 'Top hinge wobbly, door does not close flush.', status: 'resolved', priority: 'low', technician: 'Block 55 RA team', block: '55', room_number: '207', rating: 5, created_at: ago(960), updated_at: ago(890) },
  { id: 'tk_a_011', student_id: 's_013', category: 'internet', title: 'No connection in room', description: 'Wifi visible but cannot connect since yesterday.', status: 'resolved', priority: 'high', technician: 'IT Services', block: '59', room_number: '303', rating: 3, rating_comment: 'Took longer than expected but sorted.', created_at: ago(1200), updated_at: ago(1100) },
  { id: 'tk_a_010', student_id: 's_017', category: 'other', title: 'Smoke detector chirping', description: 'Single short beep every minute through the night.', status: 'resolved', priority: 'normal', technician: 'Block 55 RA team', block: '55', room_number: '220', rating: 5, created_at: ago(1440), updated_at: ago(1380) },
  { id: 'tk_a_009', student_id: 's_005', category: 'electrical', title: 'Bathroom fan very loud', description: 'Rattling and squealing. Sounds like a fan blade is hitting the housing.', status: 'cancelled', priority: 'low', block: '57', room_number: '405', admin_note: 'Resident cancelled, sound resolved on its own.', created_at: ago(1680), updated_at: ago(1640) },
]

export const ticketCounts = {
  open: mockAdminTickets.filter((t) => t.status === 'submitted').length,
  assigned: mockAdminTickets.filter((t) => t.status === 'assigned').length,
  in_progress: mockAdminTickets.filter((t) => t.status === 'in_progress').length,
  resolved: mockAdminTickets.filter((t) => t.status === 'resolved').length,
  urgent: mockAdminTickets.filter((t) => t.priority === 'urgent' && t.status !== 'resolved' && t.status !== 'cancelled').length,
}
