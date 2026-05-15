// Mock backing data for the laundry feature.
//
// In production this comes from Supabase (laundry_machines + laundry_sessions
// tables). The simulator assumes a smart relay sits between each machine and
// the wall socket. The app activates the relay over a webhook; in this PoC the
// relay endpoint is mocked in lib/laundry-relay.ts.

export type MachineType = 'washer' | 'dryer'

export type MachineStatus = 'available' | 'running' | 'out_of_order'

export interface LaundryMachine {
  id: string
  machine_number: number
  machine_type: MachineType
  floor: string
  block: string
  status: MachineStatus
  cycle_ends_at: string | null
  relay_endpoint: string | null
  price_sgd: number
  is_active: boolean
  fault_note?: string
  // Demo flag, set on the machine that the logged-in user is currently using.
  is_mine?: boolean
  current_session_id?: string
}

export type CycleTypeId = 'quick' | 'standard' | 'heavy'

export interface CycleType {
  id: CycleTypeId
  label: string
  minutes: number
  price: number
}

export const cycleTypes: CycleType[] = [
  { id: 'quick', label: 'Quick wash', minutes: 30, price: 2.0 },
  { id: 'standard', label: 'Standard', minutes: 45, price: 2.5 },
  { id: 'heavy', label: 'Heavy duty', minutes: 60, price: 3.0 },
]

export function getCycleType(id: CycleTypeId): CycleType {
  return cycleTypes.find((c) => c.id === id) ?? cycleTypes[1]!
}

const minutesAhead = (m: number) => new Date(Date.now() + m * 60_000).toISOString()

// Status mix per the addendum spec:
// 3 available, 3 running (varying remaining time), 1 running near completion,
// 1 out of order. 6 washers + 2 dryers across two floors of Block 57.
export const mockMachines: LaundryMachine[] = [
  {
    id: 'lm_01',
    machine_number: 1,
    machine_type: 'washer',
    floor: 'Level 1',
    block: 'Block 57',
    status: 'available',
    cycle_ends_at: null,
    relay_endpoint: null,
    price_sgd: 2.5,
    is_active: true,
  },
  {
    id: 'lm_02',
    machine_number: 2,
    machine_type: 'washer',
    floor: 'Level 1',
    block: 'Block 57',
    status: 'running',
    cycle_ends_at: minutesAhead(32),
    relay_endpoint: null,
    price_sgd: 2.5,
    is_active: true,
  },
  {
    id: 'lm_03',
    machine_number: 3,
    machine_type: 'washer',
    floor: 'Level 1',
    block: 'Block 57',
    status: 'running',
    cycle_ends_at: minutesAhead(8),
    relay_endpoint: null,
    price_sgd: 2.5,
    is_active: true,
    is_mine: true,
    current_session_id: 'ls_001',
  },
  {
    id: 'lm_04',
    machine_number: 4,
    machine_type: 'washer',
    floor: 'Level 1',
    block: 'Block 57',
    status: 'out_of_order',
    cycle_ends_at: null,
    relay_endpoint: null,
    price_sgd: 2.5,
    is_active: true,
    fault_note: 'Drum imbalance, reported 9 May. Vendor en route.',
  },
  {
    id: 'lm_05',
    machine_number: 5,
    machine_type: 'dryer',
    floor: 'Level 1',
    block: 'Block 57',
    status: 'available',
    cycle_ends_at: null,
    relay_endpoint: null,
    price_sgd: 2.5,
    is_active: true,
  },
  {
    id: 'lm_06',
    machine_number: 6,
    machine_type: 'washer',
    floor: 'Level 3',
    block: 'Block 57',
    status: 'available',
    cycle_ends_at: null,
    relay_endpoint: null,
    price_sgd: 2.5,
    is_active: true,
  },
  {
    id: 'lm_07',
    machine_number: 7,
    machine_type: 'washer',
    floor: 'Level 3',
    block: 'Block 57',
    status: 'running',
    cycle_ends_at: minutesAhead(19),
    relay_endpoint: null,
    price_sgd: 2.5,
    is_active: true,
  },
  {
    id: 'lm_08',
    machine_number: 8,
    machine_type: 'dryer',
    floor: 'Level 3',
    block: 'Block 57',
    status: 'available',
    cycle_ends_at: null,
    relay_endpoint: null,
    price_sgd: 2.5,
    is_active: true,
  },
]

export interface LaundrySession {
  id: string
  user_id: string
  machine_id: string
  paid_at: string
  activated_at: string | null
  cycle_duration_minutes: number
  cycle_ends_at: string | null
  amount_paid: number
  payment_ref: string
  status: 'paid' | 'active' | 'completed' | 'abandoned'
}

export const mockMyActiveSession: LaundrySession | null = {
  id: 'ls_001',
  user_id: 'u_001',
  machine_id: 'lm_03',
  paid_at: minutesAhead(-22),
  activated_at: minutesAhead(-22),
  cycle_duration_minutes: 30,
  cycle_ends_at: minutesAhead(8),
  amount_paid: 2.0,
  payment_ref: 'paynow_demo_001',
  status: 'active',
}

// Simple in-app balance. Tops up via PayNow.
export const mockBalance = {
  current: 12.5,
}

export function machinesByFloor(): { floor: string; machines: LaundryMachine[] }[] {
  const floors = Array.from(new Set(mockMachines.map((m) => m.floor)))
  return floors.map((floor) => ({
    floor,
    machines: mockMachines.filter((m) => m.floor === floor),
  }))
}

export function freeCount(): number {
  return mockMachines.filter((m) => m.status === 'available').length
}

export function totalCount(): number {
  return mockMachines.filter((m) => m.is_active).length
}
