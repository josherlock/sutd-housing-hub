import { notFound } from 'next/navigation'
import FacilityDetailClient from '@/components/facilities/FacilityDetailClient'
import {
  mockFacilities,
  bookingsForFacility,
  mockBookings,
} from '@/lib/data/mock-facilities'
import { mockUser } from '@/lib/data/mock-user'

export function generateStaticParams() {
  return mockFacilities.map((f) => ({ slug: f.slug }))
}

export default async function FacilityPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const facility = mockFacilities.find((f) => f.slug === slug)
  if (!facility) return notFound()
  const bookings = bookingsForFacility(facility.id)
  const myBookings = mockBookings.filter(
    (b) => b.facility_id === facility.id && b.user_id === mockUser.id,
  )

  return <FacilityDetailClient facility={facility} bookings={bookings} myBookings={myBookings} />
}
