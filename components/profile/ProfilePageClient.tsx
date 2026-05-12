'use client'

import { useState } from 'react'
import Input, { Textarea } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import SectionLabel from '@/components/ui/SectionLabel'
import Badge from '@/components/ui/Badge'
import InterestsPicker from './InterestsPicker'
import SuggestionsPanel from './SuggestionsPanel'
import { mockUser, mockNotificationPrefs } from '@/lib/data/mock-user'
import { initials } from '@/lib/utils'
import { LogOut, Mail } from 'lucide-react'

export default function ProfilePageClient() {
  const [displayName, setDisplayName] = useState(mockUser.display_name)
  const [phone, setPhone] = useState(mockUser.phone)
  const [bio, setBio] = useState(mockUser.bio)
  const [interests, setInterests] = useState(mockUser.interests)
  const [prefs, setPrefs] = useState(mockNotificationPrefs)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }, 600)
  }

  return (
    <div className="container-narrow py-8 md:py-12 space-y-10">
      <header className="text-center space-y-5">
        <div className="inline-flex w-24 h-24 bg-sand text-charcoal rounded-full items-center justify-center font-display text-3xl">
          {initials(mockUser.full_name)}
        </div>
        <div>
          <h1 className="font-display text-4xl md:text-5xl text-charcoal leading-tight">
            {mockUser.full_name}
          </h1>
          <p className="text-stone mt-2 text-sm">{mockUser.email}</p>
        </div>
        <div className="inline-flex items-center gap-2 flex-wrap justify-center">
          <Badge tone="terracotta">{mockUser.classification}</Badge>
          <Badge tone="neutral">
            Block {mockUser.block}, Room {mockUser.room_number}
          </Badge>
        </div>
      </header>

      <SuggestionsPanel interests={interests} />

      <form onSubmit={save} className="space-y-10">
        <section className="space-y-5">
          <SectionLabel>About</SectionLabel>
          <Input
            label="Display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Textarea label="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
        </section>

        <section className="space-y-4">
          <SectionLabel>Interests</SectionLabel>
          <p className="text-sm text-stone leading-relaxed">
            Tell us what you like and we will quietly surface clubs and events that line up. The more
            you pick, the better the matches.
          </p>
          <InterestsPicker value={interests} onChange={setInterests} />
        </section>

        <section className="space-y-3">
          <SectionLabel>Housing</SectionLabel>
          <div className="bg-sand/50 border border-warm-gray/20 p-5 grid grid-cols-2 gap-4 text-sm">
            <Detail label="Student ID" value={mockUser.student_id} />
            <Detail label="Role" value={mockUser.role} />
            <Detail label="Block" value={mockUser.block} />
            <Detail label="Room" value={mockUser.room_number} />
            <Detail label="Classification" value={mockUser.classification} />
            <Detail
              label="Joined"
              value={new Date(mockUser.joined_at).toLocaleString('en-SG', {
                month: 'short',
                year: 'numeric',
              })}
            />
          </div>
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
                  aria-checked={prefs[key]}
                  onClick={() => setPrefs((p) => ({ ...p, [key]: !p[key] }))}
                  className={`relative w-11 h-6 shrink-0 transition-colors ${
                    prefs[key] ? 'bg-terracotta' : 'bg-warm-gray/40'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-warm-white transition-transform ${
                      prefs[key] ? 'translate-x-[22px]' : 'translate-x-0.5'
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

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] tracking-widest uppercase text-stone">{label}</p>
      <p className="font-medium text-charcoal mt-1 capitalize">{value}</p>
    </div>
  )
}
