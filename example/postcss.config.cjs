// postcss.config.cjs
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // ✅ must use this in Tailwind v4
    autoprefixer: {},
  },
};