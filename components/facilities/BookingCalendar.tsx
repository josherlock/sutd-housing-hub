'use client'

import { useMemo, useState } from 'react'
import type { Facility, Booking } from '@/lib/data/mock-facilities'

interface Slot {
  start: Date
  end: Date
  status: 'free' | 'booked' | 'past'
}

function generateWeek(facility: Facility, bookings: Booking[]): Slot[][] {
  const days: Slot[][] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [fromH] = facility.available_from.split(':').map(Number)
  const [toH] = facility.available_to.split(':').map(Number)

  for (let d = 0; d < 7; d++) {
    const dayDate = new Date(today)
    dayDate.setDate(today.getDate() + d)
    const daySlots: Slot[] = []
    for (let h = fromH!; h < toH!; h++) {
      const start = new Date(dayDate)
      start.setHours(h, 0, 0, 0)
      const end = new Date(start)
      end.setHours(start.getHours() + 1)
      const booked = bookings.some(
        (b) => new Date(b.start_time) < end && new Date(b.end_time) > start,
      )
      const past = start < new Date()
      daySlots.push({
        start,
        end,
        status: past ? 'past' : booked ? 'booked' : 'free',
      })
    }
    days.push(daySlots)
  }
  return days
}

interface BookingCalendarProps {
  facility: Facility
  bookings: Booking[]
  onSelect: (slot: { start: Date; end: Date }) => void
}

export default function BookingCalendar({ facility, bookings, onSelect }: BookingCalendarProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const days = useMemo(() => generateWeek(facility, bookings), [facility, bookings])

  return (
    <div className="bg-warm-white border border-warm-gray/30 overflow-x-auto">
      <div className="min-w-[640px]">
        <div className="grid grid-cols-7 border-b border-warm-gray/20">
          {days.map((day, i) => {
            const date = day[0]!.start
            return (
              <div key={i} className="px-3 py-3 text-center border-r border-warm-gray/15 last:border-0">
                <p className="text-[10px] tracking-widest uppercase text-stone">
                  {date.toLocaleString('en-SG', { weekday: 'short' })}
                </p>
                <p className="font-display text-xl text-charcoal mt-1 leading-none">
                  {date.getDate()}
                </p>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-7">
          {days.map((day, i) => (
            <div key={i} className="border-r border-warm-gray/15 last:border-0">
              {day.map((slot) => {
                const key = slot.start.toISOString()
                const isSelected = selected === key
                const disabled = slot.status !== 'free'
                return (
                  <button
                    type="button"
                    key={key}
                    disabled={disabled}
                    onClick={() => {
                      setSelected(key)
                      onSelect({ start: slot.start, end: slot.end })
                    }}
                    className={`w-full h-10 text-[11px] border-b border-warm-gray/15 last:border-0 transition-colors ${
                      slot.status === 'past'
                        ? 'bg-sand/40 text-warm-gray/50 cursor-not-allowed'
                        : slot.status === 'booked'
                        ? 'bg-sand text-stone/60 cursor-not-allowed line-through decoration-warm-gray/40'
                        : isSelected
                        ? 'bg-terracotta text-warm-white'
                        : 'bg-cream hover:bg-terracotta/10 text-charcoal'
                    }`}
                  >
                    {slot.start.toLocaleString('en-SG', {
                      hour: 'numeric',
                      hour12: true,
                    })}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
