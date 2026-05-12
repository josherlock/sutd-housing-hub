'use client'

import { Hash } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Channel } from '@/lib/data/mock-feed'

interface Props {
  channels: Channel[]
  active: string
  onSelect: (slug: string) => void
}

export default function ChannelList({ channels, active, onSelect }: Props) {
  const topics = channels.filter((c) => c.group === 'topics')
  const blocks = channels.filter((c) => c.group === 'block')

  return (
    <div className="space-y-6">
      <Group label="Topics" items={topics} active={active} onSelect={onSelect} />
      <Group label="Blocks" items={blocks} active={active} onSelect={onSelect} />
    </div>
  )
}

function Group({
  label,
  items,
  active,
  onSelect,
}: {
  label: string
  items: Channel[]
  active: string
  onSelect: (s: string) => void
}) {
  return (
    <div>
      <p className="text-[10px] tracking-widest uppercase text-stone/70 mb-2 px-3">{label}</p>
      <ul className="space-y-px">
        {items.map((c) => (
          <li key={c.slug}>
            <button
              type="button"
              onClick={() => onSelect(c.slug)}
              className={cn(
                'w-full flex items-center gap-2 px-3 py-2 text-sm font-sans transition-colors group',
                active === c.slug
                  ? 'bg-terracotta/10 text-charcoal'
                  : 'text-stone hover:bg-sand/50 hover:text-charcoal',
              )}
            >
              <Hash
                size={14}
                strokeWidth={1.5}
                className={active === c.slug ? 'text-terracotta' : 'text-warm-gray'}
              />
              <span className="flex-1 text-left">{c.name}</span>
              {typeof c.unread === 'number' && c.unread > 0 && (
                <span className="bg-terracotta text-warm-white text-[10px] font-medium px-1.5 min-w-[18px] h-[18px] inline-flex items-center justify-center">
                  {c.unread}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
