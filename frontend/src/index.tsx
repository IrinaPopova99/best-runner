import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import i18next from 'i18next';
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "./App.scss";
import { I18nextProvider } from "react-i18next";
import { getConfig as getI18nextConfig } from './translation';

i18next.init(getI18nextConfig());

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store} >
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
