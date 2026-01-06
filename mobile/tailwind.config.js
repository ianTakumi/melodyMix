/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./app/App.tsx"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        // Primary Tints
        primary_a0: "#43b9ea",
        primary_a10: "#62c1ec",
        primary_a20: "#7bc8ef",
        primary_a30: "#91d0f1",
        primary_a40: "#a5d8f4",
        primary_a50: "#b8e0f6",

        // Surface Colors
        surface_a0: "#121212",
        surface_a10: "#282828",
        surface_a20: "#3f3f3f",
        surface_a30: "#575757",
        surface_a40: "#717171",
        surface_a50: "#8b8b8b",

        // Tonal Surface Colors
        tonal_a0: "#2d4e5f",
        tonal_a10: "#43606f",
        tonal_a20: "#5a7280",
        tonal_a30: "#708591",
        tonal_a40: "#8798a3",
        tonal_a50: "#9eacb5",
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        body: { fontFamily: 'theme("fontFamily.sans")' },
      });
    },
  ],
};
