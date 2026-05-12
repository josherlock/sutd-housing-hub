'use client'

import { motion } from 'framer-motion'
import { AlertCircle, ArrowRight, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface AlertBannerProps {
  title: string
  body: string
  ctaLabel: string
  ctaHref: string
}

export default function AlertBanner({ title, body, ctaLabel, ctaHref }: AlertBannerProps) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative bg-warning-bg border-l-2 border-terracotta px-5 py-4 flex flex-col md:flex-row md:items-center gap-4"
    >
      <div className="flex items-start gap-3 flex-1">
        <AlertCircle size={18} strokeWidth={1.5} className="text-terracotta shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-charcoal">{title}</p>
          <p className="text-sm text-stone mt-0.5 leading-relaxed">{body}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 pl-7 md:pl-0">
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase text-terracotta hover:text-terracotta-dark transition-colors"
        >
          {ctaLabel}
          <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
        <button
          aria-label="Dismiss"
          onClick={() => setDismissed(true)}
          className="p-1 text-stone hover:text-charcoal transition-colors"
        >
          <X size={16} strokeWidth={1.5} />
        </button>
      </div>
    </motion.div>
  )
}
