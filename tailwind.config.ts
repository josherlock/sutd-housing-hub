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
        // SUTD reds. Token names kept as "terracotta" so existing components do
        // not need to change. These are SUTD's actual brand reds pulled from
        // their stylesheet.
        terracotta: '#DA0034',
        'terracotta-dark': '#B60034',
        'terracotta-light': '#E30000',
        // SUTD secondary, used sparingly for "Official" badges and admin chrome.
        'sutd-navy': '#214975',
        'sutd-navy-dark': '#16335A',
        'sutd-amber': '#E17400',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-saira)', 'Saira', 'Tahoma', 'system-ui', 'sans-serif'],
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
