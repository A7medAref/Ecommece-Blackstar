import { makeStyles } from "@material-ui/core";
import theme from "../../Utilites/theme";

const useStyle = makeStyles({
  tab: {
    minWidth: "fit-content",
    color: "white",
    marginRight: "1.5rem",
    cursor: "pointer",
    textDecoration: "none",
  },
  disabledTab: {
    color: "red",
  },
  avatar: {
    width: "2.9rem",
    height: "2.9rem",
    cursor: "pointer",
    marginLeft: ".3rem",
  },
  cart: {
    fontSize: "1.5rem",
    marginRight: ".5rem",
  },
  signUp: {
    backgroundColor: "#fff",
    color: theme.palette.primary.main,
    padding: ".5rem 1rem",
    marginLeft: "4px",
    borderRadius: "2px",
    "& > *": {
      fontFamily: "Roboto",
      fontWeight: "500",
      fontSize: "1rem",
    },
  },

  SwipeableDrawer: {
    backgroundColor: theme.palette.primary.main,
  },
  menuIcon: { marginLeft: "auto", fontSize: "2em", color: "#eee" },

  menuCard: {
    [theme.breakpoints.down("md")]: { width: "20rem" },
    [theme.breakpoints.down("xs")]: { width: "85vw" },
  },
  menuAvatar: {
    width: "4rem",
    height: "4rem",
    margin: "1.2rem auto 1.6rem",
  },
  MenuTab: {
    color: "#eee",
    fontFamily: "Roboto",
    margin: "1.5rem auto",
    cursor: "pointer",
    fontSize: "1.2rem",
    paddingLeft: "1rem",
  },
  MenuTabSign: {
    margin: "0",
    padding: "1.3rem 0 1.3rem 1rem",
  },
  tabSignUp: {
    padding: "1.2rem 0 1.2rem 1rem",
    color: theme.palette.primary.main,
    backgroundColor: "#fff",
    fontWeight: "500",
  },
});
export default useStyle;
