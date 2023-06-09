/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: {
          50: '#f9f6f8',
          100: '#d7d4d6',
          200: '#afa9ad',
          300: '#887f85',
          400: '#60545c',
          500: '#382933',
          550: '#32252E',
          600: '#2d2129',
          700: '#22191f',
          800: '#161014',
          900: '#0b080a',
        },
        green: {
          50: '#f2f7f5',
          100: '#dceae3',
          200: '#b9d6c7',
          300: '#A4B494',
          400: '#74ad8e',
          500: '#519872',
          600: '#417a5b',
          700: '#315b44',
          800: '#3B5249',
          900: '#101e17',
          950: '#0d2119',
        },
      },
      fontFamily: {
        sans: ['Jost', 'sans-serif'],
        serif: ['Texturina', 'serif'],
        hand: ['Indie Flower', 'cursive'],
      },
      animation: {
        type: 'type 3s ease-out infinite alternate both',
      },
      keyframes: {
        type: {
          '0%': { transform: 'translateX(0%)' },
          '20%': { transform: 'translateX(0%)' },
          '30%': { transform: 'translateX(40%)' },
          '40%': { transform: 'translateX(60%)' },
          '50%': { transform: 'translateX(80%)' },
          '60%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
