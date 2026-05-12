import { Snowflake, Plug, Droplet, Sofa, Wifi, Bug, Wrench } from 'lucide-react'
import type { TicketCategory } from '@/lib/data/mock-maintenance'

export const categoryIcons: Record<TicketCategory, typeof Wrench> = {
  aircon: Snowflake,
  electrical: Plug,
  plumbing: Droplet,
  furniture: Sofa,
  internet: Wifi,
  pest: Bug,
  other: Wrench,
}

export const categoryLabels: Record<TicketCategory, string> = {
  aircon: 'Aircon',
  electrical: 'Electrical',
  plumbing: 'Plumbing',
  furniture: 'Furniture',
  internet: 'Internet',
  pest: 'Pest',
  other: 'Other',
}
