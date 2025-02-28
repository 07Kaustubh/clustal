module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FFB303", // Custom primary color
        dark: "#171A26",
      },
      spacing: {
        18: "4.5rem", // Example spacing token
      },
      fontFamily: {
        sans: ["SpaceMono-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
