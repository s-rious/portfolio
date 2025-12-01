/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            animation: {
                gradient: 'gradient 4s ease infinite',
            },
        },
    },
    plugins: [],
}