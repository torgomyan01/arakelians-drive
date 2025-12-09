const flexClasses = {
  '.flex-jsb-c': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  '.flex-jsb-s': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
  },
  '.flex-jsb-e': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
  },
  '.flex-js-c': {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  '.flex-js-s': {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'start',
  },
  '.flex-js-e': {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'end',
  },
  '.flex-jc-c': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '.flex-jc-s': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
  },
  '.flex-jc-e': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end',
  },
  '.flex-je-e': {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'end',
  },
  '.flex-jse-c': {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  '.flex-jsa-c': {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  '.flex-je-c': {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },
  '.flex-je-s': {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'start',
  },
}

module.exports = {
  mode: 'jit',
  content: ["./*.html", './components/*.html'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        'white': '#FFF',
        'black': '#323232',
        'gray': '#687076',
        'blue': '#009FFF',
        'orange': '#FF7A00',
        'purple': '#6A8AFF',
        'borderColor': '#D7DBDF',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
      borderColor: {
        DEFAULT: "#D7DBDF"
      },
    },
  },
  variants: {
    display: ['show'],
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addComponents }) {

      addComponents(flexClasses);
    },
  ],
};
