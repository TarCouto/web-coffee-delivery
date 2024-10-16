import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'yellow-light': '#F1E9C9',
        yellow: '#DBAC2C',
        'yellow-dark': '#C47F17',
        'gray-input': '#EDEDED',
      },
    },
  },
  plugins: [],
}
export default config
