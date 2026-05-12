export interface AdminUser {
  id: string
  name: string
  role: 'Housing Manager' | 'Maintenance Lead' | 'Operations' | 'Director'
  email: string
  team: string
}

export const mockAdmin: AdminUser = {
  id: 'a_001',
  name: 'Lim Wei Ling',
  role: 'Housing Manager',
  email: 'wl_lim@sutd.edu.sg',
  team: 'Office of Housing',
}
