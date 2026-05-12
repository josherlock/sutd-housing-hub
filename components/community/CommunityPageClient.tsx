'use client'

import { useMemo, useState } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import ChannelList from './ChannelList'
import PostComposer from './PostComposer'
import FeedPostCard from './FeedPost'
import { mockChannels, mockFeed } from '@/lib/data/mock-feed'
import { Menu, X } from 'lucide-react'

const channelCategoryMap: Record<string, string> = {
  general: 'general',
  announcements: 'announcement',
  sports: 'sports',
  gaming: 'gaming',
  food: 'food',
  study: 'general',
  'lost-and-found': 'lost_found',
  'for-sale': 'for_sale',
  'block-57': 'general',
  'block-55': 'general',
  'block-53': 'general',
}

export default function CommunityPageClient() {
  const [active, setActive] = useState('general')
  const [channelsOpen, setChannelsOpen] = useState(false)

  const posts = useMemo(() => {
    const pinned = mockFeed.filter((p) => p.is_pinned)
    if (active === 'general') return mockFeed
    const cat = channelCategoryMap[active]
    const rest = mockFeed.filter((p) => p.category === cat && !p.is_pinned)
    return [...pinned, ...rest]
  }, [active])

  return (
    <div className="container-wide py-8 md:py-12">
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <SectionLabel>Community</SectionLabel>
          <h1 className="font-display text-4xl md:text-5xl text-charcoal mt-2 leading-tight">
            #{active.replace('-', ' ')}
          </h1>
          <p className="text-stone mt-2 text-sm md:text-base max-w-xl">
            Where residents organise, swap, lend a hand. Be kind, be specific, and lurk to your
            heart&apos;s content.
          </p>
        </div>
        <button
          onClick={() => setChannelsOpen((v) => !v)}
          className="lg:hidden inline-flex items-center gap-2 text-xs tracking-widest uppercase text-stone border border-warm-gray/30 px-3 py-2"
        >
          {channelsOpen ? <X size={14} strokeWidth={1.5} /> : <Menu size={14} strokeWidth={1.5} />}
          Channels
        </button>
      </header>

      <div className="grid lg:grid-cols-[240px_1fr] gap-8">
        <aside
          className={`${channelsOpen ? 'block' : 'hidden'} lg:block bg-warm-white lg:bg-transparent border lg:border-0 border-warm-gray/30 p-4 lg:p-0`}
        >
          <ChannelList
            channels={mockChannels}
            active={active}
            onSelect={(s) => {
              setActive(s)
              setChannelsOpen(false)
            }}
          />
        </aside>

        <div className="space-y-5">
          <PostComposer activeChannel={active} />
          {posts.map((p) => (
            <FeedPostCard key={p.id} post={p} />
          ))}
        </div>
      </div>
    </div>
  )
}
