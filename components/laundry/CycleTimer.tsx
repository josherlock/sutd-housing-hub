'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CycleTimerProps {
  cycleEndsAt: string
  size?: 'sm' | 'lg'
  tone?: 'light' | 'dark'
  onComplete?: () => void
}

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

export default function CycleTimer({ cycleEndsAt, size = 'lg', tone = 'light', onComplete }: CycleTimerProps) {
  const baseColor = tone === 'dark' ? 'text-warm-white' : 'text-charcoal'
  const subColor = tone === 'dark' ? 'text-warm-white/70' : 'text-stone/80'
  const target = useMemo(() => new Date(cycleEndsAt).getTime(), [cycleEndsAt])
  const [now, setNow] = useState<number>(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const remainingMs = Math.max(0, target - now)
  const totalSeconds = Math.floor(remainingMs / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const isDone = remainingMs <= 0
  const isUrgent = !isDone && totalSeconds <= 5 * 60

  useEffect(() => {
    if (isDone && onComplete) onComplete()
  }, [isDone, onComplete])

  if (isDone) {
    return (
      <div className={`relative ${size === 'lg' ? 'text-center' : ''}`}>
        <p
          className={`font-display leading-none ${baseColor} ${
            size === 'lg' ? 'text-5xl md:text-6xl' : 'text-3xl'
          }`}
        >
          Done.
        </p>
        <p className={`mt-3 ${subColor} ${size === 'lg' ? 'text-sm' : 'text-xs'}`}>
          Head down and collect your laundry.
        </p>
        <Confetti />
      </div>
    )
  }

  const numberColor = isUrgent ? 'text-terracotta-light' : baseColor
  const labelColor = isUrgent ? 'text-terracotta-light' : subColor

  return (
    <div className={size === 'lg' ? 'text-center' : ''}>
      <p
        className={`font-display leading-none transition-colors duration-500 ${numberColor} ${
          size === 'lg' ? 'text-6xl md:text-7xl' : 'text-3xl md:text-4xl'
        } tabular-nums`}
      >
        <span>{pad(minutes)}</span>
        <span className="opacity-60 mx-0.5">:</span>
        <span>{pad(seconds)}</span>
      </p>
      <p
        className={`mt-3 tracking-widest uppercase ${labelColor} ${
          size === 'lg' ? 'text-[11px]' : 'text-[10px]'
        }`}
      >
        {isUrgent ? 'Almost done' : 'Remaining'}
      </p>
    </div>
  )
}

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        x: Math.random() * 200 - 100,
        delay: Math.random() * 0.6,
        rotate: Math.random() * 360,
        colour: ['#DA0034', '#214975', '#E17400', '#FFD100', '#26C65A'][i % 5]!,
      })),
    [],
  )
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {pieces.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 0, y: -10, x: p.x, rotate: 0 }}
            animate={{ opacity: [0, 1, 1, 0], y: 160, rotate: p.rotate }}
            transition={{ duration: 2.4, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-1/2 w-2 h-3"
            style={{ backgroundColor: p.colour }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
