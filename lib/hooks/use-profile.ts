'use client'

import { useCallback, useMemo, useSyncExternalStore } from 'react'
import { mockUser, mockNotificationPrefs, type NotificationPrefs } from '@/lib/data/mock-user'

// The editable slice of a profile. Everything else (block, room, student id)
// comes from housing records and is read-only to the resident.
export interface ProfileEdits {
  display_name: string
  phone: string
  bio: string
  interests: string[]
  prefs: NotificationPrefs
}

const defaults: ProfileEdits = {
  display_name: mockUser.display_name,
  phone: mockUser.phone,
  bio: mockUser.bio,
  interests: mockUser.interests,
  prefs: mockNotificationPrefs,
}

const STORAGE_KEY = 'hh:profile:v1'
const CHANGE_EVENT = 'hh:profile-change'

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

function parse(raw: string | null): ProfileEdits {
  if (!raw) return defaults
  try {
    const stored = JSON.parse(raw) as Partial<ProfileEdits>
    return {
      ...defaults,
      ...stored,
      prefs: { ...defaults.prefs, ...(stored.prefs ?? {}) },
    }
  } catch {
    return defaults
  }
}

// Per-device profile edits layered over the mock user. Once auth lands this
// becomes a Supabase `profiles` table keyed by auth.users id.
export function useProfile() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const profile = useMemo(() => parse(raw), [raw])

  const save = useCallback((edits: ProfileEdits) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(edits))
    window.dispatchEvent(new Event(CHANGE_EVENT))
  }, [])

  return { profile, save }
}
