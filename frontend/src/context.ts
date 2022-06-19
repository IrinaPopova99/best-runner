import React from "react";

export const DarkOrLightThemeContext = React.createContext({
  darkMode: true,
  toggleDarkMode: () => {},
});

export const SignInContext = React.createContext({
  isSignIn: false,
  setIsSignIn: (_: boolean) => {},
});