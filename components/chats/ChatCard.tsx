import { Send, Pin, Users } from 'lucide-react'
import type { Chat } from '@/lib/data/mock-chats'
import { scopeLabels } from '@/lib/data/mock-chats'
import { relativeTime } from '@/lib/utils'

export default function ChatCard({ chat }: { chat: Chat }) {
  const tgHref = chat.handle.startsWith('http') ? chat.handle : `https://${chat.handle}`

  return (
    <a
      href={tgHref}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4 bg-warm-white border border-warm-gray/30 hover:border-terracotta/50 p-5 transition-all duration-300"
    >
      <div className="w-12 h-12 bg-terracotta/10 text-terracotta-dark flex items-center justify-center font-display text-xl shrink-0">
        {chat.name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              {chat.pinned && <Pin size={12} strokeWidth={1.5} className="text-terracotta shrink-0" />}
              <h3 className="text-sm font-medium text-charcoal truncate">{chat.name}</h3>
              <span className="text-[10px] tracking-widest uppercase text-terracotta">
                {scopeLabels[chat.scope]}
              </span>
            </div>
            {chat.last_message && (
              <p className="text-xs text-stone mt-1.5 line-clamp-2 leading-relaxed">
                <span className="text-charcoal/80">{chat.last_message.author}</span>
                <span className="mx-1.5 text-warm-gray">·</span>
                {chat.last_message.body}
              </p>
            )}
          </div>
          {chat.unread > 0 && (
            <span className="bg-terracotta text-warm-white text-[10px] font-medium px-1.5 min-w-[20px] h-5 inline-flex items-center justify-center shrink-0">
              {chat.unread}
            </span>
          )}
        </div>
        <div className="mt-3 flex items-center gap-3 text-[11px] text-warm-gray">
          <span className="inline-flex items-center gap-1">
            <Users size={11} strokeWidth={1.5} />
            {chat.members.toLocaleString()}
          </span>
          {chat.last_message && (
            <>
              <span>·</span>
              <span>{relativeTime(chat.last_message.at)}</span>
            </>
          )}
          <span className="ml-auto inline-flex items-center gap-1 text-terracotta opacity-0 group-hover:opacity-100 transition-opacity">
            <Send size={11} strokeWidth={1.5} />
            Open in Telegram
          </span>
        </div>
      </div>
    </a>
  )
}
