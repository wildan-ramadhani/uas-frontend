// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'logo-color-change': {
          '0%, 100%': { color: 'white' }, // Or use theme('colors.base-100') if white is theme-defined
          '50%': { color: 'black' },     // Or use theme('colors.base-content')
        }
      },
      animation: {
        'logo-color-change': 'logo-color-change 5s infinite ease-in-out',
      }
    },
  },
  plugins: [require("daisyui")],
};