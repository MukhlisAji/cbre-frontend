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
        "c-teal": "#5a8184",
        "c-weldon-blue": "#7B9A9D",
        "c-gray": "#d8ddde",
        "c-green": "#88bbac",
        "c-dark-gray": "#605e5c",
        "c-yellow": "#dad998",
        "c-light-gray": "#eeeded",
        "c-dark-blue": "#124236",
        "c-light-teal": "#a7c7c9",
        "c-dark-teal": "#0a2b2a",
        "c-dark-grayish": "#485558",
        "c-light-grayish": "#7A8A98",
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
