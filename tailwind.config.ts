import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate"; // استيراد

const config: Config = {
  mode: "jit",

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/*.{js,ts,jsx,tsx,mdx}",
    "./src/allPages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/allPages/Career/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{html,ts,tsx,jsx,js}",
  ],
  theme: {
    extend: {
      fontSize: {
        md: "16px",
      },
      fontFamily: {
        Condensed: ["Roboto Condensed", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"],
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        custom: "0 0 1px 0px #000",
      },
      keyframes: {
        shadowGrow: {
          "0%": { boxShadow: "0 0 1px 0px #000" },
          "100%": { boxShadow: "0 0 10px 5px #000" },
        },
        accordionDown: {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        accordionUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "shadow-grow": "shadowGrow 0.5s ease-in-out",
        "accordion-down": "accordionDown 0.2s ease-out",
        "accordion-up": "accordionUp 0.2s ease-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-gradient":
          "linear-gradient(to top, #005879 0%, rgba(22, 28, 45, 0.5) 100%)",
      },
      colors: {
        "custome-white": "#fff",
        muted: "#94a3b8",
        "custome-black": "#000",
        "custome-blue": "#005879",
        "custome-venice": "#edf3f8",
        "transparent-blue": "#00587961",
        "custome-yellow": "#ffd119",
        "custome-gray": "#ced4d6",
        "custome-red": "#ff6665",
        accent: "#ffd119",
        grey: "#edf3f8",
        "dark-gray": "#ced4d6",
        edit: "#2dd4bf",
        primary: "#01425a",
        bg: "#ffffff",
        secondary: "#005879",
        secondary20: "#bed4de",
        red500: "#ef4444",
        delete: "#f87171",
        dark: "#1d1d1d",
      },
      container: {
        center: true,
        // padding: "1rem",
        screens: {
          DEFAULT: "100%",
          sm: "600px",
          md: "728px",
          lg: "984px",
          xl: "1240px",
          "2xl": "1427.75px", // هنا تقوم بتحديد الحد الأقصى للـ container
        },
      },
    },

    screens: {
      xxxxl: { max: "1500px" },
      xxxl: { max: "1450px" },
      xxl: { max: "1350px" },
      xlll: { max: "1290px" },
      xll: { max: "1270px" },
      xl: { max: "1200px" },
      alg: { max: "1180px" },
      lg: { max: "1130px" },
      cll: { max: "1080px" },
      clg: { max: "1016px" },
      blg: { max: "950px" },
      amd: { max: "900px" },
      md: { max: "768px" },
      fmd: { max: "750px" },
      bmd: { max: "719px" },
      asmm: { max: "670px" },
      asm: { max: "650px" },
      ss: { max: "600px" },
      sm: { max: "550px" },
      axss: { max: "450px" },
      axs: { max: "400px" },
      xs: { max: "375px" },
      mb: { min: "350px" },
      "max-320": { max: "320px" },
    },
  },
  // plugins: [],
  plugins: [tailwindcssAnimate],
};
export default config;
