'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Input, { Textarea } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import SectionLabel from '@/components/ui/SectionLabel'
import { categoryIcons, categoryLabels } from './categoryIcons'
import type { TicketCategory } from '@/lib/data/mock-maintenance'
import { Camera, ArrowLeft, Check } from 'lucide-react'
import { motion } from 'framer-motion'

const categories: TicketCategory[] = ['aircon', 'electrical', 'plumbing', 'furniture', 'internet', 'pest', 'other']

export default function NewTicketForm() {
  const router = useRouter()
  const [category, setCategory] = useState<TicketCategory | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!category) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setDone(true)
      setTimeout(() => router.push('/maintenance'), 1100)
    }, 700)
  }

  if (done) {
    return (
      <div className="container-narrow py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex w-16 h-16 bg-success-bg text-success-text items-center justify-center"
        >
          <Check size={28} strokeWidth={1.5} />
        </motion.div>
        <h2 className="font-display text-3xl text-charcoal mt-6">Request submitted.</h2>
        <p className="text-stone mt-3 text-sm">
          Housing will triage your request within a working day. You will get updates here and on
          email.
        </p>
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
        <SectionLabel>New request</SectionLabel>
        <h1 className="font-display text-4xl md:text-5xl text-charcoal mt-2 leading-tight">
          What needs fixing?
        </h1>
      </header>

      <form onSubmit={onSubmit} className="space-y-10">
        <fieldset className="space-y-4">
          <legend className="text-[11px] tracking-widest uppercase text-stone">Category</legend>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {categories.map((c) => {
              const Icon = categoryIcons[c]
              const active = category === c
              return (
                <button
                  type="button"
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`flex flex-col items-center justify-center gap-2 aspect-square border transition-all ${
                    active
                      ? 'border-terracotta bg-terracotta/5'
                      : 'border-warm-gray/30 hover:border-warm-gray/60 bg-warm-white'
                  }`}
                >
                  <Icon size={22} strokeWidth={1.5} className={active ? 'text-terracotta' : 'text-charcoal'} />
                  <span className={`text-xs font-medium ${active ? 'text-terracotta-dark' : 'text-stone'}`}>
                    {categoryLabels[c]}
                  </span>
                </button>
              )
            })}
          </div>
        </fieldset>

        <Input
          label="Short title"
          placeholder="e.g. Aircon making a clicking sound"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          label="Describe the issue"
          placeholder="When did it start? Anything specific that triggers it? The more detail, the faster we can help."
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="space-y-2">
          <span className="text-xs font-medium tracking-widest uppercase text-stone">Photo</span>
          <label className="flex items-center gap-3 px-5 py-4 border border-warm-gray/40 bg-warm-white cursor-pointer hover:border-warm-gray/60 transition-colors">
            <Camera size={18} strokeWidth={1.5} className="text-stone" />
            <span className="text-sm text-stone">Tap to add a photo, optional</span>
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={!category || submitting}>
            {submitting ? 'Submitting' : 'Submit request'}
          </Button>
        </div>
      </form>
    </div>
  )
}
