/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        colors: {
            white: "#d0d0d0",
            black: "#191717",
        },
        fontFamily: {
            sans: ["IBM Plex Mono", "monospace"],
        },
        extend: {
            fontSize: {
                xxs: ".7em",
            },
        },
    },
    plugins: [],
};
