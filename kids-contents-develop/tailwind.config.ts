import type { Config } from "tailwindcss";


export default {
  important: true,
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background))",
        foreground: "rgba(var(--foreground))",
        primary: "rgba(var(--primary))",
        "base-black": "#121212",
        "black-alpha": {
          50: "#1212120d",
          100: "#1212121a",
          200: "#12121233",
          300: "#1212124d",
          400: "#12121266",
          500: "#12121280",
          600: "#12121299",
          700: "#121212b2",
          800: "#121212cc",
          900: "#121212e5",
        },
        "white-alpha": {
          50: "#ffffff0d",
          100: "#ffffff1a",
          200: "#ffffff33",
          300: "#ffffff4d",
          400: "#ffffff66",
          500: "#ffffff80",
          600: "#ffffff99",
          700: "#ffffffb2",
          800: "#ffffffcc",
          900: "#ffffffe5",
        },
        blue: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb", // base
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",

        },
        error: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626", // base
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a",
        },
        gray: {
             50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",

        },
        green: {
                 50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669", // base
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",

        },
        orange: {
           50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24", // base
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",

        },
        pink: {
           50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899", // base
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
          950: "#500724",

        },
        purple: {
             50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7", // base
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",

        },
        success: {
          50: "#f0fdf5",
          100: "#dcfce8",
          200: "#bbf7d1",
          300: "#86efad",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a", // base
          700: "#15803c",
          800: "#166533",
          900: "#14532b",
          950: "#052e14",
        },
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706", // base
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",

        },
        yellow: {
           50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15", // base
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
          950: "#422006",

        },
        violet: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
             600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
            950: "#2e1065",
        },
      },
      backgroundImage: {
        "golden-gradient":
          "linear-gradient(180deg, #FFDA88 0%, transparent 100%)",
      },
    },
  },
  extend: {
  fontFamily: {
    sans: ["var(--font-main)", "system-ui", "sans-serif"],
  },
},
  plugins: [],
} satisfies Config;
