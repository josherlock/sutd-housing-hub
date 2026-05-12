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
        cream: '#FAF8F4',
        sand: '#F0EBE3',
        'warm-gray': '#9B9188',
        stone: '#6B6158',
        terracotta: '#C4603B',
        'terracotta-dark': '#A84F2F',
        'terracotta-light': '#E8856A',
        charcoal: '#2C2420',
        'warm-white': '#FDFAF6',
        'sidebar-dark': '#0F1923',
        'warning-bg': '#FFF8E1',
        'success-bg': '#E8F0E5',
        'success-text': '#4A6B3A',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
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
