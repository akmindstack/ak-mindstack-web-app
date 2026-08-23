/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#12161C',
          soft: '#1B212B',
          line: '#262C36',
        },
        paper: {
          DEFAULT: '#F3F4F0',
          dim: '#E9EAE4',
          line: '#DADCD4',
        },
        signal: {
          DEFAULT: '#00B8A9',
          dim: '#00A093',
          light: '#5FE3D6',
        },
        volt: {
          DEFAULT: '#FFC53D',
          dim: '#E8A916',
        },
        slate: {
          soft: '#8A8F98',
          deep: '#4A4F58',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-light': 'linear-gradient(#DADCD4 1px, transparent 1px), linear-gradient(90deg, #DADCD4 1px, transparent 1px)',
        'grid-dark': 'linear-gradient(#262C36 1px, transparent 1px), linear-gradient(90deg, #262C36 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'pulse-line': {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'pulse-line': 'pulse-line 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
