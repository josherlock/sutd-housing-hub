import { mockOrgs, type Org } from './mock-orgs'
import { mockEvents, type CommunityEvent } from './mock-events'

export type InterestCategory =
  | 'sports'
  | 'music'
  | 'dance'
  | 'arts'
  | 'tech'
  | 'food'
  | 'service'
  | 'culture'
  | 'wellness'
  | 'games'
  | 'outdoor'
  | 'media'

export interface InterestTag {
  id: string
  label: string
  category: InterestCategory
  // Org clusters this interest tends to match
  org_clusters?: Org['cluster'][]
  // Event categories this interest tends to match
  event_categories?: CommunityEvent['category'][]
  // Keywords used to fuzzy-match org names and descriptions
  keywords?: string[]
}

export const interestCategoryLabels: Record<InterestCategory, string> = {
  sports: 'Sports',
  music: 'Music',
  dance: 'Dance',
  arts: 'Arts and crafts',
  tech: 'Tech and making',
  food: 'Food',
  service: 'Service and outreach',
  culture: 'Culture and language',
  wellness: 'Wellness',
  games: 'Games',
  outdoor: 'Outdoors',
  media: 'Media and writing',
}

export const allInterests: InterestTag[] = [
  // Sports
  { id: 'football', label: 'Football', category: 'sports', org_clusters: ['sports'], event_categories: ['sports'], keywords: ['football', 'futsal', 'soccer'] },
  { id: 'basketball', label: 'Basketball', category: 'sports', org_clusters: ['sports'], event_categories: ['sports'], keywords: ['basketball'] },
  { id: 'badminton', label: 'Badminton', category: 'sports', org_clusters: ['sports'], event_categories: ['sports'], keywords: ['badminton'] },
  { id: 'tennis', label: 'Tennis', category: 'sports', org_clusters: ['sports'], event_categories: ['sports'], keywords: ['tennis'] },
  { id: 'swim', label: 'Swimming', category: 'sports', org_clusters: ['sports'], event_categories: ['sports'], keywords: ['swim'] },
  { id: 'frisbee', label: 'Frisbee', category: 'sports', org_clusters: ['sports'], event_categories: ['sports'], keywords: ['frisbee', 'ultimate'] },
  { id: 'rugby', label: 'Rugby', category: 'sports', org_clusters: ['sports'], event_categories: ['sports'], keywords: ['rugby', 'touch'] },

  // Music
  { id: 'band', label: 'Bands', category: 'music', org_clusters: ['arts'], keywords: ['band', 'rock', 'indie'] },
  { id: 'a-cappella', label: 'A cappella', category: 'music', org_clusters: ['arts'], keywords: ['vocomotive', 'a cappella', 'voice'] },
  { id: 'wind-ensemble', label: 'Wind ensemble', category: 'music', org_clusters: ['arts'], keywords: ['wind', 'brass'] },
  { id: 'chamber', label: 'Chamber music', category: 'music', org_clusters: ['arts'], keywords: ['chamber', 'strings'] },
  { id: 'chinese-orch', label: 'Chinese orchestra', category: 'music', org_clusters: ['arts'], keywords: ['chinese orchestra'] },
  { id: 'djing', label: 'DJing', category: 'music', org_clusters: ['arts'], keywords: ['scratch', 'dj'] },

  // Dance
  { id: 'street-dance', label: 'Street dance', category: 'dance', org_clusters: ['arts'], keywords: ['funktion', 'street', 'hip hop'] },
  { id: 'ballroom', label: 'Ballroom', category: 'dance', org_clusters: ['arts'], keywords: ['ballroom', 'latin'] },
  { id: 'contemporary', label: 'Contemporary dance', category: 'dance', org_clusters: ['arts'], keywords: ['derivativez', 'contemporary'] },
  { id: 'indian-dance', label: 'Indian classical dance', category: 'dance', org_clusters: ['arts'], keywords: ['taal', 'bollywood', 'indian'] },

  // Arts
  { id: 'photography', label: 'Photography', category: 'arts', org_clusters: ['arts'], keywords: ['photo', 'photographic'] },
  { id: 'drawing', label: 'Drawing and painting', category: 'arts', org_clusters: ['arts'], keywords: ['visual arts', 'painting'] },
  { id: 'crochet', label: 'Crochet and knitting', category: 'arts', org_clusters: ['arts'], keywords: ['crochet', 'knit'] },
  { id: 'theatre', label: 'Theatre', category: 'arts', org_clusters: ['arts'], keywords: ['drama', 'theatre', 'stage'] },

  // Tech
  { id: 'hackathons', label: 'Hackathons', category: 'tech', org_clusters: ['makers'], keywords: ['hack', 'hnd'] },
  { id: 'robotics', label: 'Robotics', category: 'tech', org_clusters: ['makers'], keywords: ['robot'] },
  { id: 'open-source', label: 'Open source', category: 'tech', org_clusters: ['makers'], keywords: ['open source', 'oss'] },
  { id: 'gamedev', label: 'Game development', category: 'tech', org_clusters: ['makers'], keywords: ['game dev', 'gdev', 'unity'] },
  { id: 'hardware', label: 'Hardware and IEEE', category: 'tech', org_clusters: ['makers'], keywords: ['ieee', 'hardware'] },

  // Food
  { id: 'cooking', label: 'Cooking and baking', category: 'food', keywords: ['bake', 'cook'] },
  { id: 'coffee', label: 'Coffee', category: 'food', keywords: ['coffee'] },
  { id: 'brunch', label: 'Brunches and potlucks', category: 'food', keywords: ['brunch', 'potluck'] },

  // Service
  { id: 'community-service', label: 'Community service', category: 'service', org_clusters: ['community'], keywords: ['service', 'rotaract'] },
  { id: 'sustainability', label: 'Sustainability', category: 'service', org_clusters: ['community'], keywords: ['green', 'sustainable', 'environment'] },
  { id: 'mentoring', label: 'Mentoring', category: 'service', org_clusters: ['community'], keywords: ['mentor'] },
  { id: 'animals', label: 'Animal welfare', category: 'service', org_clusters: ['community'], keywords: ['paw', 'animal'] },

  // Culture
  { id: 'chinese-culture', label: 'Chinese culture', category: 'culture', org_clusters: ['culture'], keywords: ['chinese cultural'] },
  { id: 'indian-culture', label: 'Indian culture', category: 'culture', org_clusters: ['culture'], keywords: ['indian cultural', 'icc'] },
  { id: 'malay-culture', label: 'Malay culture', category: 'culture', org_clusters: ['culture'], keywords: ['malay'] },
  { id: 'international', label: 'International students', category: 'culture', org_clusters: ['culture'], keywords: ['isc', 'international'] },

  // Wellness
  { id: 'yoga', label: 'Yoga', category: 'wellness', event_categories: ['cultural'], keywords: ['yoga'] },
  { id: 'climbing', label: 'Climbing', category: 'wellness', org_clusters: ['sports'], keywords: ['climb', 'bouldering'] },

  // Games
  { id: 'board-games', label: 'Board games', category: 'games', event_categories: ['social'], keywords: ['catan', 'codenames', 'board game', 'mahjong'] },
  { id: 'video-games', label: 'Video games', category: 'games', event_categories: ['social'], keywords: ['smash', 'gaming', 'tourney'] },
  { id: 'tabletop', label: 'Tabletop RPG', category: 'games', event_categories: ['social'], keywords: ['dnd', 'rpg', 'tabletop'] },

  // Outdoor
  { id: 'hiking', label: 'Hiking', category: 'outdoor', keywords: ['hike', 'trail'] },
  { id: 'cycling', label: 'Cycling', category: 'outdoor', keywords: ['cycle', 'bike'] },

  // Media
  { id: 'writing', label: 'Writing and poetry', category: 'media', org_clusters: ['arts'], keywords: ['writer', 'poet', 'literary'] },
  { id: 'film', label: 'Film and video', category: 'media', org_clusters: ['arts'], keywords: ['film', 'video', 'productions'] },
  { id: 'audio', label: 'Audio and podcasting', category: 'media', org_clusters: ['arts'], keywords: ['audio', 'podcast', 'sutdio'] },
  { id: 'journalism', label: 'Journalism', category: 'media', org_clusters: ['student-groups'], keywords: ['root', 'news'] },
]

export function findInterestByLabel(label: string): InterestTag | undefined {
  return allInterests.find(
    (i) => i.label.toLowerCase() === label.toLowerCase() || i.id === label.toLowerCase(),
  )
}

export function suggestedOrgs(interestLabels: string[]): Org[] {
  if (interestLabels.length === 0) return []
  const interests = interestLabels
    .map((l) => findInterestByLabel(l))
    .filter((i): i is InterestTag => !!i)

  const wantedClusters = new Set<Org['cluster']>()
  const keywords: string[] = []
  for (const it of interests) {
    it.org_clusters?.forEach((c) => wantedClusters.add(c))
    it.keywords?.forEach((k) => keywords.push(k.toLowerCase()))
  }

  return mockOrgs
    .map((org) => {
      let score = 0
      if (wantedClusters.has(org.cluster)) score += 1
      const hay = (org.name + ' ' + (org.abbr ?? '') + ' ' + org.type + ' ' + org.description).toLowerCase()
      for (const k of keywords) {
        if (hay.includes(k)) score += 2
      }
      return { org, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((x) => x.org)
}

export function suggestedEvents(interestLabels: string[]): CommunityEvent[] {
  if (interestLabels.length === 0) return []
  const interests = interestLabels
    .map((l) => findInterestByLabel(l))
    .filter((i): i is InterestTag => !!i)

  const wantedCategories = new Set<CommunityEvent['category']>()
  const keywords: string[] = []
  for (const it of interests) {
    it.event_categories?.forEach((c) => wantedCategories.add(c))
    it.keywords?.forEach((k) => keywords.push(k.toLowerCase()))
  }

  const now = Date.now()
  return mockEvents
    .filter((e) => new Date(e.start_time).getTime() > now)
    .map((ev) => {
      let score = 0
      if (wantedCategories.has(ev.category)) score += 1
      const hay = (ev.title + ' ' + ev.description + ' ' + ev.location).toLowerCase()
      for (const k of keywords) {
        if (hay.includes(k)) score += 2
      }
      return { ev, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((x) => x.ev)
}

export function interestsByCategory(): { category: InterestCategory; tags: InterestTag[] }[] {
  const byCat: Record<InterestCategory, InterestTag[]> = {} as any
  for (const i of allInterests) {
    ;(byCat[i.category] ??= []).push(i)
  }
  return (Object.keys(interestCategoryLabels) as InterestCategory[])
    .filter((c) => byCat[c])
    .map((c) => ({ category: c, tags: byCat[c] }))
}
