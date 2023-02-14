/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,scss,ts}",
  ],
  theme: {
    extend: {
      
    },
    
    maxWidth: {
      '50px': '50px',
      '340px': '340px',
      '1400px': '1400px',
      '1500px': '1500px',
      '1600px': '1600px',
      '1700px': '1700px',

    },
    opacity : {
      '12': '0.12',
      '38': '0.38',
      '87': '0.87',
    },

    maxHeight: {
      '50px': '50px',
    },
    
    minWidth: {
      '4': '1rem',
    },
    colors: {
      transparent: 'transparent',
      'white': '#FFFFFF',
      'yellow': '#FFD011',
      'light-grey': '#8A939B',
      'dark-grey': '#353840',
      'black': '#202225',
      'grey': '#2A2D33',
      'violet': '#5823C9',
      'light-violet': '#9A7ED7',
    },
    
    screens : {
      xs: '320px',
      sm: '480px',
      md: '768px',
      lg: '1000px',
      xl: '1280px',
      xxl: '1440px',
      xxxl: '1980px',
      'maxlg': {'max': '1000px'},

      // 'media-bullets': 
    },
    extend : {
      zIndex                  : {
        '-1'   : -1,
        '1'    : 1,
        '2'    : 2,
        '3'    : 3,
        '4'    : 4,
        '5'    : 5,
        '10'   : 10,
        '11'   : 11,
        '12'   : 12,
        '49'   : 49,
        '60'   : 60,
        '70'   : 70,
        '80'   : 80,
        '90'   : 90,
        '99'   : 99,
        '999'  : 999,
        '9999' : 9999,
        '99999': 99999
    },
    spacing                 : {
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '50': '12.5rem',
        '90': '22.5rem',

        // Bigger values
        '100': '25rem',
        '120': '30rem',
        '128': '32rem',
        '140': '35rem',
        '160': '40rem',
        '180': '45rem',
        '192': '48rem',
        '200': '50rem',
        '240': '60rem',
        '256': '64rem',
        '280': '70rem',
        '320': '80rem',
        '360': '90rem',
        '400': '100rem',
        '480': '120rem',

        '5p': '5%',
        '10p': '10%',
        '15p': '15%',
        '20p': '20%',

        '550px': '550px',
        '460px': '460px',
        '440px': '440px',
        '340px': '340px',
        '200px': '200px',
        '180px': '180px',
        '140px': '140px',
        '50px': '50px',
        '30px': '30px',
        '12px': '12px',
        '10px': '10px',
        '7px': '7px',

        // Fractional values
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%'
    },
    }
  },
  plugins: [],
}
