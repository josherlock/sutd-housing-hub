import { mockUser } from './mock-user'

export type ChatScope = 'block' | 'official' | 'sports' | 'social' | 'study' | 'marketplace'

export interface Chat {
  id: string
  name: string
  handle: string
  scope: ChatScope
  description: string
  members: number
  unread: number
  last_message?: { author: string; body: string; at: string }
  pinned?: boolean
  // Chats tagged with a block are private to that block.
  // Chats without a block are visible to all blocks.
  block?: string
}

export const scopeLabels: Record<ChatScope, string> = {
  block: 'My block',
  official: 'Official',
  sports: 'Sports',
  social: 'Social',
  study: 'Study',
  marketplace: 'Buy and sell',
}

export const allChats: Chat[] = [
  // Block 57 (your block)
  {
    id: 'c_01',
    name: 'Block 57 Residents',
    handle: 't.me/block57sutd',
    scope: 'block',
    block: '57',
    description: 'Block-wide chat. Announcements, lost items, neighbour favours.',
    members: 184,
    unread: 7,
    pinned: true,
    last_message: { author: 'Resco', body: 'Game night Wednesday 8pm, lounge, snacks provided.', at: '2026-05-11T09:14:00' },
  },
  {
    id: 'c_02',
    name: 'Block 57, Floor 4',
    handle: 't.me/block57floor4',
    scope: 'block',
    block: '57',
    description: 'Your floor. Short and sweet.',
    members: 22,
    unread: 2,
    last_message: { author: 'Marcus', body: 'Anyone has a hex key? Need 3mm for an IKEA shelf.', at: '2026-05-11T08:42:00' },
  },
  {
    id: 'c_04',
    name: 'Block 57 Futsal',
    handle: 't.me/block57futsal',
    scope: 'sports',
    block: '57',
    description: 'Pickup futsal at ISH 1. Roster lives here.',
    members: 26,
    unread: 4,
    last_message: { author: 'Alex', body: 'Two more for tomorrow 8pm. Confirm with a thumbs up.', at: '2026-05-10T13:02:00' },
  },
  {
    id: 'c_07',
    name: 'Block 57 Game Nights',
    handle: 't.me/block57games',
    scope: 'social',
    block: '57',
    description: 'Board games, Smash, Mahjong. Suggest sessions here.',
    members: 41,
    unread: 0,
    last_message: { author: 'Daniel', body: 'Smash tourney Friday 8pm. Bracket fills fast.', at: '2026-05-09T19:18:00' },
  },
  {
    id: 'c_09',
    name: 'Block 57 Marketplace',
    handle: 't.me/block57market',
    scope: 'marketplace',
    block: '57',
    description: 'Selling, lending, free stuff. Be kind.',
    members: 137,
    unread: 1,
    last_message: { author: 'Aisha', body: 'Desk lamp, 20 SGD, dimmable. Room 411.', at: '2026-05-10T16:22:00' },
  },

  // Block 55 (private, hidden if you live elsewhere)
  {
    id: 'c_55_01',
    name: 'Block 55 Residents',
    handle: 't.me/block55sutd',
    scope: 'block',
    block: '55',
    description: 'Block-wide chat for Block 55 residents only.',
    members: 162,
    unread: 0,
    last_message: { author: 'Resco', body: 'Pantry reno on Saturday, please clear shelves.', at: '2026-05-10T18:00:00' },
  },
  {
    id: 'c_55_02',
    name: 'Block 55 Marketplace',
    handle: 't.me/block55market',
    scope: 'marketplace',
    block: '55',
    description: 'For Block 55 only.',
    members: 98,
    unread: 0,
  },

  // Block 53 (private)
  {
    id: 'c_53_01',
    name: 'Block 53 Residents',
    handle: 't.me/block53sutd',
    scope: 'block',
    block: '53',
    description: 'Block-wide chat for Block 53 residents only.',
    members: 145,
    unread: 0,
  },

  // Block 59 (private)
  {
    id: 'c_59_01',
    name: 'Block 59 Residents',
    handle: 't.me/block59sutd',
    scope: 'block',
    block: '59',
    description: 'Block-wide chat for Block 59 residents only.',
    members: 158,
    unread: 0,
  },

  // Campus-wide, visible to all blocks
  {
    id: 'c_03',
    name: 'SUTD Housing Official',
    handle: 't.me/sutdhousing',
    scope: 'official',
    description: 'One-way channel from Office of Housing. Outages, maintenance windows, deadlines.',
    members: 1820,
    unread: 1,
    pinned: true,
    last_message: { author: 'Office of Housing', body: 'Bimonthly aircon servicing schedule for Block 57 has been published.', at: '2026-05-10T09:00:00' },
  },
  {
    id: 'c_05',
    name: 'Casual Tennis',
    handle: 't.me/sutdtenniscasual',
    scope: 'sports',
    description: 'Morning rallies, beginners welcome.',
    members: 38,
    unread: 0,
    last_message: { author: 'Aisha', body: 'Court 1 booked Saturday 7am, see you there.', at: '2026-05-09T19:11:00' },
  },
  {
    id: 'c_06',
    name: 'Algorithms Study Group',
    handle: 't.me/sutd50004',
    scope: 'study',
    description: 'Finals week revision crew.',
    members: 14,
    unread: 12,
    last_message: { author: 'Priya', body: 'Past year 2024 question 3, I get O(n log n) but the answer says linear. Anyone?', at: '2026-05-11T07:48:00' },
  },
  {
    id: 'c_08',
    name: 'SUTD Lost and Found',
    handle: 't.me/sutdlostandfound',
    scope: 'social',
    description: 'Drop a photo, get it back.',
    members: 612,
    unread: 0,
    last_message: { author: 'Marcus', body: 'Found black hydroflask near laundry, has small dent on lid.', at: '2026-05-10T22:40:00' },
  },
]

// Chats visible to the current user.
// Block-tagged chats are filtered to the user's own block.
export const mockChats: Chat[] = allChats.filter(
  (c) => !c.block || c.block === mockUser.block,
)

export function getTotalUnread() {
  return mockChats.reduce((s, c) => s + c.unread, 0)
}
