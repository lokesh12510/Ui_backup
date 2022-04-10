import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "./utils/store";
import "./index.css";
import App from "./App";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { DefaultTheme } from "./utils/constants/Theme";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={DefaultTheme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
