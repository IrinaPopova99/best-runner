import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "./App.scss";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store} >
        <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
