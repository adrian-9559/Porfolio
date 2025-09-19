import { heroui } from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./layouts/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui'],
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.6s ease-out',
				'bounce-slow': 'bounce 2s infinite',
				'pulse-slow': 'pulse 3s infinite',
				'float': 'float 6s ease-in-out infinite',
				'slide-in-from-right-2': 'slideInFromRight 0.3s ease-out',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideUp: {
					'0%': { transform: 'translateY(30px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				slideInFromRight: {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' },
				},
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-mesh': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
			},
			backdropBlur: {
				xs: '2px',
			},
			screens: {
				'3xl': '1600px',
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'94': '23.5rem',
			},
			boxShadow: {
				'glow': '0 0 20px rgba(139, 92, 246, 0.3)',
				'glow-lg': '0 0 40px rgba(139, 92, 246, 0.4)',
				'inner-glow': 'inset 0 2px 4px 0 rgba(139, 92, 246, 0.1)',
			},
			colors: {
				'primary': {
					50: '#f0f9ff',
					100: '#e0f2fe',
					200: '#bae6fd',
					300: '#7dd3fc',
					400: '#38bdf8',
					500: '#0ea5e9',
					600: '#0284c7',
					700: '#0369a1',
					800: '#075985',
					900: '#0c4a6e',
				},
				'secondary': {
					50: '#fdf4ff',
					100: '#fae8ff',
					200: '#f5d0fe',
					300: '#f0abfc',
					400: '#e879f9',
					500: '#d946ef',
					600: '#c026d3',
					700: '#a21caf',
					800: '#86198f',
					900: '#701a75',
				},
				'purple': {
					25: '#fefbff',
					50: '#faf5ff',
					75: '#f3e8ff',
				},
			},
		},
	},
	darkMode: "class",
	plugins: [
		heroui(),
		function ({ addUtilities }) {
			const newUtilities = {
				'.text-gradient': {
					'background': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
					'-webkit-background-clip': 'text',
					'-webkit-text-fill-color': 'transparent',
					'background-clip': 'text',
				},
				'.bg-glass': {
					'background': 'rgba(255, 255, 255, 0.1)',
					'backdrop-filter': 'blur(10px)',
					'border': '1px solid rgba(255, 255, 255, 0.2)',
				},
				'.hover-lift': {
					'transition': 'transform 0.3s ease, box-shadow 0.3s ease',
					'&:hover': {
						'transform': 'translateY(-5px)',
						'box-shadow': '0 20px 40px rgba(0, 0, 0, 0.1)',
					},
				},
			}
			addUtilities(newUtilities)
		}
	],
}
