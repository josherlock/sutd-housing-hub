'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Check, QrCode } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Facility } from '@/lib/data/mock-facilities'
import { formatDate, formatTime } from '@/lib/utils'

interface BookingPanelProps {
  facility: Facility
  selectedSlot: { start: Date; end: Date } | null
}

export default function BookingPanel({ facility, selectedSlot }: BookingPanelProps) {
  const [purpose, setPurpose] = useState('')
  const [attendees, setAttendees] = useState(2)
  const [equipment, setEquipment] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  function toggleEquip(item: string) {
    setEquipment((eq) => (eq.includes(item) ? eq.filter((e) => e !== item) : [...eq, item]))
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setDone(true)
    }, 700)
  }

  if (!selectedSlot) {
    return (
      <div className="bg-sand/50 border border-warm-gray/20 p-8 text-center text-sm text-stone">
        Pick a slot on the calendar to start a booking.
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {done ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="bg-warm-white border border-warm-gray/30 p-6 md:p-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-success-bg text-success-text flex items-center justify-center shrink-0">
              <Check size={22} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[11px] tracking-widest uppercase text-success-text">Booking confirmed</p>
              <h3 className="font-display text-2xl text-charcoal mt-1 leading-tight">
                {facility.name}
              </h3>
              <p className="text-sm text-stone mt-2">
                {formatDate(selectedSlot.start, { weekday: 'long', day: 'numeric', month: 'long' })}
                <br />
                {formatTime(selectedSlot.start)} to {formatTime(selectedSlot.end)}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-sand p-6 flex flex-col items-center">
            <div className="w-40 h-40 bg-warm-white border border-warm-gray/30 flex items-center justify-center text-stone">
              <QrCode size={120} strokeWidth={0.6} />
            </div>
            <p className="text-[11px] tracking-widest uppercase text-stone mt-4">
              Scan at the door to check in
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
          onSubmit={submit}
          className="bg-warm-white border border-warm-gray/30 p-6 md:p-8 space-y-5"
        >
          <div>
            <p className="text-[11px] tracking-widest uppercase text-terracotta">Selected slot</p>
            <h3 className="font-display text-2xl text-charcoal mt-1 leading-tight">
              {formatDate(selectedSlot.start, { weekday: 'long', day: 'numeric', month: 'long' })}
            </h3>
            <p className="text-sm text-stone mt-1">
              {formatTime(selectedSlot.start)} to {formatTime(selectedSlot.end)}
            </p>
          </div>

          {facility.requires_approval && (
            <div className="bg-warning-bg border-l-2 border-terracotta px-4 py-3 text-sm text-stone">
              This space needs admin approval. You will be notified within 24 hours.
            </div>
          )}

          <Input
            label="Purpose"
            placeholder="e.g. CS group project sync"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />

          <Input
            label="Attendees"
            type="number"
            min={1}
            max={facility.capacity}
            value={attendees}
            onChange={(e) => setAttendees(Number(e.target.value))}
            hint={`Up to ${facility.capacity} for this space.`}
          />

          {facility.amenities.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium tracking-widest uppercase text-stone">Equipment</p>
              <div className="flex flex-wrap gap-2">
                {facility.amenities.map((a) => {
                  const active = equipment.includes(a)
                  return (
                    <button
                      type="button"
                      key={a}
                      onClick={() => toggleEquip(a)}
                      className={`text-xs px-3 py-1.5 border transition-colors ${
                        active
                          ? 'border-terracotta bg-terracotta/10 text-terracotta-dark'
                          : 'border-warm-gray/30 text-stone hover:border-warm-gray/60'
                      }`}
                    >
                      {a}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <div className="pt-2">
            <Button type="submit" fullWidth disabled={submitting}>
              {submitting ? 'Confirming' : facility.requires_approval ? 'Request booking' : 'Confirm booking'}
            </Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
