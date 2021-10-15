import React, { useContext } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { ChangeThemeButton } from "../DarkMode";
import { DarkOrLightThemeContext } from "../context";

type ChangeThemeProps = {
  toggleDarkMode: () => void;
};

const ChangeTheme: React.FC<ChangeThemeProps> = ({ toggleDarkMode }) => {
  const { darkMode } = useContext(DarkOrLightThemeContext);

  return (
    <ChangeThemeButton theme={darkMode}>
      <FormControlLabel
        control={<Switch color="primary" />}
        label="Ночной режим"
        onClick={toggleDarkMode}
      />
    </ChangeThemeButton>
  );
};

export default ChangeTheme;
