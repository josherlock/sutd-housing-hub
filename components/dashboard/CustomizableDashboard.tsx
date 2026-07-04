'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  useDashboardLayout,
  sectionLabels,
  type SectionId,
} from '@/lib/hooks/use-dashboard-layout'
import { ArrowUp, ArrowDown, EyeOff, Plus, SlidersHorizontal, Check, RotateCcw } from 'lucide-react'

interface CustomizableDashboardProps {
  // Server-rendered section content, keyed by section id.
  sections: Partial<Record<SectionId, React.ReactNode>>
}

// Notion-style arrangeable dashboard, kept deliberately quiet: a single
// "Customise" affordance, then per-section reorder/hide controls.
export default function CustomizableDashboard({ sections }: CustomizableDashboardProps) {
  const { order, hidden, move, toggle, reset, isCustomised } = useDashboardLayout()
  const [editing, setEditing] = useState(false)

  const visible = order.filter((id) => !hidden.includes(id) && sections[id])

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-end gap-4 -mb-4">
        {editing && isCustomised && (
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-stone hover:text-terracotta transition-colors"
          >
            <RotateCcw size={12} strokeWidth={1.5} />
            Reset
          </button>
        )}
        <button
          onClick={() => setEditing((e) => !e)}
          className={`inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase transition-colors ${
            editing ? 'text-terracotta' : 'text-stone/70 hover:text-terracotta'
          }`}
        >
          {editing ? <Check size={12} strokeWidth={1.5} /> : <SlidersHorizontal size={12} strokeWidth={1.5} />}
          {editing ? 'Done' : 'Customise'}
        </button>
      </div>

      {visible.map((id, idx) => (
        <motion.section key={id} layout transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
          {editing && (
            <div className="flex items-center justify-between border border-dashed border-warm-gray/40 border-b-0 bg-sand/40 px-4 py-2">
              <span className="text-[10px] tracking-widest uppercase text-stone">
                {sectionLabels[id]}
              </span>
              <div className="flex items-center gap-1">
                <SectionControl
                  label="Move up"
                  disabled={idx === 0}
                  onClick={() => move(id, -1)}
                  icon={<ArrowUp size={13} strokeWidth={1.5} />}
                />
                <SectionControl
                  label="Move down"
                  disabled={idx === visible.length - 1}
                  onClick={() => move(id, 1)}
                  icon={<ArrowDown size={13} strokeWidth={1.5} />}
                />
                <SectionControl
                  label="Hide section"
                  onClick={() => toggle(id)}
                  icon={<EyeOff size={13} strokeWidth={1.5} />}
                />
              </div>
            </div>
          )}
          <div className={editing ? 'border border-dashed border-warm-gray/40 p-4' : undefined}>
            {sections[id]}
          </div>
        </motion.section>
      ))}

      <AnimatePresence>
        {editing && hidden.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="flex flex-wrap items-center gap-3 border border-dashed border-warm-gray/40 bg-sand/40 px-4 py-3"
          >
            <span className="text-[10px] tracking-widest uppercase text-stone/70">Hidden</span>
            {hidden.map((id) => (
              <button
                key={id}
                onClick={() => toggle(id)}
                className="inline-flex items-center gap-1.5 text-[11px] tracking-wide uppercase text-stone bg-warm-white border border-warm-gray/30 hover:border-terracotta hover:text-terracotta px-3 py-1.5 transition-colors"
              >
                <Plus size={12} strokeWidth={1.5} />
                {sectionLabels[id]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SectionControl({
  label,
  icon,
  onClick,
  disabled,
}: {
  label: string
  icon: React.ReactNode
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="w-7 h-7 inline-flex items-center justify-center text-stone hover:text-terracotta disabled:opacity-30 disabled:hover:text-stone transition-colors"
    >
      {icon}
    </button>
  )
}
