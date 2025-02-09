/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'azure-blue': '#007FFF',
        'wine-red': '#722F37',
        'golden': '#FFD700',
      },
      animation: {
        'twinkle': 'twinkle 4s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
      },
    },
  },
  plugins: [],
}