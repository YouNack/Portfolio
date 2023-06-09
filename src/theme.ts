import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#38b48b",
      // main: "#44DBA9",
    },
    secondary: {
      main: "#020a14",
      // main: "#fefffe",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
