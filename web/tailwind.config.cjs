/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Base MRI Colors (can be customized)
                primary: {
                    DEFAULT: '#007bff',
                    foreground: '#ffffff',
                },
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}
