/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#d9d9d9',
        customBlue: '#02172A',
        customDBlue: '#1b2e40'
      },
    },
  },
  plugins: [],
}

