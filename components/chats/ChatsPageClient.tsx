'use client'

import { useMemo, useState } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import ChatCard from './ChatCard'
import { mockChats, scopeLabels, type ChatScope } from '@/lib/data/mock-chats'
import { Search, Send } from 'lucide-react'

const order: ChatScope[] = ['block', 'official', 'sports', 'study', 'social', 'marketplace']

export default function ChatsPageClient() {
  const [scope, setScope] = useState<ChatScope | 'all'>('all')
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    let list = mockChats
    if (scope !== 'all') list = list.filter((c) => c.scope === scope)
    if (q.trim()) {
      const needle = q.trim().toLowerCase()
      list = list.filter(
        (c) => c.name.toLowerCase().includes(needle) || c.description.toLowerCase().includes(needle),
      )
    }
    return list
  }, [scope, q])

  const pinned = filtered.filter((c) => c.pinned)
  const rest = filtered.filter((c) => !c.pinned)

  return (
    <div className="container-wide py-8 md:py-12 space-y-10">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <SectionLabel>Chats</SectionLabel>
          <h1 className="font-display text-4xl md:text-5xl text-charcoal mt-2 leading-tight">
            Talk to your block, talk to campus.
          </h1>
          <p className="text-stone mt-2 text-sm md:text-base max-w-xl">
            Every chat that matters in one place. Tap to open it in Telegram, the conversation stays
            where you already use it.
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search
            size={14}
            strokeWidth={1.5}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray"
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search chats"
            className="w-full pl-9 pr-3 py-2.5 border border-warm-gray/40 bg-warm-white text-charcoal text-sm focus:outline-none focus:border-terracotta"
          />
        </div>
      </header>

      <div className="flex flex-wrap gap-2">
        <FilterPill active={scope === 'all'} onClick={() => setScope('all')}>
          All
        </FilterPill>
        {order.map((s) => (
          <FilterPill key={s} active={scope === s} onClick={() => setScope(s)}>
            {scopeLabels[s]}
          </FilterPill>
        ))}
      </div>

      {pinned.length > 0 && (
        <section className="space-y-3">
          <p className="text-[10px] tracking-widest uppercase text-stone/70">Pinned</p>
          <div className="grid md:grid-cols-2 gap-4">
            {pinned.map((c) => (
              <ChatCard key={c.id} chat={c} />
            ))}
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="space-y-3">
          {pinned.length > 0 && <p className="text-[10px] tracking-widest uppercase text-stone/70">All chats</p>}
          <div className="grid md:grid-cols-2 gap-4">
            {rest.map((c) => (
              <ChatCard key={c.id} chat={c} />
            ))}
          </div>
        </section>
      )}

      {filtered.length === 0 && (
        <div className="bg-sand/50 border border-warm-gray/20 p-12 text-center text-sm text-stone">
          No chats here yet.
        </div>
      )}

      <div className="bg-charcoal text-warm-white p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 justify-between">
        <div>
          <p className="text-[11px] tracking-widest uppercase text-terracotta-light">Start something</p>
          <h2 className="font-display text-2xl md:text-3xl mt-2 leading-tight">
            Don&apos;t see your group? Spin up a new chat.
          </h2>
          <p className="text-sm text-warm-white/70 mt-2 max-w-md">
            Create a Telegram group, then submit the link here. We will list it so others can find
            you.
          </p>
        </div>
        <a
          href="https://t.me"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-terracotta text-warm-white px-6 py-3 text-sm font-medium tracking-wide hover:bg-terracotta-dark transition-colors"
        >
          <Send size={14} strokeWidth={1.5} />
          Open Telegram
        </a>
      </div>
    </div>
  )
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs font-medium tracking-wide uppercase px-3 py-2 border transition-colors ${
        active
          ? 'border-charcoal bg-charcoal text-warm-white'
          : 'border-warm-gray/30 text-stone hover:border-warm-gray/60'
      }`}
    >
      {children}
    </button>
  )
}
