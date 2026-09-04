import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  plugins: [daisyui],
  daisyui: {
    themes: [
      // Both themes are deliberately selected sets, not automatic flips of each
      // other. The primary steps were run through the dataviz validator against
      // the base-100 surfaces below: both pass the lightness band, the chroma
      // floor and 3:1 contrast, and sit clear of the status colours (worst
      // normal-vision pair 27.6, floor 15) so the budget meter's normal /
      // warning / over states never read as the same colour.
      //
      // success / warning / error are the fixed status palette and are NOT
      // themed. Warning is sub-3:1 on the light surface by design, which is why
      // every status in the UI ships with an icon and a text label beside it.
      {
        lightTheme: {
          primary: "#6D5AE6",
          "primary-content": "#ffffff",
          secondary: "#8B7AF0",
          "secondary-content": "#ffffff",
          accent: "#0E8AA0",
          "accent-content": "#ffffff",
          neutral: "#2A2A33",
          "neutral-content": "#ffffff",
          "base-100": "#FCFCFD",
          "base-200": "#F2F2F6",
          "base-300": "#E4E4EC",
          "base-content": "#14141A",
          info: "#2a78d6",
          "info-content": "#ffffff",
          success: "#0ca30c",
          "success-content": "#ffffff",
          warning: "#fab219",
          "warning-content": "#14141A",
          error: "#d03b3b",
          "error-content": "#ffffff",
        },
      },
      {
        darkTheme: {
          primary: "#8B7AF0",
          "primary-content": "#14121C",
          secondary: "#6D5AE6",
          "secondary-content": "#ffffff",
          accent: "#22A7BF",
          "accent-content": "#101619",
          neutral: "#23222E",
          "neutral-content": "#E8E7F0",
          "base-100": "#17141F",
          "base-200": "#201D2B",
          "base-300": "#2C2838",
          "base-content": "#E8E7F0",
          info: "#3987e5",
          "info-content": "#ffffff",
          success: "#0ca30c",
          "success-content": "#ffffff",
          warning: "#fab219",
          "warning-content": "#14141A",
          error: "#d03b3b",
          "error-content": "#ffffff",
        },
      },
    ],
    darkTheme: "darkTheme",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    themeRoot: ":root",
  },
};
