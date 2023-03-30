/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,svelte,ts}'],
    theme: {
        extend: {}
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: '#DC143C', // Crimson Red
                    'primary-focus': '#B31B1B', // Darker Crimson Red
                    'primary-content': '#F5F5F5', // White Smoke
                    secondary: '#A9A9A9', // Dark Gray
                    'secondary-focus': '#808080', // Gray
                    'secondary-content': '#F5F5F5', // White Smoke
                    accent: '#FFD700', // Gold
                    'accent-focus': '#D4AF37', // Darker Gold
                    'accent-content': '#000000', // Black
                    neutral: '#F5F5F5', // White Smoke
                    'neutral-focus': '#E0E0E0', // Light Gray
                    'neutral-content': '#000000', // Black
                    'base-100': '#333333', // Dark Gray
                    'base-200': '#292929', // Darker Gray
                    'base-300': '#1E1E1E', // Even Darker Gray
                    'base-content': '#F5F5F5', // White Smoke
                    info: '#ADD8E6', // Light Blue
                    'info-content': '#000000', // Black
                    success: '#228B22', // Forest Green
                    'success-content': '#F5F5F5', // White Smoke
                    warning: '#FFA500', // Orange
                    'warning-content': '#000000', // Black
                    error: '#8B0000', // Dark Red
                    'error-content': '#F5F5F5' // White Smoke
                }
            }
        ]
    }
}
