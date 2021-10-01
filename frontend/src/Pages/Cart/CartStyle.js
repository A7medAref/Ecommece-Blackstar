import { makeStyles } from "@material-ui/core";
import theme from "../../Utilites/theme";

const useStyle = makeStyles({
  cartPage: {
    marginTop: "1rem",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "95vw",
      margin: "1rem auto 0",
    },
  },
  product: {
    marginBottom: "3rem",
    marginLeft: "2rem",
    [theme.breakpoints.down("sm")]: {
      marginLeft: ".8rem",
      maxWidth: "45rem",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0",
      paddingLeft: ".2rem",
      boxSizing: "border-box",
    },
  },
  img: {
    width: "100%",
    maxWidth: "5rem",
    maxHeight: "5rem",
    borderRadius: ".7rem",
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  name: {
    margin: "0 0 0 1rem",
    fontSize: ".9rem",
    color: "#333",
    [theme.breakpoints.down("md")]: {
      margin: "0 0 0 .2rem",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "0 .2rem 0 .1rem",
      fontSize: ".75rem",
    },
  },
  price: {
    fontSize: "1.2rem",
    color: "#444",
    fontFamily: "Roboto",
    fontWeight: "300",
    [theme.breakpoints.down("xs")]: {
      fontSize: ".8rem",
      letterSpacing: ".4px",
    },
  },
  trash: {
    fontSize: "1.4rem",
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2rem",
      margin: "auto",
      textAlign: "center",
    },
  },
  selector: {
    border: "none",
    borderRadius: "3px",
    padding: "7px .5rem",
    cursor: "pointer",
    maxWidth: "4rem",
    width: "4rem",
    backgroundColor: "#eee",
    "scroll-behavior": "smooth",
    "&:focus": {
      outline: "none",
    },
    "& *": {
      outline: "none",
    },
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      padding: "7px .1rem",
      fontSize: ".8rem",
      maxWidth: "80%",
      margin: "auto",
    },
  },
  opacityError: {
    opacity: 0.5,
  },
  table: {
    border: "1px solid #ccc",
    height: "fit-content",
    width: "100%",
    "& > *": {
      padding: "1rem",
      "&:not(:last-child)": {
        borderBottom: "1px solid #ccc",
      },
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "25rem",
    },
  },
  Button: {
    width: "100%",
    height: "3.7rem",
    borderRadius: "0",
    padding: "0 3rem",
    [theme.breakpoints.down("xs")]: {
      padding: "0 2rem",
    },
  },
  loading: {
    color: "white",
    width: "2rem",
    height: "2rem",
    padding: "4.8rem",
  },
  title: {
    color: "#000",
    opacity: 1,
    fontWeight: "400",
    marginBottom: "1.5rem",
    letterSpacing: "2px",
    [theme.breakpoints.down("xs")]: {
      letterSpacing: "1px",
    },
  },
});
export default useStyle;
