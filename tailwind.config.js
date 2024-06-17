/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./locales/tours/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: true
  },
  theme: {
    extend: {
      colors: {
        "primary": "#0d6efd",
        "success": "#32a852",
        "error": "#ff453a",

        "btn": "#484a4d",
        "btn-hover": "#525357",

        "subtle": "#333338",
        "active": "#212125",
        "dark": "#090912",
      },
      fontFamily: {
        "avant": "ITC Avant Garde Std Md, sans-serif",
        "now": "Helvetica Now Text, Helvetica, sans-serif",
      },
      height: {
        "112": "28rem",
        "128": "32rem",
        "144": "36rem",
        "160": "40rem",
        "176": "44rem",
        "192": "48rem",
      },
      borderWidth: {
        "1": "1px"
      }
    },
  },
  plugins: [
      require('@tailwindcss/typography')
  ],
}
