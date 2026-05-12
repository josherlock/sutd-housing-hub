export type Role = 'student' | 'staff' | 'faculty' | 'visitor' | 'admin'

export interface UserProfile {
  id: string
  full_name: string
  display_name: string
  student_id: string
  role: Role
  block: string
  room_number: string
  phone: string
  classification: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Postgrad'
  email: string
  bio: string
  interests: string[]
  joined_at: string
}

export const mockUser: UserProfile = {
  id: 'u_001',
  full_name: 'Alex Tan',
  display_name: 'Alex',
  student_id: '1009001',
  role: 'student',
  block: '57',
  room_number: '412',
  phone: '+65 9000 0000',
  classification: 'Junior',
  email: 'alex_tan@mymail.sutd.edu.sg',
  bio: 'Computer science junior. Plays futsal on Tuesday nights, lurks in the library on Sundays.',
  interests: ['Football', 'Photography', 'Coffee', 'Board games', 'Hiking'],
  joined_at: '2023-09-01',
}

export interface NotificationPrefs {
  payment_reminders: boolean
  maintenance_updates: boolean
  event_rsvps: boolean
  community_mentions: boolean
  weekly_digest: boolean
}

export const mockNotificationPrefs: NotificationPrefs = {
  payment_reminders: true,
  maintenance_updates: true,
  event_rsvps: true,
  community_mentions: false,
  weekly_digest: true,
}
