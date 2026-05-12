import type { Booking } from '../mock-facilities'

export interface AdminBooking extends Booking {
  student_id: string
}

const ahead = (h: number) => new Date(Date.now() + h * 3600_000).toISOString()
const ago = (h: number) => new Date(Date.now() - h * 3600_000).toISOString()

export const mockAdminBookings: AdminBooking[] = [
  { id: 'bk_a_018', user_id: 'u_admin', student_id: 's_001', facility_id: 'f_ish1', facility_name: 'Indoor Sports Hall 1', start_time: ahead(8), end_time: ahead(9), status: 'confirmed', purpose: 'Block 57 futsal practice', attendee_count: 10, qr_token: 'a7f3c1d2e9b8' },
  { id: 'bk_a_017', user_id: 'u_admin', student_id: 's_001', facility_id: 'f_meeting_a', facility_name: 'Meeting Room A', start_time: ahead(32), end_time: ahead(34), status: 'confirmed', purpose: 'CS group project sync', attendee_count: 4, qr_token: 'b2e4f6a1c8d3' },
  { id: 'bk_a_016', user_id: 'u_admin', student_id: 's_001', facility_id: 'f_mph', facility_name: 'Multi-Purpose Hall', start_time: ahead(240), end_time: ahead(244), status: 'pending', purpose: 'World Cup watch party', attendee_count: 60, equipment_requests: ['Projector', 'Sound system', 'Folding chairs'], qr_token: 'c9d8e7f6a5b4', admin_note: 'Awaiting approval, large group.' },
  { id: 'bk_a_015', user_id: 'u_admin', student_id: 's_002', facility_id: 'f_tennis1', facility_name: 'Tennis Court 1', start_time: ahead(98), end_time: ahead(99), status: 'confirmed', purpose: 'Morning rally', attendee_count: 2, qr_token: 'd1c2b3a4e5f6' },
  { id: 'bk_a_014', user_id: 'u_admin', student_id: 's_003', facility_id: 'f_ish2', facility_name: 'Indoor Sports Hall 2', start_time: ahead(12), end_time: ahead(13), status: 'confirmed', purpose: 'Badminton casual', attendee_count: 4, qr_token: 'e1f2a3b4c5d6' },
  { id: 'bk_a_013', user_id: 'u_admin', student_id: 's_004', facility_id: 'f_meeting_a', facility_name: 'Meeting Room A', start_time: ahead(72), end_time: ahead(74), status: 'pending', purpose: 'Study group, finals', attendee_count: 6, qr_token: 'f1a2b3c4d5e6' },
  { id: 'bk_a_012', user_id: 'u_admin', student_id: 's_005', facility_id: 'f_squash1', facility_name: 'Squash Court 1', start_time: ahead(48), end_time: ahead(49), status: 'confirmed', purpose: 'Casual squash', attendee_count: 2, qr_token: 'g1h2i3j4k5l6' },
  { id: 'bk_a_011', user_id: 'u_admin', student_id: 's_007', facility_id: 'f_field', facility_name: 'Outdoor Field', start_time: ahead(56), end_time: ahead(58), status: 'confirmed', purpose: 'Frisbee', attendee_count: 12, qr_token: 'h1i2j3k4l5m6' },
  { id: 'bk_a_010', user_id: 'u_admin', student_id: 's_010', facility_id: 'f_mph', facility_name: 'Multi-Purpose Hall', start_time: ahead(120), end_time: ahead(124), status: 'rejected', purpose: 'Open mic night', attendee_count: 100, qr_token: 'i1j2k3l4m5n6', admin_note: 'Clashed with confirmed event.' },
  { id: 'bk_a_009', user_id: 'u_admin', student_id: 's_012', facility_id: 'f_ish1', facility_name: 'Indoor Sports Hall 1', start_time: ahead(96), end_time: ahead(97), status: 'confirmed', purpose: 'Basketball pickup', attendee_count: 8, qr_token: 'j1k2l3m4n5o6' },
  { id: 'bk_a_008', user_id: 'u_admin', student_id: 's_013', facility_id: 'f_meeting_a', facility_name: 'Meeting Room A', start_time: ahead(168), end_time: ahead(170), status: 'confirmed', purpose: 'Thesis defence prep', attendee_count: 4, qr_token: 'k1l2m3n4o5p6' },
  { id: 'bk_a_007', user_id: 'u_admin', student_id: 's_016', facility_id: 'f_squash2', facility_name: 'Squash Court 2', start_time: ahead(24), end_time: ahead(25), status: 'confirmed', purpose: 'Squash casual', attendee_count: 2, qr_token: 'l1m2n3o4p5q6' },
  // Past bookings
  { id: 'bk_a_006', user_id: 'u_admin', student_id: 's_001', facility_id: 'f_ish1', facility_name: 'Indoor Sports Hall 1', start_time: ago(48), end_time: ago(47), status: 'checked_in', purpose: 'Futsal practice', attendee_count: 10, qr_token: 'm1n2o3p4q5r6' },
  { id: 'bk_a_005', user_id: 'u_admin', student_id: 's_009', facility_id: 'f_field', facility_name: 'Outdoor Field', start_time: ago(72), end_time: ago(70), status: 'checked_in', purpose: 'Football', attendee_count: 14, qr_token: 'n1o2p3q4r5s6' },
  { id: 'bk_a_004', user_id: 'u_admin', student_id: 's_006', facility_id: 'f_meeting_a', facility_name: 'Meeting Room A', start_time: ago(120), end_time: ago(118), status: 'no_show', purpose: 'Project meeting', attendee_count: 5, qr_token: 'o1p2q3r4s5t6', admin_note: 'Group did not arrive.' },
]

export const bookingCounts = {
  pending: mockAdminBookings.filter((b) => b.status === 'pending').length,
  confirmed_upcoming: mockAdminBookings.filter((b) => b.status === 'confirmed' && new Date(b.start_time).getTime() > Date.now()).length,
  today: mockAdminBookings.filter((b) => {
    const d = new Date(b.start_time)
    const now = new Date()
    return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length,
}
