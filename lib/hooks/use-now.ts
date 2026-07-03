'use client'

import { useSyncExternalStore } from 'react'

const MINUTE = 60_000

function subscribe(onStoreChange: () => void) {
  const id = setInterval(onStoreChange, MINUTE)
  return () => clearInterval(id)
}

function getSnapshot() {
  return Math.floor(Date.now() / MINUTE)
}

function getServerSnapshot() {
  return null
}

// Current time at minute resolution. Returns null on the server and during
// hydration so server and client markup always match.
export function useNow(): Date | null {
  const minute = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return minute === null ? null : new Date(minute * MINUTE)
}
