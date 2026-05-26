import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#0C0809',
        surface: '#161012',
        elevated: '#21161A',
        wine: {
          DEFAULT: '#C41E3A',
          dim: 'rgba(196, 30, 58, 0.18)',
        },
        gold: {
          DEFAULT: '#D4A843',
          dim: 'rgba(212, 168, 67, 0.15)',
        },
        teal: {
          DEFAULT: '#D4A843',
          dim: 'rgba(212, 168, 67, 0.15)',
        },
        amber: {
          DEFAULT: '#D4A843',
          dim: 'rgba(212, 168, 67, 0.15)',
        },
        yes: {
          DEFAULT: '#22A06B',
          dim: 'rgba(34, 160, 107, 0.18)',
        },
        no: {
          DEFAULT: '#E05252',
          dim: 'rgba(224, 82, 82, 0.18)',
        },
      },
      fontFamily: {
        sora: ['var(--font-sora)', 'system-ui', 'sans-serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        georgian: ['var(--font-noto-georgian)', 'var(--font-sora)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      boxShadow: {
        glow: '0 8px 32px -8px rgba(196, 30, 58, 0.35)',
        'glow-gold': '0 8px 32px -8px rgba(212, 168, 67, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
export default config;
