'use client'

import { useCallback, useMemo, useSyncExternalStore } from 'react'

export type SectionId = 'events' | 'stats' | 'actions' | 'today'

export const defaultOrder: SectionId[] = ['events', 'stats', 'actions', 'today']

export const sectionLabels: Record<SectionId, string> = {
  events: 'Happening soon',
  stats: 'At a glance',
  actions: 'Quick actions',
  today: 'Your day, laundry & chats',
}

interface LayoutState {
  order: SectionId[]
  hidden: SectionId[]
}

const STORAGE_KEY = 'hh:dashboard-layout:v1'
const CHANGE_EVENT = 'hh:layout-change'

function subscribe(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange)
  window.addEventListener(CHANGE_EVENT, onStoreChange)
  return () => {
    window.removeEventListener('storage', onStoreChange)
    window.removeEventListener(CHANGE_EVENT, onStoreChange)
  }
}

function getSnapshot(): string | null {
  return localStorage.getItem(STORAGE_KEY)
}

function getServerSnapshot(): string | null {
  return null
}

function parse(raw: string | null): LayoutState {
  if (!raw) return { order: defaultOrder, hidden: [] }
  try {
    const parsed = JSON.parse(raw) as Partial<LayoutState>
    // Drop unknown ids and append any sections added since the save.
    const order = (parsed.order ?? []).filter((id): id is SectionId => defaultOrder.includes(id))
    for (const id of defaultOrder) if (!order.includes(id)) order.push(id)
    const hidden = (parsed.hidden ?? []).filter((id): id is SectionId => defaultOrder.includes(id))
    return { order, hidden }
  } catch {
    return { order: defaultOrder, hidden: [] }
  }
}

function save(state: LayoutState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

// Per-device dashboard layout. Once profiles are Supabase-backed this moves to
// a jsonb column on the profile so it follows the user across devices.
export function useDashboardLayout() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const state = useMemo(() => parse(raw), [raw])

  const move = useCallback(
    (id: SectionId, direction: -1 | 1) => {
      const order = [...state.order]
      const from = order.indexOf(id)
      const to = from + direction
      if (from < 0 || to < 0 || to >= order.length) return
      order.splice(from, 1)
      order.splice(to, 0, id)
      save({ ...state, order })
    },
    [state],
  )

  const toggle = useCallback(
    (id: SectionId) => {
      const hidden = state.hidden.includes(id)
        ? state.hidden.filter((h) => h !== id)
        : [...state.hidden, id]
      save({ ...state, hidden })
    },
    [state],
  )

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    window.dispatchEvent(new Event(CHANGE_EVENT))
  }, [])

  const isCustomised = raw !== null

  return { order: state.order, hidden: state.hidden, move, toggle, reset, isCustomised }
}
