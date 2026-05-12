export interface StudentRecord {
  id: string
  student_id: string
  full_name: string
  email: string
  phone: string
  block: string
  room_number: string
  classification: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Postgrad'
  pillar: 'CSD' | 'ESD' | 'ASD' | 'EPD' | 'DAI'
  move_in: string
  status: 'active' | 'on_leave' | 'moved_out'
}

export const mockStudents: StudentRecord[] = [
  { id: 's_001', student_id: '1009001', full_name: 'Alex Tan', email: 'alex_tan@mymail.sutd.edu.sg', phone: '+65 9000 0000', block: '57', room_number: '412', classification: 'Junior', pillar: 'CSD', move_in: '2023-09-01', status: 'active' },
  { id: 's_002', student_id: '1009002', full_name: 'Priya Kumar', email: 'priya_kumar@mymail.sutd.edu.sg', phone: '+65 9000 0001', block: '57', room_number: '408', classification: 'Junior', pillar: 'ESD', move_in: '2023-09-01', status: 'active' },
  { id: 's_003', student_id: '1009003', full_name: 'Marcus Tan', email: 'marcus_tan@mymail.sutd.edu.sg', phone: '+65 9000 0002', block: '57', room_number: '401', classification: 'Senior', pillar: 'EPD', move_in: '2022-09-01', status: 'active' },
  { id: 's_004', student_id: '1009004', full_name: 'Aisha Rahman', email: 'aisha_rahman@mymail.sutd.edu.sg', phone: '+65 9000 0003', block: '57', room_number: '411', classification: 'Sophomore', pillar: 'ASD', move_in: '2024-09-01', status: 'active' },
  { id: 's_005', student_id: '1009005', full_name: 'Daniel Lim', email: 'daniel_lim@mymail.sutd.edu.sg', phone: '+65 9000 0004', block: '57', room_number: '405', classification: 'Junior', pillar: 'CSD', move_in: '2023-09-01', status: 'active' },
  { id: 's_006', student_id: '1009006', full_name: 'Mei Chen', email: 'mei_chen@mymail.sutd.edu.sg', phone: '+65 9000 0005', block: '57', room_number: '410', classification: 'Senior', pillar: 'DAI', move_in: '2022-09-01', status: 'active' },
  { id: 's_007', student_id: '1009007', full_name: 'Jun Wei Lim', email: 'junwei_lim@mymail.sutd.edu.sg', phone: '+65 9000 0006', block: '55', room_number: '203', classification: 'Sophomore', pillar: 'CSD', move_in: '2024-09-01', status: 'active' },
  { id: 's_008', student_id: '1009008', full_name: 'Rachel Goh', email: 'rachel_goh@mymail.sutd.edu.sg', phone: '+65 9000 0007', block: '55', room_number: '207', classification: 'Freshman', pillar: 'ESD', move_in: '2025-09-01', status: 'active' },
  { id: 's_009', student_id: '1009009', full_name: 'Vikram Singh', email: 'vikram_singh@mymail.sutd.edu.sg', phone: '+65 9000 0008', block: '55', room_number: '215', classification: 'Junior', pillar: 'EPD', move_in: '2023-09-01', status: 'active' },
  { id: 's_010', student_id: '1009010', full_name: 'Sara Mansour', email: 'sara_mansour@mymail.sutd.edu.sg', phone: '+65 9000 0009', block: '53', room_number: '108', classification: 'Senior', pillar: 'ASD', move_in: '2022-09-01', status: 'active' },
  { id: 's_011', student_id: '1009011', full_name: 'Kenneth Ng', email: 'kenneth_ng@mymail.sutd.edu.sg', phone: '+65 9000 0010', block: '53', room_number: '112', classification: 'Sophomore', pillar: 'CSD', move_in: '2024-09-01', status: 'active' },
  { id: 's_012', student_id: '1009012', full_name: 'Hui Min Teo', email: 'huimin_teo@mymail.sutd.edu.sg', phone: '+65 9000 0011', block: '53', room_number: '115', classification: 'Junior', pillar: 'DAI', move_in: '2023-09-01', status: 'active' },
  { id: 's_013', student_id: '1009013', full_name: 'Liam O\'Connor', email: 'liam_oconnor@mymail.sutd.edu.sg', phone: '+65 9000 0012', block: '59', room_number: '303', classification: 'Postgrad', pillar: 'EPD', move_in: '2024-01-15', status: 'active' },
  { id: 's_014', student_id: '1009014', full_name: 'Nadia Iskandar', email: 'nadia_iskandar@mymail.sutd.edu.sg', phone: '+65 9000 0013', block: '59', room_number: '308', classification: 'Freshman', pillar: 'CSD', move_in: '2025-09-01', status: 'active' },
  { id: 's_015', student_id: '1009015', full_name: 'Bryan Sim', email: 'bryan_sim@mymail.sutd.edu.sg', phone: '+65 9000 0014', block: '59', room_number: '301', classification: 'Junior', pillar: 'ESD', move_in: '2023-09-01', status: 'on_leave' },
  { id: 's_016', student_id: '1009016', full_name: 'Elena Park', email: 'elena_park@mymail.sutd.edu.sg', phone: '+65 9000 0015', block: '57', room_number: '418', classification: 'Sophomore', pillar: 'ASD', move_in: '2024-09-01', status: 'active' },
  { id: 's_017', student_id: '1009017', full_name: 'Faiz Abdullah', email: 'faiz_abdullah@mymail.sutd.edu.sg', phone: '+65 9000 0016', block: '55', room_number: '220', classification: 'Senior', pillar: 'CSD', move_in: '2022-09-01', status: 'active' },
  { id: 's_018', student_id: '1009018', full_name: 'Crystal Wong', email: 'crystal_wong@mymail.sutd.edu.sg', phone: '+65 9000 0017', block: '57', room_number: '402', classification: 'Junior', pillar: 'EPD', move_in: '2023-09-01', status: 'active' },
]

export function getStudentById(id: string) {
  return mockStudents.find((s) => s.id === id)
}

export function getStudentByStudentId(studentId: string) {
  return mockStudents.find((s) => s.student_id === studentId)
}

export const studentLookup: Record<string, StudentRecord> = Object.fromEntries(
  mockStudents.map((s) => [s.id, s]),
)
