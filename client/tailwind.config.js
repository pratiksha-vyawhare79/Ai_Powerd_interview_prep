/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#ebf0fe',
          200: '#dee7fe',
          300: '#c4d4fd',
          400: '#9fb9fc',
          500: '#7094fa',
          600: '#4e70f5',
          700: '#3c55e3',
          800: '#3245c4',
          900: '#2b399d',
          950: '#1e2460',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
