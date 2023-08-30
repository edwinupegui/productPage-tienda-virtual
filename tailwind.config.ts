/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens:{
        xs: '375px',
        sm: '425px',
        md: '640px',
        lg: '1024px',
        xl: '1440px',
      },
      colors: {
        lipa: '#FF40FC',
        tamagotchi: '#6064FF',
        motita: '#FFB7C7',
        alpinito: '#A37CFF',
        success: '#3EC92B',
        info: '#00369C',
        error: '#F35B69',
        warning: '#FAAD14',
        disabled: '#F35B69',
      },
      fontFamily: {
        sans: "'Rebrand Txt', sans-serif",
      },
    },
  },
  plugins: [],
}
