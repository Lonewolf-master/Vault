/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#0B0F0E",
          secondary: "#0F1412",
          tertiary: "#121A17",
        },

        surface: {
          DEFAULT: "#111917",
          hover: "#16211D",
          sidebar: "#0D1311",
          modal: "#121C18",
        },

        primary: {
          DEFAULT: "#1ED760",
          hover: "#19C653",
          active: "#14A847",
        },

        accent: {
          neon: "#00FF9C",
          soft: "#4ADE80",
          teal: "#22C55E",
        },

        text: {
          primary: "#E6F4EA",
          secondary: "#A7B3AF",
          muted: "#6B7C75",
          inverse: "#0B0F0E",
        },

        border: {
          DEFAULT: "#1F2A26",
          subtle: "#16201C",
          strong: "#2A3A34",
        },

        input: {
          bg: "#0F1714",
          border: "#1C2A25",
          focus: "#1ED760",
          placeholder: "#6B7C75",
        },

        button: {
          primary: "#1ED760",
          secondary: "#16211D",
          ghost: "#1A2A24",
        },

        status: {
          success: "#22C55E",
          warning: "#FACC15",
          error: "#EF4444",
          info: "#38BDF8",
        },
      },

      boxShadow: {
        glow: "0 0 20px rgba(30, 215, 96, 0.4)",
        soft: "0 4px 20px rgba(0, 0, 0, 0.6)",
        card: "0 0 30px rgba(0, 255, 156, 0.15)",
      },
    },
  },
  plugins: [],
};