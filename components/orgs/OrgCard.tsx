import { Send, Camera, Mail, Clock, MapPin, BadgeCheck } from 'lucide-react'
import type { Org } from '@/lib/data/mock-orgs'
import { clusterMeta } from '@/lib/data/mock-orgs'

type ClusterTone = (typeof clusterMeta)[keyof typeof clusterMeta]['tone']

const toneClasses: Record<ClusterTone, string> = {
  rose: 'bg-terracotta-light/25 text-charcoal',
  sand: 'bg-sand text-charcoal',
  cream: 'bg-cream text-charcoal border-b border-warm-gray/20',
  charcoal: 'bg-charcoal text-warm-white',
  sage: 'bg-success-bg text-success-text',
  terracotta: 'bg-terracotta text-warm-white',
}

export default function OrgCard({ org }: { org: Org }) {
  const meta = clusterMeta[org.cluster]
  const tg = org.telegram?.startsWith('http') ? org.telegram : org.telegram ? `https://${org.telegram}` : null
  const ig = org.instagram ? `https://instagram.com/${org.instagram}` : null

  return (
    <article className="group bg-warm-white border border-warm-gray/30 hover:border-warm-gray/60 transition-all duration-300 flex flex-col">
      <div className={`${toneClasses[meta.tone]} px-5 py-4 flex items-center justify-between`}>
        <span className="text-[10px] tracking-widest uppercase opacity-80">{meta.label}</span>
        <span className="text-[10px] tracking-widest uppercase opacity-80">{org.type}</span>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start gap-2">
          <h3 className="font-display text-xl text-charcoal leading-tight">
            {org.name}
            {org.abbr && <span className="text-stone text-sm font-sans tracking-wide ml-2">({org.abbr})</span>}
          </h3>
          {org.is_verified && (
            <BadgeCheck size={14} strokeWidth={1.5} className="text-terracotta shrink-0 mt-1.5" />
          )}
        </div>
        <p className="text-sm text-stone mt-2 leading-relaxed flex-1">{org.description}</p>

        {(org.schedule || org.location) && (
          <div className="mt-4 space-y-1.5 text-xs text-stone">
            {org.schedule && (
              <p className="flex items-start gap-1.5">
                <Clock size={12} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                {org.schedule}
              </p>
            )}
            {org.location && (
              <p className="flex items-start gap-1.5">
                <MapPin size={12} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                {org.location}
              </p>
            )}
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-warm-gray/15 flex flex-wrap items-center gap-2">
          {tg && (
            <a
              href={tg}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase text-terracotta hover:text-terracotta-dark transition-colors"
            >
              <Send size={12} strokeWidth={1.5} />
              Telegram
            </a>
          )}
          {ig && (
            <a
              href={ig}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-stone hover:text-charcoal transition-colors"
            >
              <Camera size={12} strokeWidth={1.5} />
              Instagram
            </a>
          )}
          {org.email && (
            <a
              href={`mailto:${org.email}`}
              className="inline-flex items-center gap-1.5 text-xs text-stone hover:text-charcoal transition-colors"
            >
              <Mail size={12} strokeWidth={1.5} />
              Email
            </a>
          )}
          {typeof org.member_count === 'number' && (
            <span className="ml-auto text-[11px] text-warm-gray">{org.member_count} members</span>
          )}
        </div>
      </div>
    </article>
  )
}
