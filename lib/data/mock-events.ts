export type EventCategory = 'sports' | 'social' | 'academic' | 'cultural' | 'official'

export interface CommunityEvent {
  id: string
  title: string
  description: string
  category: EventCategory
  start_time: string
  end_time: string
  location: string
  facility_booking_id?: string
  max_attendees?: number
  rsvp_count: number
  cover_tone: 'terracotta' | 'charcoal' | 'sand' | 'sage'
  organiser: string
  attendees: { name: string; avatar_tone: 'sand' | 'terracotta' | 'charcoal' }[]
}

export const mockEvents: CommunityEvent[] = [
  {
    id: 'ev_005',
    title: 'World Cup Watch Party',
    description: 'Round of 16 on the big screen. Free popcorn and drinks. Bring a friend, wear your team colours.',
    category: 'social',
    start_time: '2026-05-22T19:00:00',
    end_time: '2026-05-22T23:00:00',
    location: 'Multi-Purpose Hall',
    facility_booking_id: 'bk_002',
    max_attendees: 80,
    rsvp_count: 42,
    cover_tone: 'terracotta',
    organiser: 'Block 57 Residents Committee',
    attendees: [
      { name: 'Alex Tan', avatar_tone: 'terracotta' },
      { name: 'Priya Kumar', avatar_tone: 'sand' },
      { name: 'Marcus Tan', avatar_tone: 'charcoal' },
      { name: 'Aisha Rahman', avatar_tone: 'sand' },
    ],
  },
  {
    id: 'ev_004',
    title: 'Block 57 Game Night',
    description: 'Catan, Codenames, Mahjong. Snacks provided. Casual, bring your own drinks.',
    category: 'social',
    start_time: '2026-05-14T20:00:00',
    end_time: '2026-05-14T23:00:00',
    location: 'Block 57 Common Lounge',
    max_attendees: 30,
    rsvp_count: 18,
    cover_tone: 'sand',
    organiser: 'Block 57 Residents Committee',
    attendees: [
      { name: 'Alex Tan', avatar_tone: 'terracotta' },
      { name: 'Priya Kumar', avatar_tone: 'sand' },
      { name: 'Daniel Lim', avatar_tone: 'charcoal' },
    ],
  },
  {
    id: 'ev_003',
    title: 'Five-a-side Football, Casual Pickup',
    description: 'Open game on the outdoor field. Mixed skill level, all welcome. Bring water.',
    category: 'sports',
    start_time: '2026-05-15T18:30:00',
    end_time: '2026-05-15T20:00:00',
    location: 'Outdoor Field',
    max_attendees: 20,
    rsvp_count: 14,
    cover_tone: 'sage',
    organiser: 'Sports Club',
    attendees: [
      { name: 'Alex Tan', avatar_tone: 'terracotta' },
      { name: 'Marcus Tan', avatar_tone: 'charcoal' },
    ],
  },
  {
    id: 'ev_002',
    title: 'Finals Week Study Group, Algorithms',
    description: 'Group revision for 50.004. Bring past papers, we will work through them together.',
    category: 'academic',
    start_time: '2026-05-13T19:00:00',
    end_time: '2026-05-13T21:00:00',
    location: 'Meeting Room A',
    facility_booking_id: 'bk_003',
    max_attendees: 8,
    rsvp_count: 6,
    cover_tone: 'charcoal',
    organiser: 'Alex Tan',
    attendees: [
      { name: 'Alex Tan', avatar_tone: 'terracotta' },
      { name: 'Priya Kumar', avatar_tone: 'sand' },
      { name: 'Aisha Rahman', avatar_tone: 'sand' },
    ],
  },
  {
    id: 'ev_001',
    title: 'Sunrise Yoga, Outdoor Field',
    description: 'Gentle flow led by Mei. Mats provided, first come first served. Free for residents.',
    category: 'cultural',
    start_time: '2026-05-17T06:30:00',
    end_time: '2026-05-17T07:30:00',
    location: 'Outdoor Field',
    max_attendees: 25,
    rsvp_count: 11,
    cover_tone: 'sand',
    organiser: 'Wellness Club',
    attendees: [
      { name: 'Priya Kumar', avatar_tone: 'sand' },
      { name: 'Aisha Rahman', avatar_tone: 'sand' },
    ],
  },
]

export function getUpcomingEvents(limit?: number) {
  const now = Date.now()
  const upcoming = mockEvents
    .filter((e) => new Date(e.start_time).getTime() > now)
    .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
  return typeof limit === 'number' ? upcoming.slice(0, limit) : upcoming
}
