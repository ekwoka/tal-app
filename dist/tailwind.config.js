module.exports = {
  purge: [
    './src/**/*.html',
    '.src/*.html',
    '.src/*.js'
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      typography: (theme) => ({
        default: {
          css: {
            color: theme('colors.gray.900'),
            a: {
              color: theme('colors.blue.500'),
            },
          }
        },
        dark: {
          css: {
            color: theme('colors.gray.100'),
            a: {
              color: theme('colors.blue.500'),
            },
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.gray.50'),
            },
          }
        }
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp')
  ],
}
