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
        base: '#060506',
        surface: '#0E0A0C',
        elevated: '#161114',
        wine: {
          DEFAULT: '#9E1A32',
          dim: 'rgba(158, 26, 50, 0.12)',
        },
        gold: {
          DEFAULT: '#C9A227',
          dim: 'rgba(201, 162, 39, 0.1)',
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
          DEFAULT: '#1D8F5C',
          dim: 'rgba(29, 143, 92, 0.14)',
        },
        no: {
          DEFAULT: '#C94444',
          dim: 'rgba(201, 68, 68, 0.14)',
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
        glow: '0 12px 40px -12px rgba(0, 0, 0, 0.6)',
        'glow-gold': '0 8px 32px -10px rgba(201, 162, 39, 0.15)',
        premium: '0 1px 0 rgba(255,255,255,0.04) inset, 0 24px 48px -24px rgba(0,0,0,0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
export default config;
