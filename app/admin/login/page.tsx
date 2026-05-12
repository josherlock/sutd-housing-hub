'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('wl_lim@sutd.edu.sg')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      setTimeout(() => router.push('/admin'), 900)
    }, 600)
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-cream">
      <div className="bg-charcoal text-warm-white flex flex-col justify-between p-8 lg:p-16 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-terracotta/15 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-[320px] h-[320px] rounded-full bg-terracotta-light/10 blur-3xl" />

        <div className="relative flex items-center gap-3">
          <div className="w-11 h-11 bg-warm-white text-charcoal flex items-center justify-center font-display text-xl">
            S
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg tracking-wide">Housing Admin</span>
            <span className="text-[10px] tracking-widest uppercase text-warm-white/60">
              SUTD, staff portal
            </span>
          </div>
        </div>

        <div className="relative">
          <span className="inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-terracotta-light bg-terracotta/15 px-3 py-1.5 border border-terracotta/30">
            <ShieldCheck size={12} strokeWidth={1.5} />
            Staff only
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-balance mt-6">
            Operations console
          </h1>
          <p className="mt-6 max-w-md text-sm text-warm-white/70 leading-relaxed">
            Manage residents, run maintenance, approve bookings, reconcile payments. Everything in one
            place, audit trail included.
          </p>
        </div>

        <div className="relative">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase text-warm-white/50 hover:text-warm-white transition-colors"
          >
            <ArrowLeft size={12} strokeWidth={1.5} />
            Back to resident sign in
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          <span className="section-label">Staff sign in</span>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal mt-3 leading-tight">
            Welcome, staff.
          </h2>
          <p className="mt-3 text-stone text-sm leading-relaxed">
            Use your SUTD staff email. We will send a single-use magic link. SSO for staff is on the
            roadmap.
          </p>

          <form onSubmit={onSubmit} className="mt-10 space-y-6">
            <Input
              label="Staff email"
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@sutd.edu.sg"
            />

            <Button type="submit" fullWidth size="lg" disabled={loading || sent}>
              {sent ? 'Link sent, signing you in' : loading ? 'Sending' : 'Send magic link'}
              {!loading && !sent && <ArrowRight size={16} strokeWidth={1.5} />}
            </Button>
          </form>

          <div className="my-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-warm-gray/30" />
            <span className="text-[11px] tracking-widest uppercase text-warm-gray">
              Restricted access
            </span>
            <div className="h-px flex-1 bg-warm-gray/30" />
          </div>

          <p className="text-xs text-stone leading-relaxed">
            All actions are logged. Unauthorised access is monitored and reported. If you reached this
            page by accident, head back to the{' '}
            <Link href="/login" className="underline decoration-warm-gray/50 hover:text-terracotta">
              resident portal
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </div>
  )
}
