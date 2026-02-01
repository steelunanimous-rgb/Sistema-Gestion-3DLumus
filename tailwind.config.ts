import type { Config } from "tailwindcss"

const config: Config = {
    darkMode: ["class"],
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./modules/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
            colors: {
                bg: {
                    primary: "#121212",
                    secondary: "#181818",
                    card: "#1E1E1E",
                },
                border: {
                    subtle: "#2A2A2A",
                },
                text: {
                    primary: "#FFFFFF",
                    secondary: "#B5B5B5",
                    muted: "#8A8A8A",
                },
                accent: {
                    primary: "#F7931A",
                    secondary: "#FBB040",
                },
                success: "#3DD598",
                danger: "#FF6B6B",
                warning: "#FFC542",
            },
            borderRadius: {
                xl: "1rem",
            },
            boxShadow: {
                soft: "0 10px 30px rgba(0,0,0,0.35)",
            },
        },
    },
    plugins: [],
}

export default config
