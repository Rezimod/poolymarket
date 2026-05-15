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
        base: '#0B0E1A',
        surface: '#111827',
        elevated: '#1A2234',
        teal: {
          DEFAULT: '#00D4AA',
          dim: 'rgba(0, 212, 170, 0.15)',
        },
        amber: {
          DEFAULT: '#F59E0B',
          dim: 'rgba(245, 158, 11, 0.15)',
        },
        yes: {
          DEFAULT: '#10B981',
          dim: 'rgba(16, 185, 129, 0.15)',
        },
        no: {
          DEFAULT: '#EF4444',
          dim: 'rgba(239, 68, 68, 0.15)',
        },
      },
      fontFamily: {
        sora: ['var(--font-sora)', 'system-ui', 'sans-serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      boxShadow: {
        glow: '0 8px 32px -8px rgba(0, 212, 170, 0.3)',
        'glow-amber': '0 8px 32px -8px rgba(245, 158, 11, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
export default config;
