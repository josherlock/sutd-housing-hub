'use client'

import { useMemo, useState } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import OrgCard from './OrgCard'
import { mockOrgs, clusterMeta, clusterCount, type OrgCluster } from '@/lib/data/mock-orgs'
import { Search, ExternalLink } from 'lucide-react'

const order: OrgCluster[] = ['arts', 'community', 'culture', 'makers', 'sports', 'student-groups']

export default function OrgsPageClient() {
  const [cluster, setCluster] = useState<OrgCluster | 'all'>('all')
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    let list = mockOrgs
    if (cluster !== 'all') list = list.filter((o) => o.cluster === cluster)
    if (q.trim()) {
      const needle = q.trim().toLowerCase()
      list = list.filter(
        (o) =>
          o.name.toLowerCase().includes(needle) ||
          o.abbr?.toLowerCase().includes(needle) ||
          o.type.toLowerCase().includes(needle) ||
          o.description.toLowerCase().includes(needle),
      )
    }
    return list
  }, [cluster, q])

  return (
    <div className="container-wide py-8 md:py-12 space-y-10">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <SectionLabel>Student organisations</SectionLabel>
          <h1 className="font-display text-4xl md:text-5xl text-charcoal mt-2 leading-tight">
            Find your people.
          </h1>
          <p className="text-stone mt-2 text-sm md:text-base max-w-xl">
            Every recognised student org at SUTD. Browse by cluster, search by name, jump straight to
            their Telegram or Instagram.
          </p>
          <a
            href="https://root.sutd.edu.sg/student-life/stu-org-directory"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-stone hover:text-terracotta transition-colors"
          >
            Source, ROOT student directory
            <ExternalLink size={12} strokeWidth={1.5} />
          </a>
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
            placeholder="Search clubs, types"
            className="w-full pl-9 pr-3 py-2.5 border border-warm-gray/40 bg-warm-white text-charcoal text-sm focus:outline-none focus:border-terracotta"
          />
        </div>
      </header>

      <div className="flex flex-wrap gap-2">
        <FilterPill active={cluster === 'all'} onClick={() => setCluster('all')}>
          All <span className="opacity-60">{mockOrgs.length}</span>
        </FilterPill>
        {order.map((c) => (
          <FilterPill key={c} active={cluster === c} onClick={() => setCluster(c)}>
            {clusterMeta[c].label} <span className="opacity-60">{clusterCount(c)}</span>
          </FilterPill>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-sand/50 border border-warm-gray/20 p-12 text-center text-sm text-stone">
          No organisations match your search.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((o) => (
            <OrgCard key={o.id} org={o} />
          ))}
        </div>
      )}

      <div className="bg-sand/40 border border-warm-gray/20 p-5 text-xs text-stone leading-relaxed">
        Arts cluster data sourced from ROOT student directory. Other clusters are seeded with
        representative orgs while we wait for the full export. Spot an error or a missing club? Open
        a request in the Office of Housing official chat.
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
      className={`text-xs font-medium tracking-wide uppercase px-3 py-2 border transition-colors inline-flex items-center gap-2 ${
        active
          ? 'border-charcoal bg-charcoal text-warm-white'
          : 'border-warm-gray/30 text-stone hover:border-warm-gray/60'
      }`}
    >
      {children}
    </button>
  )
}
