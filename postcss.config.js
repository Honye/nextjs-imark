module.exports = {
  plugins: [
    'tailwindcss',
    [
      '@fullhuman/postcss-purgecss',
      process.env.NODE_ENV === 'production'
        ? {
          content: [
            './pages/**/*.{js,jsx}',
          ],
          defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || []
        }
        : false
    ],
    'autoprefixer'
  ]
}
