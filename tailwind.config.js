/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html',
    './src/**/*.{js,ts,jsx,tsx}',],
  theme: {
    extend: {
      colors:{
        gold: '#FFD700',

        black: '#000000'
      }, 
      
      backgroundImage:{
        'gradient-gold-black': 'linear-gradiennt(90deg, #FFD700 0%, #000000 100%)',
      },

    },
  },
  plugins: [],
}
fontFamily:{
  sans:['Roboto','sans-serif']
}