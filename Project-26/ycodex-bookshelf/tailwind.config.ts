
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'primary': ['Space Grotesk', 'sans-serif'],
				'secondary': ['IBM Plex Sans', 'sans-serif'],
			},
			colors: {
				// Custom BookFury theme
				'bg-primary': 'var(--bg-primary)',
				'bg-surface': 'var(--bg-surface)',
				'accent': 'var(--accent)',
				'text-primary': 'var(--text-primary)',
				'text-secondary': 'var(--text-secondary)',
				'hover-glow': 'var(--hover-glow)',
				'border': 'var(--border)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
