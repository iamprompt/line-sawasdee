import type { Config } from 'tailwindcss'
import twAnimate from 'tailwindcss-animate'
import twAriaComponents from 'tailwindcss-react-aria-components'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['LINE Seed Sans TH', 'sans-serif'],
      },
    },
  },
  plugins: [twAriaComponents, twAnimate],
} satisfies Config
