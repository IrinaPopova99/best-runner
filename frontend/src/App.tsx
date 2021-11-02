import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { DarkOrLightThemeContext } from "./context";
import { BodyStyle } from "./DarkMode";
import ChangeTheme from './components/ChangeTheme';
// import ContentContainer from "./components/Table/TableContainer";
import ChartPage from './components/Chart/ChartPage';
import { WorkoutsTable } from "./components/Table/WorkoutsTable";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    setDarkMode((darkMode) => !darkMode);
  }

  return (
    <DarkOrLightThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <BodyStyle theme={darkMode}>
        <div className="app">
          <Header />
          <ChangeTheme toggleDarkMode={toggleDarkMode} />
          <Grid container justifyContent="center" alignItems="center">
            <Grid container item xs={11}>
              <Route
                exact
                path="/"
                // render={() => <ContentContainer />}
                render={() => <WorkoutsTable />}
              />
              <Route
                exact
                path="/chart"
                render={() => <ChartPage />}
                // render={() => <ChartPageContainer />}
              />
            </Grid>
          </Grid>
        </div>
      </BodyStyle>
    </DarkOrLightThemeContext.Provider>
  );
};

export default App;
