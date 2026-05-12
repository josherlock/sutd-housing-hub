export type MachineKind = 'washer' | 'dryer'
export type MachineState =
  | 'available'
  | 'in_use'
  | 'finishing'
  | 'reserved'
  | 'out_of_order'

export interface CycleType {
  id: string
  label: string
  minutes: number
  price: number
  kind: MachineKind
}

export const cycleTypes: CycleType[] = [
  { id: 'quick', label: 'Quick wash', minutes: 28, price: 2.5, kind: 'washer' },
  { id: 'normal', label: 'Normal wash', minutes: 42, price: 3.0, kind: 'washer' },
  { id: 'heavy', label: 'Heavy wash', minutes: 58, price: 3.5, kind: 'washer' },
  { id: 'dry-low', label: 'Tumble dry, low', minutes: 35, price: 2.0, kind: 'dryer' },
  { id: 'dry-med', label: 'Tumble dry, medium', minutes: 45, price: 2.5, kind: 'dryer' },
  { id: 'dry-high', label: 'Tumble dry, high', minutes: 55, price: 3.0, kind: 'dryer' },
]

export interface Machine {
  id: string
  room_id: string
  label: string
  kind: MachineKind
  state: MachineState
  cycle_id?: string
  started_at?: string
  duration_minutes?: number
  reserved_by?: string
  reserved_for?: string
  current_user?: string
  is_mine?: boolean
  fault_note?: string
}

export interface LaundryRoom {
  id: string
  name: string
  block: string
  location: string
  notes?: string
}

export const mockRooms: LaundryRoom[] = [
  { id: 'r_57_l1', name: 'Block 57, Level 1', block: '57', location: 'Ground floor, next to lift lobby' },
  { id: 'r_55_l1', name: 'Block 55, Level 1', block: '55', location: 'Ground floor' },
  { id: 'r_53_l1', name: 'Block 53, Level 1', block: '53', location: 'Ground floor' },
]

const minutesAgo = (m: number) => new Date(Date.now() - m * 60_000).toISOString()
const minutesAhead = (m: number) => new Date(Date.now() + m * 60_000).toISOString()

export const mockMachines: Machine[] = [
  // Block 57
  { id: 'm_57_w1', room_id: 'r_57_l1', label: 'Washer 1', kind: 'washer', state: 'available' },
  {
    id: 'm_57_w2',
    room_id: 'r_57_l1',
    label: 'Washer 2',
    kind: 'washer',
    state: 'in_use',
    cycle_id: 'normal',
    started_at: minutesAgo(22),
    duration_minutes: 42,
    current_user: 'Block 57, Room 408',
  },
  {
    id: 'm_57_w3',
    room_id: 'r_57_l1',
    label: 'Washer 3',
    kind: 'washer',
    state: 'in_use',
    cycle_id: 'heavy',
    started_at: minutesAgo(55),
    duration_minutes: 58,
    current_user: 'Block 57, Room 412',
    is_mine: true,
  },
  {
    id: 'm_57_w4',
    room_id: 'r_57_l1',
    label: 'Washer 4',
    kind: 'washer',
    state: 'out_of_order',
    fault_note: 'Drum imbalanced, reported 9 May',
  },
  {
    id: 'm_57_w5',
    room_id: 'r_57_l1',
    label: 'Washer 5',
    kind: 'washer',
    state: 'reserved',
    reserved_by: 'Priya K.',
    reserved_for: minutesAhead(18),
  },
  { id: 'm_57_w6', room_id: 'r_57_l1', label: 'Washer 6', kind: 'washer', state: 'available' },
  { id: 'm_57_d1', room_id: 'r_57_l1', label: 'Dryer 1', kind: 'dryer', state: 'available' },
  {
    id: 'm_57_d2',
    room_id: 'r_57_l1',
    label: 'Dryer 2',
    kind: 'dryer',
    state: 'in_use',
    cycle_id: 'dry-med',
    started_at: minutesAgo(12),
    duration_minutes: 45,
    current_user: 'Block 57, Room 401',
  },
  {
    id: 'm_57_d3',
    room_id: 'r_57_l1',
    label: 'Dryer 3',
    kind: 'dryer',
    state: 'in_use',
    cycle_id: 'dry-high',
    started_at: minutesAgo(50),
    duration_minutes: 55,
    current_user: 'Block 57, Room 415',
  },
  { id: 'm_57_d4', room_id: 'r_57_l1', label: 'Dryer 4', kind: 'dryer', state: 'available' },

  // Block 55
  { id: 'm_55_w1', room_id: 'r_55_l1', label: 'Washer 1', kind: 'washer', state: 'in_use', cycle_id: 'normal', started_at: minutesAgo(10), duration_minutes: 42, current_user: 'Block 55, Room 203' },
  { id: 'm_55_w2', room_id: 'r_55_l1', label: 'Washer 2', kind: 'washer', state: 'available' },
  { id: 'm_55_w3', room_id: 'r_55_l1', label: 'Washer 3', kind: 'washer', state: 'available' },
  { id: 'm_55_w4', room_id: 'r_55_l1', label: 'Washer 4', kind: 'washer', state: 'out_of_order', fault_note: 'Door latch broken' },
  { id: 'm_55_d1', room_id: 'r_55_l1', label: 'Dryer 1', kind: 'dryer', state: 'in_use', cycle_id: 'dry-low', started_at: minutesAgo(30), duration_minutes: 35, current_user: 'Block 55, Room 207' },
  { id: 'm_55_d2', room_id: 'r_55_l1', label: 'Dryer 2', kind: 'dryer', state: 'available' },
  { id: 'm_55_d3', room_id: 'r_55_l1', label: 'Dryer 3', kind: 'dryer', state: 'available' },

  // Block 53
  { id: 'm_53_w1', room_id: 'r_53_l1', label: 'Washer 1', kind: 'washer', state: 'in_use', cycle_id: 'quick', started_at: minutesAgo(20), duration_minutes: 28, current_user: 'Block 53, Room 115' },
  { id: 'm_53_w2', room_id: 'r_53_l1', label: 'Washer 2', kind: 'washer', state: 'in_use', cycle_id: 'normal', started_at: minutesAgo(38), duration_minutes: 42, current_user: 'Block 53, Room 108' },
  { id: 'm_53_w3', room_id: 'r_53_l1', label: 'Washer 3', kind: 'washer', state: 'available' },
  { id: 'm_53_d1', room_id: 'r_53_l1', label: 'Dryer 1', kind: 'dryer', state: 'available' },
  { id: 'm_53_d2', room_id: 'r_53_l1', label: 'Dryer 2', kind: 'dryer', state: 'in_use', cycle_id: 'dry-med', started_at: minutesAgo(40), duration_minutes: 45, current_user: 'Block 53, Room 112' },
]

export interface LaundryReservation {
  id: string
  machine_id: string
  machine_label: string
  room_id: string
  room_name: string
  start_time: string
  cycle_id: string
  status: 'pending' | 'active' | 'done' | 'cancelled'
}

export const mockReservations: LaundryReservation[] = [
  {
    id: 'lr_001',
    machine_id: 'm_57_w1',
    machine_label: 'Washer 1',
    room_id: 'r_57_l1',
    room_name: 'Block 57, Level 1',
    start_time: minutesAhead(45),
    cycle_id: 'normal',
    status: 'pending',
  },
]

export interface WalletTransaction {
  id: string
  kind: 'topup' | 'spend' | 'refund'
  amount: number
  description: string
  method?: 'paynow' | 'paylah' | 'card'
  at: string
}

export interface Wallet {
  balance: number
  auto_topup: boolean
  transactions: WalletTransaction[]
}

export const mockWallet: Wallet = {
  balance: 18.5,
  auto_topup: false,
  transactions: [
    { id: 't_005', kind: 'spend', amount: -3.5, description: 'Heavy wash, Block 57 Washer 3', at: minutesAgo(55) },
    { id: 't_004', kind: 'spend', amount: -2.5, description: 'Tumble dry, Block 57 Dryer 2', at: minutesAgo(60 * 24 * 2) },
    { id: 't_003', kind: 'topup', amount: 20, description: 'Top up via PayNow', method: 'paynow', at: minutesAgo(60 * 24 * 2) },
    { id: 't_002', kind: 'spend', amount: -3.0, description: 'Normal wash, Block 57 Washer 2', at: minutesAgo(60 * 24 * 5) },
    { id: 't_001', kind: 'spend', amount: -2.0, description: 'Tumble dry, Block 57 Dryer 1', at: minutesAgo(60 * 24 * 5) },
  ],
}

export function machinesInRoom(roomId: string) {
  return mockMachines.filter((m) => m.room_id === roomId)
}

export function freeCountAcrossAllRooms() {
  return mockMachines.filter((m) => m.state === 'available').length
}

export function totalMachineCount() {
  return mockMachines.length
}

export function nextFreeIn(roomId: string): number | null {
  const machines = machinesInRoom(roomId)
  const running = machines.filter((m) => m.state === 'in_use' && m.started_at && m.duration_minutes)
  if (machines.some((m) => m.state === 'available')) return 0
  if (running.length === 0) return null
  const remainings = running.map((m) => {
    const elapsed = (Date.now() - new Date(m.started_at!).getTime()) / 60_000
    return Math.max(0, m.duration_minutes! - elapsed)
  })
  return Math.min(...remainings)
}

export function getCycleType(id?: string) {
  return cycleTypes.find((c) => c.id === id)
}
