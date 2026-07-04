export type FacilityCategory = 'sports' | 'study' | 'event' | 'multipurpose'

export interface Facility {
  id: string
  name: string
  slug: string
  category: FacilityCategory
  capacity: number
  location: string
  description: string
  amenities: string[]
  requires_approval: boolean
  slot_duration_minutes: number
  available_from: string
  available_to: string
  image_url: string
}

// Facility photos in /public/facilities are SUTD's own, taken from
// sutd.edu.sg (Sports & Recreation Centre and campus-life pages) so the app
// shows the real spaces residents know. Used for this internal PoC/pitch.
// Exceptions: SUTD publishes no photo of the hostel MPH or study rooms —
// mph.jpg is a variant of the ISH photo, and Meeting Room A keeps a stock
// image until we photograph the real Block 57 room.
export const mockFacilities: Facility[] = [
  {
    id: 'f_mph',
    name: 'Multi-Purpose Hall',
    slug: 'mph',
    category: 'multipurpose',
    capacity: 120,
    location: 'Building 3, Level 1',
    description: 'Large open hall suitable for events, performances and large gatherings. Stage, sound system and projector available on request.',
    amenities: ['Stage', 'Sound system', 'Projector', 'Aircon', 'Folding chairs'],
    requires_approval: true,
    slot_duration_minutes: 120,
    available_from: '08:00',
    available_to: '23:00',
    image_url: '/facilities/mph.jpg',
  },
  {
    id: 'f_ish1',
    name: 'Indoor Sports Hall',
    slug: 'ish',
    category: 'sports',
    capacity: 40,
    location: 'Sports & Recreation Centre',
    description: 'Badminton, futsal and basketball hall with retractable spectator seating.',
    amenities: ['Badminton nets', 'Basketball hoops', 'Futsal goals', 'Spectator seating'],
    requires_approval: false,
    slot_duration_minutes: 60,
    available_from: '07:00',
    available_to: '23:00',
    image_url: '/facilities/ish-1.jpg',
  },
  {
    id: 'f_fitness',
    name: 'Fitness Centre',
    slug: 'fitness',
    category: 'sports',
    capacity: 25,
    location: 'Sports & Recreation Centre',
    description: 'Full gym with free weights, machines and cardio equipment.',
    amenities: ['Free weights', 'Machines', 'Cardio row', 'Aircon'],
    requires_approval: false,
    slot_duration_minutes: 60,
    available_from: '07:00',
    available_to: '22:00',
    image_url: '/facilities/fitness.jpg',
  },
  {
    id: 'f_field',
    name: 'Outdoor Field',
    slug: 'field',
    category: 'sports',
    capacity: 60,
    location: 'East Campus',
    description: 'Open field for football, frisbee and other outdoor sports. Floodlights after 7pm.',
    amenities: ['Floodlights', 'Water cooler', 'Storage shed'],
    requires_approval: false,
    slot_duration_minutes: 60,
    available_from: '07:00',
    available_to: '22:00',
    image_url: '/facilities/field.jpg',
  },
  {
    id: 'f_pool',
    name: 'Swimming Pool',
    slug: 'pool',
    category: 'sports',
    capacity: 30,
    location: 'Sports & Recreation Centre',
    description: 'Outdoor lap pool with starting blocks, floodlit for evening swims.',
    amenities: ['Lap lanes', 'Starting blocks', 'Deck chairs', 'Shower block'],
    requires_approval: false,
    slot_duration_minutes: 60,
    available_from: '07:00',
    available_to: '21:00',
    image_url: '/facilities/pool.jpg',
  },
  {
    id: 'f_basketball',
    name: 'Basketball Court',
    slug: 'basketball',
    category: 'sports',
    capacity: 10,
    location: 'Sports & Recreation Centre, outdoor',
    description: 'Outdoor full court, floodlit after dusk.',
    amenities: ['Floodlights', 'Bench', 'Water cooler'],
    requires_approval: false,
    slot_duration_minutes: 60,
    available_from: '07:00',
    available_to: '22:00',
    image_url: '/facilities/basketball.jpg',
  },
  {
    id: 'f_soccer',
    name: 'Street Soccer Court',
    slug: 'street-soccer',
    category: 'sports',
    capacity: 12,
    location: 'Sports & Recreation Centre, outdoor',
    description: 'Caged street soccer pitch, five-a-side friendly.',
    amenities: ['Floodlights', 'Goals', 'Water cooler'],
    requires_approval: false,
    slot_duration_minutes: 60,
    available_from: '07:00',
    available_to: '22:00',
    image_url: '/facilities/street-soccer.jpg',
  },
  {
    id: 'f_meeting_a',
    name: 'Meeting Room A',
    slug: 'meeting-a',
    category: 'study',
    capacity: 8,
    location: 'Block 57, Level 1',
    description: 'Quiet meeting room with whiteboard and TV display. Good for study groups and project meetings.',
    amenities: ['Whiteboard', 'TV display', 'HDMI cable', 'Aircon'],
    requires_approval: false,
    slot_duration_minutes: 60,
    available_from: '08:00',
    available_to: '23:00',
    image_url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80&auto=format&fit=crop',
  },
]

export interface Booking {
  id: string
  user_id: string
  facility_id: string
  facility_name: string
  start_time: string
  end_time: string
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'checked_in' | 'no_show'
  purpose?: string
  attendee_count: number
  equipment_requests?: string[]
  qr_token: string
  admin_note?: string
}

export const mockBookings: Booking[] = [
  {
    id: 'bk_004',
    user_id: 'u_001',
    facility_id: 'f_ish1',
    facility_name: 'Indoor Sports Hall',
    start_time: '2026-07-12T20:00:00',
    end_time: '2026-07-12T21:00:00',
    status: 'confirmed',
    purpose: 'Block 57 futsal practice',
    attendee_count: 10,
    qr_token: 'a7f3c1d2e9b8',
  },
  {
    id: 'bk_003',
    user_id: 'u_001',
    facility_id: 'f_meeting_a',
    facility_name: 'Meeting Room A',
    start_time: '2026-07-13T19:00:00',
    end_time: '2026-07-13T21:00:00',
    status: 'confirmed',
    purpose: 'CS group project sync',
    attendee_count: 4,
    qr_token: 'b2e4f6a1c8d3',
  },
  {
    id: 'bk_002',
    user_id: 'u_001',
    facility_id: 'f_mph',
    facility_name: 'Multi-Purpose Hall',
    start_time: '2026-07-22T19:00:00',
    end_time: '2026-07-22T23:00:00',
    status: 'pending',
    purpose: 'World Cup watch party',
    attendee_count: 60,
    equipment_requests: ['Projector', 'Sound system', 'Folding chairs'],
    qr_token: 'c9d8e7f6a5b4',
  },
  {
    id: 'bk_001',
    user_id: 'u_001',
    facility_id: 'f_soccer',
    facility_name: 'Street Soccer Court',
    start_time: '2026-07-16T07:00:00',
    end_time: '2026-07-16T08:00:00',
    status: 'confirmed',
    purpose: 'Morning kickabout',
    attendee_count: 2,
    qr_token: 'd1c2b3a4e5f6',
  },
]

export function bookingsForFacility(facilityId: string) {
  return mockBookings.filter((b) => b.facility_id === facilityId)
}

export function getUpcomingBookings(limit?: number) {
  const now = Date.now()
  const upcoming = mockBookings
    .filter((b) => new Date(b.start_time).getTime() > now)
    .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
  return typeof limit === 'number' ? upcoming.slice(0, limit) : upcoming
}
