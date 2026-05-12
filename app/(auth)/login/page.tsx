'use client'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('joshua_loo@mymail.sutd.edu.sg')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      setTimeout(() => router.push('/dashboard'), 900)
    }, 600)
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-cream">
      <div className="bg-charcoal text-warm-white flex flex-col justify-between p-8 lg:p-16 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-terracotta/15 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-[320px] h-[320px] rounded-full bg-terracotta-light/10 blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-terracotta flex items-center justify-center font-display text-xl">
              S
            </div>
            <span className="text-[11px] tracking-widest uppercase text-warm-white/70">
              SUTD, Office of Housing
            </span>
          </div>
        </div>

        <div className="relative">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-balance">
            SUTD Housing Hub
          </h1>
          <p className="mt-6 max-w-md font-display italic text-2xl md:text-3xl text-warm-white/85 leading-snug">
            Everything about your time here, in one place.
          </p>
          <p className="mt-8 max-w-md text-sm text-warm-white/65 leading-relaxed">
            Payments, maintenance, bookings, events and your community. Built by residents for
            residents.
          </p>
        </div>

        <div className="relative">
          <p className="text-[11px] tracking-widest uppercase text-warm-white/45">
            A student initiative for SUTD residents
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          <span className="section-label">Sign in</span>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal mt-3 leading-tight">
            Welcome back.
          </h2>
          <p className="mt-3 text-stone text-sm leading-relaxed">
            Enter your SUTD email and we will send you a magic link. No password, no fuss.
          </p>

          <form onSubmit={onSubmit} className="mt-10 space-y-6">
            <Input
              label="SUTD email"
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@mymail.sutd.edu.sg"
            />

            <Button type="submit" fullWidth size="lg" disabled={loading || sent}>
              {sent ? 'Magic link sent, redirecting' : loading ? 'Sending' : 'Send magic link'}
              {!loading && !sent && <ArrowRight size={16} strokeWidth={1.5} />}
            </Button>
          </form>

          <div className="my-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-warm-gray/30" />
            <span className="text-[11px] tracking-widest uppercase text-warm-gray">or</span>
            <div className="h-px flex-1 bg-warm-gray/30" />
          </div>

          <div className="text-sm text-stone leading-relaxed">
            <p className="mb-2 font-medium text-charcoal">How magic links work</p>
            <p>
              We email you a single-use link. Click it and you are in. No password to remember, no
              SSO redirect dance. SUTD SSO integration is planned for a later phase.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
