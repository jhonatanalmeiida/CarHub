/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Plus Jakarta Sans", "sans-serif"]
      },
      colors: {
        accent: {
          DEFAULT: "#1f8fff",
          muted: "#59a8ff"
        },
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          elevated: "rgb(var(--surface-elevated) / <alpha-value>)"
        }
      },
      boxShadow: {
        soft: "0 20px 60px rgba(4, 9, 21, 0.25)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(31,143,255,0.28), transparent 28%), linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 45%)"
      }
    }
  },
  plugins: []
};

