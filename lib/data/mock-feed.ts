export type PostCategory =
  | 'general'
  | 'announcement'
  | 'lost_found'
  | 'for_sale'
  | 'sports'
  | 'gaming'
  | 'food'
  | 'housing'

export interface FeedPost {
  id: string
  author_name: string
  author_room: string
  author_tone: 'sand' | 'terracotta' | 'charcoal'
  body: string
  category: PostCategory
  created_at: string
  is_pinned?: boolean
  is_official?: boolean
  reactions: { emoji: string; count: number; mine?: boolean }[]
  reply_count: number
  image_block?: { tone: 'terracotta' | 'sand' | 'charcoal'; label: string }
}

export const mockFeed: FeedPost[] = [
  {
    id: 'p_008',
    author_name: 'Office of Housing',
    author_room: 'Official',
    author_tone: 'charcoal',
    body: 'Reminder, bimonthly aircon servicing for Block 57 runs from 18 to 22 May. Please book your slot via the Maintenance page before Thursday.',
    category: 'announcement',
    created_at: '2026-05-10T09:00:00',
    is_pinned: true,
    is_official: true,
    reactions: [{ emoji: 'noted', count: 24 }],
    reply_count: 3,
  },
  {
    id: 'p_007',
    author_name: 'Priya Kumar',
    author_room: 'Block 57, 408',
    author_tone: 'sand',
    body: 'Anyone keen to start a weekly Sunday brunch potluck in the common lounge? Thinking 11am, casual, everyone brings one dish.',
    category: 'food',
    created_at: '2026-05-11T08:15:00',
    reactions: [
      { emoji: 'love', count: 12, mine: true },
      { emoji: 'plus', count: 7 },
    ],
    reply_count: 6,
  },
  {
    id: 'p_006',
    author_name: 'Marcus Tan',
    author_room: 'Block 57, 401',
    author_tone: 'charcoal',
    body: 'Found a black hydroflask near the laundry room on Saturday night. DM me to claim, has a small dent on the lid.',
    category: 'lost_found',
    created_at: '2026-05-10T22:40:00',
    reactions: [{ emoji: 'thanks', count: 4 }],
    reply_count: 1,
  },
  {
    id: 'p_005',
    author_name: 'Aisha Rahman',
    author_room: 'Block 57, 411',
    author_tone: 'sand',
    body: 'Selling my old desk lamp, barely used. Warm light, dimmable. Twenty dollars, pickup from my room. First come first served.',
    category: 'for_sale',
    created_at: '2026-05-10T16:22:00',
    image_block: { tone: 'sand', label: 'Desk Lamp' },
    reactions: [{ emoji: 'interested', count: 3 }],
    reply_count: 2,
  },
  {
    id: 'p_004',
    author_name: 'Daniel Lim',
    author_room: 'Block 57, 405',
    author_tone: 'charcoal',
    body: 'Smash bros tournament in the lounge Friday 8pm, double elimination. Bracket fills out fast, drop your name in the replies.',
    category: 'gaming',
    created_at: '2026-05-09T19:11:00',
    reactions: [
      { emoji: 'love', count: 8 },
      { emoji: 'plus', count: 5 },
    ],
    reply_count: 11,
  },
  {
    id: 'p_003',
    author_name: 'Alex Tan',
    author_room: 'Block 57, 412',
    author_tone: 'terracotta',
    body: 'Looking for two more for futsal tomorrow 8pm at ISH 1. Pretty casual, let me know.',
    category: 'sports',
    created_at: '2026-05-09T13:02:00',
    reactions: [{ emoji: 'in', count: 5 }],
    reply_count: 4,
  },
  {
    id: 'p_002',
    author_name: 'Block 57 Resco',
    author_room: 'Resident Committee',
    author_tone: 'terracotta',
    body: 'Block 57 game night is locked in for next Wednesday. New games incoming. Drop suggestions below for what you want to see.',
    category: 'announcement',
    created_at: '2026-05-08T18:45:00',
    reactions: [
      { emoji: 'love', count: 15 },
      { emoji: 'plus', count: 6 },
    ],
    reply_count: 9,
  },
  {
    id: 'p_001',
    author_name: 'Mei Chen',
    author_room: 'Block 57, 410',
    author_tone: 'sand',
    body: 'Reminder, sunrise yoga is back this Sunday at 6.30am on the field. Bring a jacket if you run cold, breeze has been chilly lately.',
    category: 'general',
    created_at: '2026-05-08T07:30:00',
    reactions: [
      { emoji: 'love', count: 9 },
      { emoji: 'plus', count: 3 },
    ],
    reply_count: 2,
  },
]

export interface Channel {
  slug: string
  name: string
  unread?: number
  group: 'topics' | 'block'
}

export const mockChannels: Channel[] = [
  { slug: 'general', name: 'general', group: 'topics' },
  { slug: 'announcements', name: 'announcements', group: 'topics', unread: 2 },
  { slug: 'sports', name: 'sports', group: 'topics', unread: 5 },
  { slug: 'gaming', name: 'gaming', group: 'topics' },
  { slug: 'food', name: 'food', group: 'topics' },
  { slug: 'study', name: 'study', group: 'topics' },
  { slug: 'lost-and-found', name: 'lost-and-found', group: 'topics', unread: 1 },
  { slug: 'for-sale', name: 'for-sale', group: 'topics' },
  { slug: 'block-57', name: 'block-57', group: 'block', unread: 3 },
  { slug: 'block-55', name: 'block-55', group: 'block' },
  { slug: 'block-53', name: 'block-53', group: 'block' },
]
