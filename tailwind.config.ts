import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm editorial canvas, kept so the app does not read as a clone of
        // sutd.edu.sg. SUTD red is the only swap from the original palette.
        cream: '#FAF8F4',
        sand: '#F0EBE3',
        'warm-gray': '#9B9188',
        stone: '#6B6158',
        charcoal: '#2E2E2E',
        'warm-white': '#FDFAF6',
        'sidebar-dark': '#1A1A1A',
        'warning-bg': '#FFF6E0',
        'success-bg': '#E8F0E5',
        'success-text': '#4A6B3A',
        // Softened from SUTD's pure brand reds (#DA0034 family), which read as
        // harsh against the cream canvas. This muted clay stays warm and
        // SUTD-adjacent; swap these three values to go back to strict brand red.
        terracotta: '#C05B4D',
        'terracotta-dark': '#A64A3E',
        'terracotta-light': '#D07B62',
        // SUTD secondary, used sparingly for "Official" badges and admin chrome.
        'sutd-navy': '#214975',
        'sutd-navy-dark': '#16335A',
        'sutd-amber': '#E17400',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'Tahoma', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '8xl': ['6rem', { lineHeight: '1.05' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      letterSpacing: {
        widest: '0.2em',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
