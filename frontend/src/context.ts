import React from "react";

export const DarkOrLightThemeContext = React.createContext({
  darkMode: true,
  toggleDarkMode: () => {},
});
