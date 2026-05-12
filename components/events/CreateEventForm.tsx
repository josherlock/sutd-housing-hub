'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Input, { Textarea, Select } from '@/components/ui/Input'
import SectionLabel from '@/components/ui/SectionLabel'
import { ArrowLeft, Camera, Check } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CreateEventForm() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [capped, setCapped] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setDone(true)
      setTimeout(() => router.push('/events'), 1000)
    }, 700)
  }

  if (done) {
    return (
      <div className="container-narrow py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex w-16 h-16 bg-success-bg text-success-text items-center justify-center"
        >
          <Check size={28} strokeWidth={1.5} />
        </motion.div>
        <h2 className="font-display text-3xl text-charcoal mt-6">Event posted.</h2>
        <p className="text-stone mt-3 text-sm">RSVPs will start rolling in shortly.</p>
      </div>
    )
  }

  return (
    <div className="container-narrow py-8 md:py-12">
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-stone hover:text-terracotta transition-colors"
      >
        <ArrowLeft size={14} strokeWidth={1.5} />
        Back
      </button>

      <header className="mt-6 mb-10">
        <SectionLabel>New event</SectionLabel>
        <h1 className="font-display text-4xl md:text-5xl text-charcoal mt-2 leading-tight">
          Host something.
        </h1>
      </header>

      <form onSubmit={onSubmit} className="space-y-6">
        <Input label="Title" placeholder="e.g. Sunday brunch potluck" required />
        <Textarea
          label="Description"
          placeholder="What is it, what should people bring, what is the vibe?"
          required
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <Select label="Category" required>
            <option value="social">Social</option>
            <option value="sports">Sports</option>
            <option value="academic">Academic</option>
            <option value="cultural">Cultural</option>
            <option value="official">Official</option>
          </Select>
          <Input label="Location" placeholder="e.g. Block 57 lounge" required />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Start" type="datetime-local" required />
          <Input label="End" type="datetime-local" required />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-3 text-sm text-charcoal cursor-pointer select-none">
            <input
              type="checkbox"
              checked={capped}
              onChange={(e) => setCapped(e.target.checked)}
              className="w-4 h-4 accent-terracotta"
            />
            Cap the number of attendees
          </label>
          {capped && <Input type="number" min={2} placeholder="e.g. 30" />}
        </div>

        <div className="space-y-2">
          <span className="text-xs font-medium tracking-widest uppercase text-stone">Cover image</span>
          <label className="flex items-center gap-3 px-5 py-4 border border-warm-gray/40 bg-warm-white cursor-pointer hover:border-warm-gray/60 transition-colors">
            <Camera size={18} strokeWidth={1.5} className="text-stone" />
            <span className="text-sm text-stone">Tap to upload, optional</span>
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Posting' : 'Post event'}
          </Button>
        </div>
      </form>
    </div>
  )
}
