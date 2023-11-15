/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'serif': ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        'mono': ['SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'monospace'],
        'display': ['SF Pro Display', 'Oswald', 'Fira Sans', 'sans-serif'],
        'body': ['SF Pro Text', 'Open Sans', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

