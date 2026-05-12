'use client'

import { useEffect, useState } from 'react'

export function useNow(intervalMs: number = 5000) {
  const [now, setNow] = useState<number>(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
}

export function formatRemaining(minutes: number) {
  if (minutes <= 0) return 'Done'
  const m = Math.floor(minutes)
  const s = Math.floor((minutes - m) * 60)
  if (m === 0) return `${s}s`
  if (m < 10) return `${m}m ${s.toString().padStart(2, '0')}s`
  return `${m}m`
}
