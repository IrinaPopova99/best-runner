import React, { useContext } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { ChangeThemeButton } from "../DarkMode";
import { ThemeContext } from "../context";

function ChangeTheme({ toggleDarkMode }) {
  const { darkMode } = useContext(ThemeContext);

  return (
    <ChangeThemeButton theme={darkMode}>
      <FormControlLabel
        control={<Switch color="primary" />}
        label="Ночной режим"
        onClick={toggleDarkMode}
      />
    </ChangeThemeButton>
  );
}

export default ChangeTheme;
