/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./app/App.tsx"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primaryColor: "#4A148C",
        accentColor: "#00B0FF",
        backgroundColor: "#121212",
        textColor: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
