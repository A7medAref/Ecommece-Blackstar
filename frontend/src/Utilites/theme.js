import { createTheme } from "@material-ui/core";
const primary = "#343A40";
const secondary = "#343A40";
const theme = createTheme({
  palette: {
    primary: { main: primary },
    secondary: { main: secondary },
  },
});
theme.typography.h3 = {
  fontSize: "1.6rem",
  textTransform: "uppercase",
  fontWeight: "400",
  opacity: 0.7,
  letterSpacing: "2px",
};
theme.typography.h4 = {
  fontSize: "2.1rem",
  textTransform: "uppercase",
  fontWeight: "400",
  letterSpacing: "2.5px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.8em",
    letterSpacing: "2px",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "1.7em",
    letterSpacing: "1.7px",
  },
};
theme.typography.h5 = {
  fontSize: "1.5rem",
  textTransform: "uppercase",
  fontWeight: "500",
  letterSpacing: "2.2px",
  color: "white",
  textDecoration: "none",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.35rem",
    letterSpacing: "2px",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "1.15em",
    letterSpacing: "1.7px",
  },
};
theme.typography.h6 = {
  fontSize: ".9rem",
  textTransform: "uppercase",
  fontWeight: "normal",
};
///////////
theme.typography.body1 = {
  fontSize: ".9rem",
  fontFamily: "Roboto",
  fontWeight: "300",
  letterSpacing: "1.5px",
  color: "#000",
};
theme.typography.body2 = {
  fontFamily: "Roboto",
  fontSize: ".95rem",
  marginBottom: ".7rem",
  fontWeight: "400",
  letterSpacing: "1px",
  color: "#888",
};
export default theme;
