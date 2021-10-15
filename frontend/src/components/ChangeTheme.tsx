import React, { useContext } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { ChangeThemeButton } from "../DarkMode";
import { DarkOrLightThemeContext } from "../context";
import { useTranslation } from 'react-i18next';

type ChangeThemeProps = {
  toggleDarkMode: () => void;
};

const ChangeTheme: React.FC<ChangeThemeProps> = ({ toggleDarkMode }) => {
  const { t } = useTranslation('common');
  const { darkMode } = useContext(DarkOrLightThemeContext);

  return (
    <ChangeThemeButton theme={darkMode}>
      <FormControlLabel
        control={<Switch color="primary" />}
        label={t('hightRegime')}
        onClick={toggleDarkMode}
      />
    </ChangeThemeButton>
  );
};

export default ChangeTheme;
