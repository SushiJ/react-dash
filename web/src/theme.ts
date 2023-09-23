// TODO: Hover states are kinda rough, Gotta look into it
export const tokensDark = {
  grey: {
    0: "#ffffff", // manually adjusted
    10: "#f6f6f6", // manually adjusted
    50: "#f0f0f0", // manually adjusted
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#030712",
    1000: "#0a0a0a", // manually adjusted
  },
  primary: {
    // blue
    100: "#d3d4de",
    200: "#a6a9be",
    300: "#7a7f9d",
    400: "#4d547d",
    500: "#21295c",
    600: "#191F45", // manually adjusted
    700: "#141937",
    800: "#0d1025",
    900: "#070812",
  },
  secondary: {
    // Pink
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
  },
};

export const tokensLight = {
  grey: {
    0: "#000000", // manually adjusted
    10: "#141414",
    50: "#292929",
    100: "#030712",
    200: "#1f2937",
    300: "#374151",
    400: "#4b5563",
    500: "#6b7280",
    600: "#9ca3af",
    700: "#d1d5db",
    800: "#e5e7eb",
    900: "#f3f4f6",
    1000: "#ffffff", // manually adjusted
  },

  primary: {
    // blue
    100: "#070812",
    200: "#0d1025",
    300: "#141937",
    400: "#191F45", // manually adjusted
    500: "#21295c",
    600: "#4d547d",
    700: "#7a7f9d",
    800: "#a6a9be",
    900: "#d3d4de",
  },
  secondary: {
    // Pink
    100: "#831843",
    200: "#9d174d",
    300: "#be185d",
    400: "#db2777",
    500: "#ec4899",
    600: "#f472b6",
    700: "#f9a8d4",
    800: "#fbcfe8",
    900: "#fce7f3",
  },
};

function setPalette(mode: "dark" | "light") {
  if (mode === "dark") {
    return {
      mode,
      primary: Object.assign(tokensDark.primary, {
        main: tokensDark.primary[400],
        light: tokensDark.primary[400],
      }),
      secondary: Object.assign(tokensDark.secondary, {
        main: tokensDark.secondary[300],
      }),
      neutral: Object.assign(tokensDark.grey, {
        main: tokensDark.grey[500],
      }),
      background: {
        default: tokensDark.primary[600],
        alt: tokensDark.primary[500],
      },
    };
  } else {
    return {
      mode,
      primary: Object.assign(tokensLight.primary, {
        main: tokensLight.grey[900],
        light: tokensLight.grey[800],
      }),
      secondary: Object.assign(tokensLight.secondary, {
        main: tokensLight.secondary[400],
        light: tokensLight.secondary[300],
      }),
      neutral: Object.assign(tokensLight.grey, {
        main: tokensLight.grey[300],
      }),
      background: {
        default: tokensLight.grey[1000],
        alt: tokensLight.grey[900],
      },
    };
  }
}

export const themeSettings = (mode: "dark" | "light") => {
  return {
    palette: setPalette(mode),
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

export type ThemeSettingType = ReturnType<typeof themeSettings>;
