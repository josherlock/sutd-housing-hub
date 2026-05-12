'use client'

import { useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import type { FeedPost } from '@/lib/data/mock-feed'
import { Pin, MessageCircle, Plus } from 'lucide-react'
import { relativeTime, cn } from '@/lib/utils'

const reactionLabels: Record<string, string> = {
  love: 'Love',
  plus: 'Plus one',
  noted: 'Noted',
  thanks: 'Thanks',
  interested: 'Interested',
  in: 'In',
}

const blockTones: Record<FeedPost['image_block'] extends infer T ? T extends { tone: infer X } ? X : never : never, string> = {
  terracotta: 'bg-terracotta/15 text-terracotta-dark',
  sand: 'bg-sand text-charcoal',
  charcoal: 'bg-charcoal text-warm-white',
}

export default function FeedPostCard({ post }: { post: FeedPost }) {
  const [reactions, setReactions] = useState(post.reactions)

  function toggleReaction(emoji: string) {
    setReactions((r) =>
      r.map((x) => (x.emoji === emoji ? { ...x, mine: !x.mine, count: x.count + (x.mine ? -1 : 1) } : x)),
    )
  }

  return (
    <article
      className={cn(
        'bg-warm-white border p-5 md:p-6 transition-all',
        post.is_pinned ? 'border-terracotta/50' : 'border-warm-gray/30',
      )}
    >
      {post.is_pinned && (
        <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-terracotta mb-4">
          <Pin size={12} strokeWidth={1.5} />
          Pinned {post.is_official && '· Official'}
        </div>
      )}
      <div className="flex items-start gap-3">
        <Avatar name={post.author_name} tone={post.author_tone} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-charcoal">{post.author_name}</span>
            <span className="text-[10px] tracking-wider text-stone">{post.author_room}</span>
            <span className="text-[10px] tracking-wider text-warm-gray">·</span>
            <span className="text-[11px] text-warm-gray">{relativeTime(post.created_at)}</span>
            <span className="ml-auto text-[10px] tracking-widest uppercase text-terracotta">
              #{post.category.replace('_', '-')}
            </span>
          </div>
          <p className="text-sm text-charcoal leading-relaxed mt-2">{post.body}</p>

          {post.image_block && (
            <div
              className={cn(
                'mt-3 h-40 flex items-center justify-center font-display text-xl tracking-wide',
                blockTones[post.image_block.tone],
              )}
            >
              {post.image_block.label}
            </div>
          )}

          <div className="mt-4 flex items-center gap-2 flex-wrap">
            {reactions.map((r) => (
              <button
                key={r.emoji}
                onClick={() => toggleReaction(r.emoji)}
                className={cn(
                  'inline-flex items-center gap-1.5 text-xs px-2.5 py-1 border transition-colors',
                  r.mine
                    ? 'border-terracotta bg-terracotta/10 text-terracotta-dark'
                    : 'border-warm-gray/30 text-stone hover:border-warm-gray/60',
                )}
              >
                <span className="font-medium">{reactionLabels[r.emoji] ?? r.emoji}</span>
                <span className="text-warm-gray">{r.count}</span>
              </button>
            ))}
            <button className="inline-flex items-center gap-1.5 text-xs px-2 py-1 text-stone hover:text-terracotta transition-colors">
              <Plus size={12} strokeWidth={1.5} />
              React
            </button>
            <span className="text-xs text-stone inline-flex items-center gap-1 ml-2">
              <MessageCircle size={12} strokeWidth={1.5} />
              {post.reply_count} {post.reply_count === 1 ? 'reply' : 'replies'}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
