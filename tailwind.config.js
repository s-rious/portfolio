/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-primary': '#14B8A6',   // teal
                'brand-secondary': '#F87171', // red
                'brand-accent': '#F59E0B',    // amber
            },

            keyframes: {
                gradient: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
            },

            animation: {
                gradient: 'gradient 6s ease infinite',
            },
        },
    },
    plugins: [],
}
