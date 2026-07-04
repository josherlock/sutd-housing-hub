// Campus-aware helpers for the ambient, "the app knows where you are in the
// year" touches. Pure functions so they render identically on server and
// client. Dates are approximate SUTD academic calendar; adjust each year.

interface Term {
  name: string
  start: string // inclusive
  end: string // inclusive
}

const terms: Term[] = [
  { name: 'Term 4', start: '2026-01-19', end: '2026-04-26' },
  { name: 'Term 5', start: '2026-05-11', end: '2026-08-16' },
  { name: 'Term 6', start: '2026-09-14', end: '2026-12-20' },
]

const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000

export function termLabel(date: Date): string {
  for (const term of terms) {
    const start = new Date(`${term.start}T00:00:00`)
    const end = new Date(`${term.end}T23:59:59`)
    if (date >= start && date <= end) {
      const week = Math.floor((date.getTime() - start.getTime()) / MS_PER_WEEK) + 1
      // Recess and finals get their own quiet labels near the end of term.
      if (week >= 14) return `Finals · ${term.name}`
      if (week === 7) return `Recess week · ${term.name}`
      return `Week ${week} · ${term.name}`
    }
  }
  return 'Term break'
}

export interface AmbientInput {
  hour: number
  freeMachines: number
  totalMachines: number
  openTickets: number
  nextBooking?: { facility: string; whenLabel: string }
  nextEvent?: { title: string; whenLabel: string }
}

// One calm, data-aware sentence under the greeting. Ordered by how actionable
// each fact is; falls back to a time-of-day line so it is never empty.
export function ambientLine(input: AmbientInput): string {
  const { hour, freeMachines, totalMachines, openTickets, nextBooking, nextEvent } = input

  if (nextBooking) {
    return `${nextBooking.facility} is yours ${nextBooking.whenLabel}.`
  }
  if (nextEvent) {
    return `${nextEvent.title} is on ${nextEvent.whenLabel}, if you feel like company.`
  }
  if (openTickets > 0) {
    return openTickets === 1
      ? 'Your maintenance request is moving along, tap the ticket for the latest.'
      : `${openTickets} maintenance requests are moving along, tap a ticket for the latest.`
  }
  if (freeMachines > 0 && (hour >= 20 || hour < 9)) {
    return `A quiet ${hour >= 20 ? 'night' : 'morning'} in the block, ${freeMachines} of ${totalMachines} machines free downstairs.`
  }
  if (hour < 12) return 'The block is slowly waking up. No loose ends on your account.'
  if (hour < 18) return 'All quiet on your account, nothing needs your attention.'
  return 'The day is winding down. Everything on your account is settled.'
}
