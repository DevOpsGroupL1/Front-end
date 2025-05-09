/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-color": "var(--primary-color)",
        "patient-sidebar": "var(--patient-sidebar)",
        "patient-primary": "var(--patient-primary)",
        text: "var(--text)",
        "light-gray": "var(--light-gray)",
        "border-gray": "var(--border-gray)",
        "white-bg": "#fcfcfc",
        "yellow-custom": "var(--yellow)",
        blue: "var(--blue)",
        "alice-blue": "var(--alice-blue)",
        purple: "var(--purple)",
      },
      boxShadow: {
        custom: "0 0 16px 0 rgba(0, 0, 0, 0.05)",
      },
      screens: {
        xsm: { max: "399px" },
        ssm: { max: "479px" },
        sm: { max: "600px" },
        md: { max: "768px" },
        xmd: { max: "800px" },
        xxmd: { max: "850px" },
        lg: { max: "975px" },
        xxlg: { max: "1099px" },
        xlg: { max: "1223px" },
        xxxlg: { max: "1440px" },
        mxl: { max: "1279px" },
        mlg: { max: "1024px" },
        mmlg: { max: "975px" },
        mmd: { max: "768px" },
        msm: { max: "639px" },
        mxs: { max: "425px" },
        mxxs: { max: "399px" },
        mxxss: { max: "374px" },
        mxxssw: { max: "354px" },
        mxxxs: { max: "319px" },
        "ms-height": { raw: "(max-height: 699px)" },
        "mxl-height": { raw: "(max-height: 849px)" },
      },
    },
  },
  plugins: [],
};
