'use client'

import { useState } from 'react'
import Input, { Textarea } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import SectionLabel from '@/components/ui/SectionLabel'
import Badge from '@/components/ui/Badge'
import InterestsPicker from './InterestsPicker'
import SuggestionsPanel from './SuggestionsPanel'
import { mockUser } from '@/lib/data/mock-user'
import { useProfile } from '@/lib/hooks/use-profile'
import { useNow } from '@/lib/hooks/use-now'
import { initials } from '@/lib/utils'
import { LogOut, Mail, CalendarRange, KeyRound, DoorOpen } from 'lucide-react'

function ordinal(n: number) {
  return n === 1 ? '1st' : n === 2 ? '2nd' : n === 3 ? '3rd' : `${n}th`
}

export default function ProfilePageClient() {
  const { profile, save } = useProfile()
  const now = useNow()

  const [draft, setDraft] = useState(profile)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  // Adopt values loaded from storage after hydration (render-phase adjustment,
  // not an effect). Also fires on cross-tab edits.
  const [prevProfile, setPrevProfile] = useState(profile)
  if (profile !== prevProfile) {
    setPrevProfile(profile)
    setDraft(profile)
  }

  const joined = new Date(mockUser.joined_at)
  const residentSince = joined.toLocaleDateString('en-SG', { month: 'long', year: 'numeric' })
  const yearOnCampus = now
    ? Math.max(1, Math.floor((now.getTime() - joined.getTime()) / (365.25 * 24 * 3600 * 1000)) + 1)
    : null

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    save(draft)
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }, 500)
  }

  return (
    <div className="container-narrow py-8 md:py-12 space-y-10">
      <header className="flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="w-24 h-24 shrink-0 bg-terracotta text-warm-white rounded-full flex items-center justify-center font-display text-3xl">
          {initials(mockUser.full_name)}
        </div>
        <div className="min-w-0">
          <p className="text-[11px] tracking-widest uppercase text-stone/70">
            Your profile · Resident since {residentSince}
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-charcoal leading-tight mt-2">
            {mockUser.full_name}.
          </h1>
          <p className="text-stone mt-2 text-sm">{mockUser.email}</p>
          <div className="flex items-center gap-2 flex-wrap mt-3">
            <Badge tone="terracotta">{mockUser.classification}</Badge>
            <Badge tone="neutral">
              Block {mockUser.block}, Room {mockUser.room_number}
            </Badge>
            {yearOnCampus && (
              <Badge tone="neutral">{ordinal(yearOnCampus)} year on campus</Badge>
            )}
          </div>
        </div>
      </header>

      <section className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-warm-gray/20 border border-warm-gray/30 bg-warm-white">
        <ResidencyFact
          icon={<DoorOpen size={16} strokeWidth={1.5} />}
          label="Moved in"
          value={residentSince}
        />
        <ResidencyFact
          icon={<KeyRound size={16} strokeWidth={1.5} />}
          label="Current room"
          value={`Block ${mockUser.block} · ${mockUser.room_number}`}
        />
        <ResidencyFact
          icon={<CalendarRange size={16} strokeWidth={1.5} />}
          label="Contract"
          value="Through Term 6"
        />
      </section>

      <SuggestionsPanel interests={draft.interests} />

      <form onSubmit={onSubmit} className="space-y-10">
        <section className="space-y-5">
          <SectionLabel>About</SectionLabel>
          <Input
            label="Display name"
            value={draft.display_name}
            onChange={(e) => setDraft((d) => ({ ...d, display_name: e.target.value }))}
          />
          <Input
            label="Phone"
            value={draft.phone}
            onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
          />
          <Textarea
            label="Bio"
            value={draft.bio}
            onChange={(e) => setDraft((d) => ({ ...d, bio: e.target.value }))}
          />
          <p className="text-xs text-stone/80">
            Your display name and interests shape your dashboard and what the app suggests to you.
          </p>
        </section>

        <section className="space-y-4">
          <SectionLabel>Interests</SectionLabel>
          <p className="text-sm text-stone leading-relaxed">
            Tell us what you like and we will quietly surface clubs and events that line up. The more
            you pick, the better the matches.
          </p>
          <InterestsPicker
            value={draft.interests}
            onChange={(interests) => setDraft((d) => ({ ...d, interests }))}
          />
        </section>

        <section className="space-y-3">
          <SectionLabel>Housing record</SectionLabel>
          <div className="bg-sand/50 border border-warm-gray/20 p-5 grid grid-cols-2 gap-4 text-sm">
            <Detail label="Student ID" value={mockUser.student_id} />
            <Detail label="Role" value={mockUser.role} />
            <Detail label="Block" value={mockUser.block} />
            <Detail label="Room" value={mockUser.room_number} />
            <Detail label="Classification" value={mockUser.classification} />
            <Detail
              label="Joined"
              value={joined.toLocaleString('en-SG', { month: 'short', year: 'numeric' })}
            />
          </div>
          <p className="text-xs text-stone/80">
            Managed by the Office of Housing. Spot an error? Raise it through a maintenance ticket or
            drop by the housing office.
          </p>
        </section>

        <section className="space-y-4">
          <SectionLabel>Notifications</SectionLabel>
          <div className="bg-warm-white border border-warm-gray/30 divide-y divide-warm-gray/15">
            {(
              [
                ['payment_reminders', 'Payment reminders', 'Heads up before each invoice is due.'],
                ['maintenance_updates', 'Maintenance updates', 'When your ticket changes state or a technician is assigned.'],
                ['event_rsvps', 'Event RSVPs', 'When someone joins your event or cancels.'],
                ['community_mentions', 'Community mentions', 'When someone @mentions you in a post or reply.'],
                ['weekly_digest', 'Weekly digest', 'A friendly summary every Sunday evening.'],
              ] as const
            ).map(([key, label, desc]) => (
              <label key={key} className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-charcoal">{label}</p>
                  <p className="text-xs text-stone mt-0.5">{desc}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={draft.prefs[key]}
                  onClick={() =>
                    setDraft((d) => ({ ...d, prefs: { ...d.prefs, [key]: !d.prefs[key] } }))
                  }
                  className={`relative w-11 h-6 shrink-0 transition-colors ${
                    draft.prefs[key] ? 'bg-terracotta' : 'bg-warm-gray/40'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-warm-white transition-transform ${
                      draft.prefs[key] ? 'translate-x-[22px]' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </label>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <SectionLabel>Account</SectionLabel>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline">
              <Mail size={14} strokeWidth={1.5} />
              Change email
            </Button>
            <Button variant="ghost">
              <LogOut size={14} strokeWidth={1.5} />
              Sign out
            </Button>
          </div>
        </section>

        <div className="sticky bottom-4 lg:bottom-0 flex justify-end items-center gap-3 pt-4">
          {saved && (
            <span className="text-xs tracking-widest uppercase text-success-text">Saved</span>
          )}
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving' : 'Save changes'}
          </Button>
        </div>
      </form>
    </div>
  )
}

function ResidencyFact({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-4 px-5 py-4">
      <div className="w-10 h-10 shrink-0 bg-sand text-charcoal flex items-center justify-center">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] tracking-widest uppercase text-stone">{label}</p>
        <p className="text-sm font-medium text-charcoal mt-0.5 truncate">{value}</p>
      </div>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] tracking-widest uppercase text-stone">{label}</p>
      <p className="font-medium text-charcoal mt-1 capitalize">{value}</p>
    </div>
  )
}
