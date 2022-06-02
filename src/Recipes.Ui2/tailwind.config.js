module.exports = {
  content: [
    './pages/**/*.{tsx,jsx}',
    './components/**/*.{tsx,jsx}',
  ],
  theme: {
    extend: {},
  },
  layer: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
