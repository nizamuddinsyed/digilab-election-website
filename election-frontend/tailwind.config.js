/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '1.5rem',
				lg: '2rem',
			},
			screens: {
				'2xl': '1280px',
			},
		},
		extend: {
			colors: {
				// Poster Brand Colors
				beige: {
					DEFAULT: '#EBEAE4',  // Background
					light: '#F5F4EE',
					dark: '#D9D8D2',
				},
				charcoal: {
					DEFAULT: '#414043',  // Main heading
					light: '#4B4D58',     // Body text
				},
				// 3D Effect Colors
				purple: {
					DEFAULT: '#A28FE2',  // RGB 162,143,226
					light: '#C4B5FD',
					dark: '#8B7BC8',
				},
				teal: {
					DEFAULT: '#5DAAAD',  // RGB 93,170,173
					light: '#7DC5C8',
					dark: '#4A8B8D',
				},
				silver: {
					DEFAULT: '#C0C0C0',  // RGB 192,192,192
					light: '#D6D6D6',
					dark: '#A8A8A8',
				},
				// Keep some grays for UI elements
				gray: {
					50: '#FAFAFA',
					100: '#F4F4F5',
					200: '#E5E5E5',
					300: '#D4D4D4',
					400: '#A1A1AA',
					500: '#71717A',
					600: '#52525B',
					700: '#3F3F46',
					800: '#27272A',
					900: '#18181B',
				},
				// Semantic Colors
				success: '#16A34A',
				warning: '#F59E0B',
				error: '#EF4444',
				info: '#2563EB',
				white: '#FFFFFF',
			},
			fontFamily: {
				heading: ['Poppins', 'sans-serif'],
				body: ['Inter', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			fontSize: {
				'6xl': ['3.75rem', { lineHeight: '1.25' }],
				'5xl': ['3rem', { lineHeight: '1.25' }],
				'4xl': ['2.25rem', { lineHeight: '1.25' }],
				'3xl': ['1.875rem', { lineHeight: '1.25' }],
				'2xl': ['1.5rem', { lineHeight: '1.5' }],
				'xl': ['1.25rem', { lineHeight: '1.5' }],
				'lg': ['1.125rem', { lineHeight: '1.75' }],
				'base': ['1rem', { lineHeight: '1.5' }],
				'sm': ['0.875rem', { lineHeight: '1.5' }],
				'xs': ['0.75rem', { lineHeight: '1.5' }],
			},
			spacing: {
				'1': '0.25rem',
				'2': '0.5rem',
				'3': '0.75rem',
				'4': '1rem',
				'5': '1.25rem',
				'6': '1.5rem',
				'8': '2rem',
				'10': '2.5rem',
				'12': '3rem',
				'16': '4rem',
				'20': '5rem',
				'24': '6rem',
				'32': '8rem',
				'48': '12rem',
				'64': '16rem',
			},
			boxShadow: {
				'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
				'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
				'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				'2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
				'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
				'election': '0 4px 20px rgba(30, 64, 175, 0.15)',
				'election-lg': '0 10px 30px rgba(30, 64, 175, 0.2)',
			},
			borderRadius: {
				'sm': '0.125rem',
				'DEFAULT': '0.375rem',
				'md': '0.5rem',
				'lg': '0.75rem',
				'xl': '1rem',
				'2xl': '1.5rem',
				'3xl': '2rem',
				'full': '9999px',
			},
			transitionDuration: {
				'fast': '150ms',
				'DEFAULT': '250ms',
				'slow': '300ms',
				'slower': '500ms',
			},
			transitionTimingFunction: {
				'out': 'ease-out',
				'in': 'ease-in',
				'in-out': 'ease-in-out',
				'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 },
				},
				'slide-up': {
					'0%': { transform: 'translateY(10px)', opacity: 0 },
					'100%': { transform: 'translateY(0)', opacity: 1 },
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: 0 },
					'100%': { transform: 'scale(1)', opacity: 1 },
				},
				'pulse-slow': {
					'0%, 100%': { opacity: 1 },
					'50%': { opacity: 0.5 },
				},
				'bounce-slow': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' },
				},
			},
			animation: {
				'fade-in': 'fade-in 250ms ease-out',
				'slide-up': 'slide-up 300ms ease-out',
				'scale-in': 'scale-in 200ms ease-out',
				'pulse-slow': 'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'bounce-slow': 'bounce-slow 2s infinite',
			},
			backgroundImage: {
				'election-gradient': 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
				'election-gradient-light': 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
				'election-gradient-warm': 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}