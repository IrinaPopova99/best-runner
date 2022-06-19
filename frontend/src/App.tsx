import React, { useEffect, useState } from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import { DarkOrLightThemeContext, SignInContext } from "./context";
import { BodyStyle } from "./DarkMode";
import ChangeTheme from "./components/ChangeTheme";
import { Routes } from "./routers/Routes";
import { useGetUserQuery } from "./api/userApi";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const { isSuccess, data, isLoading, error = {} } = useGetUserQuery({});
  const [isLoadingComponent, setIsLoadingComponent] = useState<boolean>(true);

  useEffect(() => {
    if (isLoading) return;
    setIsSignIn(isSuccess);
    setIsLoadingComponent(false);
  }, [isSuccess, isLoading]);
  // if ((isLoading && !isSuccess) || isLoadingComponent) return <SimpleLoader />;
  console.log(isSignIn);
  function toggleDarkMode() {
    setDarkMode((darkMode) => !darkMode);
  }

  return (
    <DarkOrLightThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <SignInContext.Provider value={{ isSignIn, setIsSignIn }}>
        <BodyStyle theme={darkMode}>
          <div className="app">
            {(isLoading && !isSuccess) || isLoadingComponent ? (
              <CircularProgress />
            ) : (
              <>
                <Header />
                <ChangeTheme toggleDarkMode={toggleDarkMode} />
                <Grid container justifyContent="center" alignItems="center">
                  <Grid container item xs={11}>
                    <Routes />
                  </Grid>
                </Grid>
              </>
            )}
          </div>
        </BodyStyle>
      </SignInContext.Provider>
    </DarkOrLightThemeContext.Provider>
  );
};

export default App;
