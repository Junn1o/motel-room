/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
  './public/index.html',
  'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      width: {
      '1100' : '1100px',
      'full' :'100%'
    },
    height: {
      '1100' : '1100px',
      '500' : '500px',
      'full' :'100%'
    },
    maxWidth : {
      '600' : '600px',
    },
    backgroundColor: {
      primary: '#f5f5f5',
      secondary : '#1266dd',
      secondary2: '#f73859',
      secondary3: '#3961fb',
      acolor : 'Turquoise'
    },
    cursor: {
      pointer: 'pointer'
    },
  },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}


