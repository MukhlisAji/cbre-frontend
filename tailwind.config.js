/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "c-teal": "#5a8184",
        "c-weldon-blue": "#7B9A9D", // Primary color resembling teal
        "c-gray": "#d8ddde", // Secondary color resembling gray
        "c-green": "#88bbac", // Accent color resembling green
        "c-dark-gray": "#605e5c", // Dark accent color resembling dark green
        "c-yellow": "#dad998", // Neutral color resembling yellow
        "c-light-gray": "#eeeded", // Light gray color
        "c-dark-blue": "#124236", // Dark blue color
        "c-light-teal": "#a7c7c9",
        "c-dark-teal": "##0a2b2a",
        "c-dark-grayish": "#485558",
        "c-light-grayish": "#7A8A98",
      },
    },
  },
  plugins: [],
};
