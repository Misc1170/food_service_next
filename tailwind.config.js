const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('/images/freepik-export-20240811174806xbtY.jpeg')",
      },
    },
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      F06D00: "#F06D00",
      D9D9D9: "#D9D9D9",
      "4A914C": "#4A914C",
      BCD1BD: "#BCD1BD",
      "302E2E": "#302E2E",
      "1F0000": "#1F0000",
      "light-green": "#0ac984",
      "light-red": "#f87171",
      ECECEC: "#ECECEC",
      EEC7A6: "#EEC7A6",
      "6ED0F6": "#6ED0F6",
    },
  },
  plugins: [nextui()],
};
