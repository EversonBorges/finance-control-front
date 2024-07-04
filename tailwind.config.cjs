/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    'node_modules/flowbite-react/**/*.{js,jsx}',
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: 'rgb(18, 18, 18)',
          200: 'rgb(51, 51, 51)'
        },
        light: {
          100: '#167BF7',
          200: '#051933'
        }
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
]
}