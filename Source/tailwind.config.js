/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{jsx,js}'],
	theme: {
	  extend: {
		colors: {
		  SpaceCherry: '#990011',
		},
	  },
	},
	plugins: [require('tailwind-scrollbar-hide')],
  };
  