export type OrgCluster = 'arts' | 'community' | 'culture' | 'makers' | 'sports' | 'student-groups'

export interface Org {
  id: string
  name: string
  abbr?: string
  cluster: OrgCluster
  type: string
  description: string
  schedule?: string
  location?: string
  telegram?: string
  instagram?: string
  email?: string
  member_count?: number
  is_verified?: boolean
}

export const clusterMeta: Record<
  OrgCluster,
  { label: string; tone: 'terracotta' | 'charcoal' | 'sand' | 'sage' | 'cream' | 'rose'; description: string }
> = {
  arts: {
    label: 'Arts',
    tone: 'rose',
    description: 'Music, dance, theatre, visual, literary.',
  },
  community: {
    label: 'Community',
    tone: 'sand',
    description: 'Service, outreach, environment, advocacy.',
  },
  culture: {
    label: 'Culture',
    tone: 'cream',
    description: 'Heritage, language and cultural groups.',
  },
  makers: {
    label: 'Makers',
    tone: 'charcoal',
    description: 'Engineering, hackathon, design, robotics.',
  },
  sports: {
    label: 'Sports',
    tone: 'sage',
    description: 'Team sports, individual sports and fitness.',
  },
  'student-groups': {
    label: 'Student Groups',
    tone: 'terracotta',
    description: 'Government, residential, faculty representation.',
  },
}

export const mockOrgs: Org[] = [
  // Arts (verified from root.sutd.edu.sg)
  { id: 'arts_01', name: 'Ballroom Dancing Club', cluster: 'arts', type: 'Dance', description: 'Latin and standard ballroom, beginner friendly.', schedule: 'Wed and Fri, 7.30pm to 10.30pm', telegram: 't.me/sutdballroom', instagram: 'sutd.ballroom', is_verified: true },
  { id: 'arts_02', name: 'Bands Club', cluster: 'arts', type: 'Music', description: 'Rock, indie, pop. Multiple bands rehearse weekly.', schedule: 'Ad-hoc', telegram: 't.me/sutdbands', instagram: 'sutd.bands', is_verified: true },
  { id: 'arts_03', name: 'Chamber Ensemble Club', cluster: 'arts', type: 'Music', description: 'Strings and small classical ensembles.', schedule: 'Wed, 7.30pm to 9.30pm', location: 'Music Room 1', telegram: 't.me/sutdchamber', is_verified: true },
  { id: 'arts_04', name: 'Chinese Orchestra Club', cluster: 'arts', type: 'Music', description: 'Traditional Chinese instruments, ensemble setting.', schedule: 'Mon 7.30pm, Tue 7.00pm', telegram: 't.me/sutdco', is_verified: true },
  { id: 'arts_05', name: 'Crochet Interest Group', cluster: 'arts', type: 'Craft', description: 'Casual crochet circle, yarn provided.', schedule: 'Bi-weekly, Wed 2pm to 4pm', telegram: 't.me/sutdcrochet', is_verified: true },
  { id: 'arts_06', name: 'Dance DerivativeZ Club', abbr: 'DDZ', cluster: 'arts', type: 'Dance', description: 'Hip hop, contemporary, choreography focus.', schedule: 'Wed and Fri, 7.30pm to 10.30pm', telegram: 't.me/ddzsutd', instagram: 'ddz.sutd', is_verified: true },
  { id: 'arts_07', name: 'Drama Club', cluster: 'arts', type: 'Theatre', description: 'Stage acting, scripts, devised works.', schedule: 'Wed, 7.30pm to 9.30pm', location: 'LT2', telegram: 't.me/sutddrama', is_verified: true },
  { id: 'arts_08', name: 'FUNKtion Club', cluster: 'arts', type: 'Dance', description: 'Street and urban dance.', schedule: 'Mon and Thu, 7pm to 10pm', telegram: 't.me/sutdfunktion', instagram: 'funktion.sutd', is_verified: true },
  { id: 'arts_09', name: 'Photographic Circle Club', cluster: 'arts', type: 'Visual Arts', description: 'Photography walks, critique, workshops.', schedule: 'Ad-hoc', telegram: 't.me/sutdphoto', instagram: 'sutd.photocircle', is_verified: true },
  { id: 'arts_10', name: 'Productions Club', cluster: 'arts', type: 'Media', description: 'Film, video, behind-the-scenes for campus events.', schedule: 'Mon, 7.30pm', location: 'IDiA Lab', telegram: 't.me/sutdprods', is_verified: true },
  { id: 'arts_11', name: 'Scratch! Club', cluster: 'arts', type: 'Creative', description: 'DJing, scratching, electronic music.', schedule: 'Wed, 5pm to 7pm', location: 'SAC', telegram: 't.me/sutdscratch', is_verified: true },
  { id: 'arts_12', name: 'SUTDio Club', cluster: 'arts', type: 'Audio', description: 'Sound engineering, podcasting, audio production.', schedule: 'Ad-hoc, Thu 8pm', telegram: 't.me/sutdio', is_verified: true },
  { id: 'arts_13', name: 'Taal Indian Dance Club', cluster: 'arts', type: 'Cultural Dance', description: 'Classical and Bollywood Indian dance.', schedule: 'Tue and Fri, 7pm to 9pm', location: 'Dance Studio 1', telegram: 't.me/sutdtaal', instagram: 'taal.sutd', is_verified: true },
  { id: 'arts_14', name: 'Tortured Poets Interest Group', cluster: 'arts', type: 'Literary', description: 'Poetry writing, sharing, salons.', schedule: 'Wed, 5pm', telegram: 't.me/sutdpoets', is_verified: true },
  { id: 'arts_15', name: 'Visual Arts Interest Group', cluster: 'arts', type: 'Visual Arts', description: 'Painting, sketching, mixed media.', schedule: 'Fri, 7.30pm', telegram: 't.me/sutdvisualarts', is_verified: true },
  { id: 'arts_16', name: 'Vocomotives Club', cluster: 'arts', type: 'A cappella', description: 'A cappella singing group.', schedule: 'Tue and Thu, 7pm', location: 'DS2', telegram: 't.me/vocomotives', instagram: 'vocomotives', is_verified: true },
  { id: 'arts_17', name: 'Wind Ensemble Club', cluster: 'arts', type: 'Music', description: 'Concert band, woodwinds, brass and percussion.', schedule: 'Tue and Thu, 7.30pm to 9.30pm', location: 'Music Room 1', telegram: 't.me/sutdwind', is_verified: true },
  { id: 'arts_18', name: 'Writers Block IG', cluster: 'arts', type: 'Literary', description: 'Prose, short fiction, casual writing nights.', schedule: 'Wed, location TBC', telegram: 't.me/sutdwritersblock', is_verified: true },

  // Community (representative, please verify)
  { id: 'com_01', name: 'Rotaract Club of SUTD', cluster: 'community', type: 'Service', description: 'Service projects locally and overseas, leadership development.', telegram: 't.me/rotaractsutd', instagram: 'rotaract.sutd' },
  { id: 'com_02', name: 'GreenPrint', cluster: 'community', type: 'Environment', description: 'Sustainability initiatives, campus recycling, awareness drives.', telegram: 't.me/greenprintsutd', instagram: 'greenprint.sutd' },
  { id: 'com_03', name: 'SUTD Mentorship', cluster: 'community', type: 'Outreach', description: 'Mentoring secondary school students in STEM.', telegram: 't.me/sutdmentorship' },
  { id: 'com_04', name: 'Pawsibility', cluster: 'community', type: 'Animal Welfare', description: 'Volunteer work with animal shelters.', telegram: 't.me/pawsibility', instagram: 'pawsibility.sutd' },

  // Culture (representative)
  { id: 'cul_01', name: 'Chinese Cultural Group', cluster: 'culture', type: 'Heritage', description: 'Lunar New Year, Mid-Autumn, language and traditions.', telegram: 't.me/sutdccg', instagram: 'ccg.sutd' },
  { id: 'cul_02', name: 'Indian Cultural Club', cluster: 'culture', type: 'Heritage', description: 'Diwali, Pongal, cultural showcases and food fairs.', telegram: 't.me/sutdicc', instagram: 'icc.sutd' },
  { id: 'cul_03', name: 'Malay Cultural Group', cluster: 'culture', type: 'Heritage', description: 'Hari Raya, traditional dance and food, language nights.', telegram: 't.me/sutdmcg', instagram: 'mcg.sutd' },
  { id: 'cul_04', name: 'International Students Committee', abbr: 'ISC', cluster: 'culture', type: 'International', description: 'Connects international students, host country meetups.', telegram: 't.me/sutdisc' },

  // Makers (representative)
  { id: 'mak_01', name: 'IEEE SUTD Student Branch', cluster: 'makers', type: 'Engineering', description: 'Hardware projects, talks, hackathons.', telegram: 't.me/ieeesutd', instagram: 'ieee.sutd' },
  { id: 'mak_02', name: 'Hackers and Designers Club', abbr: 'H&D', cluster: 'makers', type: 'Hackathon', description: 'Build nights, hackathon prep, software projects.', telegram: 't.me/hndsutd', instagram: 'hnd.sutd' },
  { id: 'mak_03', name: 'Robotics Club', cluster: 'makers', type: 'Robotics', description: 'Build robots for competitions, Robocon and beyond.', telegram: 't.me/sutdrobotics' },
  { id: 'mak_04', name: 'Open Source Society', cluster: 'makers', type: 'Software', description: 'Contribute to open source, weekly study group.', telegram: 't.me/sutdoss', instagram: 'oss.sutd' },
  { id: 'mak_05', name: 'Game Development Society', abbr: 'GDev', cluster: 'makers', type: 'Games', description: 'Game jams, Unity and Godot projects.', telegram: 't.me/sutdgdev' },

  // Sports (representative)
  { id: 'spo_01', name: 'Badminton Club', cluster: 'sports', type: 'Racket', description: 'Recreational and competitive play, weekly trainings.', schedule: 'Tue and Thu, 8pm', location: 'ISH 1', telegram: 't.me/sutdbadminton' },
  { id: 'spo_02', name: 'Basketball Club', cluster: 'sports', type: 'Team', description: 'Open trainings, IVP team.', schedule: 'Mon and Wed, 8pm', location: 'ISH 1', telegram: 't.me/sutdbball', instagram: 'sutd.basketball' },
  { id: 'spo_03', name: 'Football Club', cluster: 'sports', type: 'Team', description: 'Eleven-a-side and futsal, recreational pickups.', schedule: 'Tue and Fri, 7pm', location: 'Outdoor Field', telegram: 't.me/sutdfootball', instagram: 'sutd.fc' },
  { id: 'spo_04', name: 'Touch Rugby Club', cluster: 'sports', type: 'Team', description: 'Mixed touch rugby, beginners welcome.', schedule: 'Wed, 7.30pm', location: 'Outdoor Field', telegram: 't.me/sutdtouch' },
  { id: 'spo_05', name: 'Tennis Club', cluster: 'sports', type: 'Racket', description: 'Casual rallies and competitive coaching.', schedule: 'Sat mornings', location: 'Tennis Court 1', telegram: 't.me/sutdtennis' },
  { id: 'spo_06', name: 'Swim Club', cluster: 'sports', type: 'Individual', description: 'Lap swimming, technique drills.', schedule: 'Mon and Thu, 7am', telegram: 't.me/sutdswim' },
  { id: 'spo_07', name: 'Climbing Club', cluster: 'sports', type: 'Adventure', description: 'Bouldering trips, technique sessions.', schedule: 'Weekend trips', telegram: 't.me/sutdclimb', instagram: 'sutd.climb' },
  { id: 'spo_08', name: 'Frisbee Club', cluster: 'sports', type: 'Team', description: 'Ultimate frisbee, all levels.', schedule: 'Sun, 5pm', location: 'Outdoor Field', telegram: 't.me/sutdfrisbee' },

  // Student Groups (representative)
  { id: 'stu_01', name: 'SUTD Student Government', abbr: 'SG', cluster: 'student-groups', type: 'Government', description: 'Elected student body. Advocates for student concerns.', telegram: 't.me/sutdsg', instagram: 'sutd.sg', email: 'sg@sutd.edu.sg' },
  { id: 'stu_02', name: 'Fifth Row Central Committee', abbr: '5RCC', cluster: 'student-groups', type: 'Co-curricular', description: 'Oversees fifth row clubs, allocates resources, runs Open House.', telegram: 't.me/sutd5rcc' },
  { id: 'stu_03', name: 'Block 57 Residents Committee', cluster: 'student-groups', type: 'Residential', description: 'Your block, your committee. Game nights, block parties, feedback.', telegram: 't.me/block57sutd' },
  { id: 'stu_04', name: 'ROOT', cluster: 'student-groups', type: 'Media', description: 'Student-led news, features and student life coverage.', telegram: 't.me/sutdroot', instagram: 'sutd.root' },
  { id: 'stu_05', name: 'Freshmore Orientation Committee', abbr: 'FOC', cluster: 'student-groups', type: 'Orientation', description: 'Plans and runs the annual freshmore orientation programme.', telegram: 't.me/sutdfoc', instagram: 'sutd.foc' },
]

export function getOrgsByCluster(cluster: OrgCluster) {
  return mockOrgs.filter((o) => o.cluster === cluster)
}

export function clusterCount(cluster: OrgCluster) {
  return mockOrgs.filter((o) => o.cluster === cluster).length
}
