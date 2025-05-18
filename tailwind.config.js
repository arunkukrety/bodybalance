// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: '#10B981',
                'primary-foreground': '#121316', // Dark text on primary bg
                secondary: 'rgba(255, 255, 255, 0.1)', // Translucent white
                'card-dark': 'rgba(23, 23, 28, 1)', // Dark card background
                success: '#10B981',
                warning: '#eab308', // Use a yellowish color for warning
                danger: '#ef4444',  // Alias for error/red
                neutral: '#6B7280', // or muted-foreground
                'muted-foreground': '#6B7280', // For general muted text
            },
            animation: {
                glow: 'glow 1.5s ease-in-out infinite alternate',
                'fade-in': 'fadeIn 0.5s ease-in-out', // Added fade-in animation
                'scale-in': 'scaleIn 0.3s ease-in-out',  // Added scale-in animation

            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 15px rgba(16, 185, 129, 0.5)' },
                    '100%': { boxShadow: '0 0 25px rgba(16, 185, 129, 0.7)' },
                },
                fadeIn: {  // Define the fadeIn animation
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                scaleIn: { // Define the scaleIn animation
                    '0%': { transform: 'scale(0.95)', opacity: 0 },
                    '100%': { transform: 'scale(1)', opacity: 1 },
                },
            },
            backdropFilter: { // Make sure to enable backdrop-filter
                'none': 'none',
                'blur': 'blur(20px)',
            },
            boxShadow: {
                '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};