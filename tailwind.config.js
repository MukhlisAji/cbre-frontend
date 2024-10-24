/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        // "c-teal": "#5a8184", 
        "c-teal": "#003F2D",
        "c-weldon-blue": "#7B9A9D",
        "c-gray": "#d8ddde",
        "c-green": "#88bbac",
        "c-dark-gray": "#605e5c",
        "c-yellow": "#dad998",
        "c-light-gray": "#eeeded",
        "c-dark-blue": "#124236",
        "c-light-teal": "#a7c7c9",
        "c-dark-teal": "#0a2b2a",
        // "c-dark-grayish": "#485558",
        "c-light-grayish": "#7A8A98",
        "c-dark-grayish": "#012A2D",
        // "bg-neutral-100": "#7A8A98",
        "c-red": "#AD2A2A",
      },
      keyframes: {
        'fade-in-out': {
          '0%, 100%': { opacity: 0 },
          '10%, 90%': { opacity: 1 },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 }
        }
      },
      animation: {
        'fade-in-out': 'fade-in-out 5s ease-in-out',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-out': 'fade-out 0.5s ease-in forwards'
      },
      height: {
        'row-height': '19px',
      },
    },
  },
  plugins: [
    import('flowbite/plugin')
  ],
};
