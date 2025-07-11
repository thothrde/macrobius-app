/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        azure: {
          DEFAULT: '#007BC7',
          50: '#E5F4FF',
          100: '#CCE9FF',
          200: '#99D3FF',
          300: '#66BDFF',
          400: '#33A7FF',
          500: '#007BC7',
          600: '#0066A3',
          700: '#00527F',
          800: '#003D5C',
          900: '#002938'
        },
        wine: {
          DEFAULT: '#722F37',
          50: '#F5E6E8',
          100: '#EBCDD1',
          200: '#D79BA3',
          300: '#C36975',
          400: '#AF3747',
          500: '#722F37',
          600: '#5B252C',
          700: '#441C21',
          800: '#2D1216',
          900: '#16090B'
        },
        gold: {
          DEFAULT: '#FFD700',
          50: '#FFFEF0',
          100: '#FFFDE0',
          200: '#FFFBC2',
          300: '#FFF9A3',
          400: '#FFF785',
          500: '#FFD700',
          600: '#E6C200',
          700: '#CCAD00',
          800: '#B39900',
          900: '#998400'
        }
      },
      fontFamily: {
        'serif': ['Crimson Text', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'latin': ['Trajan Pro', 'Cinzel', 'serif']
      },
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'text-reveal': 'text-reveal 1s ease-out',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 1.2s ease-out',
        'astrolab-rotate': 'astrolab-rotate 60s linear infinite',
        'planet-rotate': 'planet-rotate 20s linear infinite',
        'pulse-gold': 'pulse-gold 2s infinite',
        'stagger-text': 'stagger-text 0.5s ease-out both'
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0.5)' },
          '50%': { opacity: '1', transform: 'scale(1)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(5deg)' }
        },
        'text-reveal': {
          '0%': { opacity: '0', transform: 'translateY(30px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        'astrolab-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'planet-rotate': {
          '0%': { transform: 'rotate(0deg) translateX(50px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(50px) rotate(-360deg)' }
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 215, 0, 0.4)' },
          '50%': { boxShadow: '0 0 0 20px rgba(255, 215, 0, 0)' }
        },
        'stagger-text': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      backdropBlur: {
        'enhanced': '12px'
      },
      boxShadow: {
        'wine': '0 10px 25px rgba(114, 47, 55, 0.4)',
        'gold': '0 10px 25px rgba(255, 215, 0, 0.3)',
        'azure': '0 10px 25px rgba(0, 123, 199, 0.3)'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms'
      }
    },
  },
  plugins: [],
  safelist: [
    'bg-azure',
    'bg-wine',
    'bg-gold',
    'text-wine',
    'text-gold',
    'btn-wine',
    'btn-wine-large',
    'animate-twinkle',
    'animate-float',
    'animate-text-reveal',
    'animate-slide-up',
    'animate-fade-in',
    'animate-astrolab-rotate',
    'animate-planet-rotate',
    'animate-pulse-gold',
    'animate-stagger-text'
  ]
}