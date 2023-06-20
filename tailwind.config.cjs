import colors from 'tailwindcss/colors';

const newBlack = {
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
};
const newGreen = {
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
};

/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        type: 'type 2s ease-out infinite alternate both',
        slideIn: 'slideIn 0.5s ease-in-out',
        slideOut: 'slideIn 0.5s ease-out reverse',
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
        slideIn: {
          '0%': { transform: 'translateX(150%)', opacity: '0' },
          '50%': { transform: 'translateX(50%)', opacity: '0' },
          '100%': { transform: 'translateX(0%)', opacity: '1' },
        },
      },
      colors: {
        black: newBlack,
        green: newGreen,
        'secondary-hover': newBlack[550],
      },
    },
    fontFamily: {
      sans: ['Jost', 'sans-serif'],
      serif: ['Texturina', 'serif'],
      hand: ['Indie Flower', 'cursive'],
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          primary: newGreen[600],
          secondary: newBlack[500],
          neutral: newBlack[700],
          'secondary-focus': newBlack[600],
          'base-100': newBlack[700],
          info: '#3b82f6',
          success: newGreen[500],
          warning: '#eab308',
          error: '#dc2626',
        },
      },
    ],
  },
};
