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
          50: '#e6f7fa',
          100: '#b3e4f0',
          200: '#80d1e6',
          300: '#4dbedb',
          400: '#26abd1',
          500: '#2FA8C7',
          600: '#1B7F9E',
          700: '#135E73',
          800: '#0c3f4f',
          900: '#05202a',
        },
        secondary: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#F7E701',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
    },
  },
  plugins: [],
}