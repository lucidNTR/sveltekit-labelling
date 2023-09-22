/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
      animation: {
        pulse: 'fadeIn 1s, pulse 2s cubic-bezier(0.4, 0, 0.5, 1) infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '0.5' }
        }
      }
    }
	},
	plugins: []
}
