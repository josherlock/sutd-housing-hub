// Mock smart-relay layer.
//
// In production this posts to the relay_endpoint stored against each machine
// (e.g. a Shelly 1 or Sonoff sitting between the wall socket and the washer).
// The relay closes the circuit, the machine powers on, and the next cycle the
// resident has already chosen on the kiosk runs.
//
// In this PoC the relay call resolves locally after a short delay, simulating
// the network round-trip you would see in production.

export interface RelayResult {
  success: boolean
  machine_id: string
  at: string
  message?: string
}

const ACTIVATE_DELAY_MS = 1500
const DEACTIVATE_DELAY_MS = 500

export async function activateMachine(machineId: string): Promise<RelayResult> {
  await new Promise((resolve) => setTimeout(resolve, ACTIVATE_DELAY_MS))
  if (typeof window !== 'undefined') {
    // Surface activations in the console so the demo feels real.
    // eslint-disable-next-line no-console
    console.log(`[mock relay] activated machine ${machineId}`)
  }
  return {
    success: true,
    machine_id: machineId,
    at: new Date().toISOString(),
    message: 'Relay closed, machine powered on.',
  }
}

export async function deactivateMachine(machineId: string): Promise<RelayResult> {
  await new Promise((resolve) => setTimeout(resolve, DEACTIVATE_DELAY_MS))
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-console
    console.log(`[mock relay] deactivated machine ${machineId}`)
  }
  return {
    success: true,
    machine_id: machineId,
    at: new Date().toISOString(),
    message: 'Relay opened, machine powered off.',
  }
}
