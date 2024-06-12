/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}']
  },
  content: [],
  theme: {
    screens: {
      // ***** MOBILE VIEW *****//
      xs: {
        min: '0px'
      },
      sm: {
        min: '600px',
      },
      // ***** TAB VIEW *****//
      md: {
        min: '960px',
      },
      // ***** DESKTOP VIEW *****//
      lg: {
        min: '1280px',
      },
      xl: {
        min: '1920px'
      }
    },
  },
  plugins: [],
}
