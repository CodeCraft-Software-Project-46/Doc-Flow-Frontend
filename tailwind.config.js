/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        discordGray: '#2c2f33', // Custom name for color
      },
    },
  },
  variants: {
    scrollbar: ['rounded'], // Optional: Customizes scrollbar styles
  },
}

