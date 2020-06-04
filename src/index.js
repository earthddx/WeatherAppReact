import React from "react";
import ReactDOM from "react-dom";
import theme from "./theme";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";

import App from "./App";

ReactDOM.render(
  <MuiThemeProvider theme={theme}> 
    <CssBaseline />
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
