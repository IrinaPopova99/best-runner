import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { ThemeContext } from "./context";
import { BodyStyle } from "./DarkMode";
import ChangeTheme from './components/ChangeTheme';
import ContentContainer from "./components/Content/ContentContainer";
import ChartPageContainer from './components/Chart/ChartPageContainer';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    setDarkMode((darkMode) => !darkMode);
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <BodyStyle theme={darkMode}>
        <div className="app">
          <Header />
          <ChangeTheme toggleDarkMode={toggleDarkMode} />
          <Grid container justify="center" alignItems="center">
            <Grid container item xs={11}>
              <Route
                exact
                path="/"
                render={() => <ContentContainer />}
              />
              <Route
                exact
                path="/chart"
                render={() => <ChartPageContainer />}
              />
            </Grid>
          </Grid>
        </div>
      </BodyStyle>
    </ThemeContext.Provider>
  );
};

export default App;
