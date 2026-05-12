'use client'

import { useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import { mockUser } from '@/lib/data/mock-user'
import { Image as ImageIcon, Send } from 'lucide-react'

const categories = [
  { value: 'general', label: 'General' },
  { value: 'sports', label: 'Sports' },
  { value: 'food', label: 'Food' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'lost_found', label: 'Lost and found' },
  { value: 'for_sale', label: 'For sale' },
  { value: 'announcement', label: 'Announcement' },
  { value: 'housing', label: 'Housing' },
] as const

export default function PostComposer({ activeChannel }: { activeChannel: string }) {
  const [body, setBody] = useState('')
  const [category, setCategory] = useState<(typeof categories)[number]['value']>('general')
  const [submitting, setSubmitting] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!body.trim()) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setBody('')
    }, 500)
  }

  return (
    <form
      onSubmit={submit}
      className="bg-warm-white border border-warm-gray/30 p-4 md:p-5 flex gap-3"
    >
      <Avatar name={mockUser.full_name} tone="terracotta" />
      <div className="flex-1 flex flex-col gap-3">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={`Share something with #${activeChannel}`}
          className="w-full bg-transparent text-sm text-charcoal placeholder:text-stone/60 focus:outline-none resize-none"
          rows={2}
        />
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as (typeof categories)[number]['value'])}
              className="text-xs font-medium tracking-wide uppercase px-3 py-1.5 border border-warm-gray/30 bg-cream text-stone focus:outline-none focus:border-terracotta cursor-pointer appearance-none pr-8"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs text-stone hover:text-terracotta transition-colors"
            >
              <ImageIcon size={14} strokeWidth={1.5} />
              Photo
            </button>
          </div>
          <Button size="sm" type="submit" disabled={!body.trim() || submitting}>
            <Send size={14} strokeWidth={1.5} />
            {submitting ? 'Posting' : 'Post'}
          </Button>
        </div>
      </div>
    </form>
  )
}
