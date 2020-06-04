import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#ff9800",
    },
    secondary: {
      main: "#4caf50",
    },
  },
  typography: {
    fontFamily: "Raleway",
  },
});

export default theme;
