/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './storyblok/**/*.{html,js,ts,vue}'
  ],
  theme: {
    extend: {
      fontSize: {
        '11px': '11px',
      },
    },
    screens: {
      'mobile': '560px',
      'tablet': '832px',
      'tablet-landscape': '1104px',
      'desktop': '1408px',
    },
  },
  plugins: [],
}

