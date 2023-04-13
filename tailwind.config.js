/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,ts}'],
	theme: {
		extend: {
			animation: {
				fade: 'fadeOut 0.1s ease-in'
			},

			keyframes: theme => ({
				fadeOut: {
					'0%': { backgroundColor: 'transparent' },
					'100%': { backgroundColor: theme('colors.gray.600') }
				}
			})
		}
	},
	plugins: []
}
