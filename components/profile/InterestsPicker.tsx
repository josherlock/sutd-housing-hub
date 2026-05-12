'use client'

import { useMemo, useState } from 'react'
import { interestsByCategory, interestCategoryLabels, allInterests } from '@/lib/data/interests'
import { Check, Plus, Search, X } from 'lucide-react'

interface InterestsPickerProps {
  value: string[]
  onChange: (next: string[]) => void
}

export default function InterestsPicker({ value, onChange }: InterestsPickerProps) {
  const [q, setQ] = useState('')
  const [customInput, setCustomInput] = useState('')

  const grouped = useMemo(() => interestsByCategory(), [])
  const lower = value.map((v) => v.toLowerCase())

  function toggle(label: string) {
    if (lower.includes(label.toLowerCase())) {
      onChange(value.filter((v) => v.toLowerCase() !== label.toLowerCase()))
    } else {
      onChange([...value, label])
    }
  }

  function addCustom() {
    const v = customInput.trim()
    if (!v) return
    if (!lower.includes(v.toLowerCase())) onChange([...value, v])
    setCustomInput('')
  }

  function removeAt(label: string) {
    onChange(value.filter((v) => v !== label))
  }

  const filtered = (tags: typeof allInterests) =>
    q.trim() ? tags.filter((t) => t.label.toLowerCase().includes(q.trim().toLowerCase())) : tags

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium tracking-widest uppercase text-stone">
            Your interests
          </span>
          <span className="text-[10px] tracking-widest uppercase text-warm-gray">
            {value.length} picked
          </span>
        </div>
        <div className="flex flex-wrap gap-2 min-h-[40px] p-3 bg-sand/40 border border-warm-gray/20">
          {value.length === 0 && (
            <p className="text-xs text-stone py-1">
              Pick a few below and we will suggest clubs and events you might enjoy.
            </p>
          )}
          {value.map((v) => (
            <span
              key={v}
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 bg-terracotta/10 text-terracotta-dark border border-terracotta/30"
            >
              {v}
              <button
                type="button"
                onClick={() => removeAt(v)}
                className="text-terracotta hover:text-terracotta-dark transition-colors"
                aria-label={`Remove ${v}`}
              >
                <X size={11} strokeWidth={1.5} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search interests"
            className="w-full pl-9 pr-3 py-2 border border-warm-gray/40 bg-warm-white text-charcoal text-sm focus:outline-none focus:border-terracotta"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addCustom()
              }
            }}
            placeholder="Add your own"
            className="px-3 py-2 border border-warm-gray/40 bg-warm-white text-charcoal text-sm focus:outline-none focus:border-terracotta w-40"
          />
          <button
            type="button"
            onClick={addCustom}
            disabled={!customInput.trim()}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium tracking-wide uppercase text-stone border border-warm-gray/30 hover:border-warm-gray/60 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus size={12} strokeWidth={1.5} />
            Add
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {grouped.map(({ category, tags }) => {
          const visible = filtered(tags)
          if (visible.length === 0) return null
          return (
            <div key={category}>
              <p className="text-[10px] tracking-widest uppercase text-stone/70 mb-2">
                {interestCategoryLabels[category]}
              </p>
              <div className="flex flex-wrap gap-2">
                {visible.map((t) => {
                  const active = lower.includes(t.label.toLowerCase())
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => toggle(t.label)}
                      className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 border transition-colors ${
                        active
                          ? 'bg-terracotta/10 text-terracotta-dark border-terracotta/40'
                          : 'bg-warm-white border-warm-gray/30 text-stone hover:border-warm-gray/60 hover:text-charcoal'
                      }`}
                    >
                      {active && <Check size={11} strokeWidth={1.5} />}
                      {t.label}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
