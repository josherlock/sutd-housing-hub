import type { Metadata } from 'next'
import { Cormorant_Garamond, Saira } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

// Saira is SUTD's web-safe fallback for Gotham, free on Google Fonts.
const saira = Saira({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-saira',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'SUTD Housing Hub',
    template: '%s | SUTD Housing Hub',
  },
  description:
    'Everything about your time at SUTD housing, in one place. Payments, maintenance, bookings, events and community.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${saira.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
