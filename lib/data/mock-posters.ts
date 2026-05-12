export type PosterPalette = 'terracotta' | 'charcoal' | 'sand' | 'sage' | 'cream' | 'rose'

export interface Poster {
  id: string
  title: string
  tagline: string
  body: string
  host: string
  cluster?: string
  date_label: string
  location: string
  palette: PosterPalette
  pinned_by: string
  tilt: number
  tags: string[]
  link?: string
  cta?: string
}

export const mockPosters: Poster[] = [
  {
    id: 'pst_001',
    title: 'Sunrise Yoga on the Field',
    tagline: 'Slow flow before the day starts',
    body: 'Bring a mat or borrow ours. Mei guides. Beginners welcome, breath is the only thing you need.',
    host: 'Wellness Club',
    date_label: 'Sun 17 May, 6.30am',
    location: 'Outdoor Field',
    palette: 'sand',
    pinned_by: 'Wellness Club',
    tilt: -2,
    tags: ['Yoga', 'Wellness', 'Outdoors'],
    cta: 'RSVP',
  },
  {
    id: 'pst_002',
    title: 'Smash Bros Open',
    tagline: 'Double elimination, snacks on the house',
    body: 'Roster fills fast. Drop your tag in the chat, plug your controller, fight for the bracket.',
    host: 'Block 57 Game Nights',
    date_label: 'Fri 16 May, 8pm',
    location: 'Block 57 Lounge',
    palette: 'terracotta',
    pinned_by: 'Daniel Lim',
    tilt: 1.5,
    tags: ['Gaming', 'Tournament', 'Social'],
    cta: 'Join bracket',
  },
  {
    id: 'pst_003',
    title: 'Vocomotives, Open Audition',
    tagline: 'A cappella, no experience needed',
    body: 'Sing in your shower? Try a real room. Open auditions for incoming members, rehearsals on Tuesdays and Thursdays.',
    host: 'Vocomotives',
    date_label: 'Tue 20 May, 7pm',
    location: 'Dance Studio 2',
    palette: 'charcoal',
    pinned_by: 'Vocomotives committee',
    tilt: -1,
    tags: ['Music', 'A cappella', 'Audition'],
    cta: 'Sign up',
  },
  {
    id: 'pst_004',
    title: 'Sunday Brunch Potluck',
    tagline: 'Bring one dish, leave full',
    body: 'Casual, no theme, no signups, just turn up with food to share. Lounge fills around 11am, everyone gone by 1.',
    host: 'Priya Kumar, Block 57',
    date_label: 'Sun 18 May, 11am',
    location: 'Block 57 Lounge',
    palette: 'cream',
    pinned_by: 'Priya Kumar',
    tilt: 2,
    tags: ['Food', 'Brunch', 'Social'],
  },
  {
    id: 'pst_005',
    title: 'Climbing Trip, Yishun Cave',
    tagline: 'Beginner-friendly bouldering Saturday',
    body: 'Meet at the bus stop 9am, back by 2. Shoes can be rented at the gym. Cap of 12.',
    host: 'Climbing Club',
    date_label: 'Sat 17 May, 9am',
    location: 'Meet at bus stop',
    palette: 'sage',
    pinned_by: 'Climbing Club',
    tilt: -2.5,
    tags: ['Climbing', 'Sports', 'Outdoors'],
    cta: 'Reserve a spot',
  },
  {
    id: 'pst_006',
    title: 'Hack Night, Open Source PRs',
    tagline: 'Pick one repo, ship one PR',
    body: 'Bring your laptop, snacks provided. We open a Discord voice channel. Mentors on standby if you get stuck.',
    host: 'Open Source Society',
    date_label: 'Thu 22 May, 7pm',
    location: 'Cohort Classroom 2.207',
    palette: 'rose',
    pinned_by: 'OSS leads',
    tilt: 1,
    tags: ['Tech', 'Open source', 'Hack'],
    cta: 'Add to calendar',
  },
  {
    id: 'pst_007',
    title: 'Photo Walk, Tiong Bahru',
    tagline: 'Golden hour, shophouses, kopi',
    body: 'Meet at SUTD MRT 5pm, train down together. Bring any camera, even a phone. Kopi stop midway.',
    host: 'Photographic Circle',
    date_label: 'Wed 21 May, 5pm',
    location: 'SUTD MRT',
    palette: 'sand',
    pinned_by: 'Photo Circle',
    tilt: -1.5,
    tags: ['Photography', 'Walk', 'Off campus'],
  },
  {
    id: 'pst_008',
    title: 'Drama Night, Devised Pieces',
    tagline: 'Short works by the Drama Club',
    body: 'Six original pieces, fifteen minutes each. Free entry. Stay after for snacks and chats with the cast.',
    host: 'Drama Club',
    date_label: 'Fri 23 May, 8pm',
    location: 'LT2',
    palette: 'charcoal',
    pinned_by: 'Drama Club',
    tilt: 2,
    tags: ['Theatre', 'Performance', 'Free'],
  },
  {
    id: 'pst_009',
    title: 'Mid-Autumn Lantern Walk',
    tagline: 'Lanterns, mooncakes, soft lighting',
    body: 'Walk the loop from the lawn through the dorms with hand-painted lanterns. Mooncakes provided.',
    host: 'Chinese Cultural Group',
    date_label: 'Sat 24 May, 7.30pm',
    location: 'Campus Lawn',
    palette: 'terracotta',
    pinned_by: 'CCG committee',
    tilt: -1,
    tags: ['Culture', 'Festival', 'Family-friendly'],
  },
]

export const allTags = Array.from(new Set(mockPosters.flatMap((p) => p.tags))).sort()
