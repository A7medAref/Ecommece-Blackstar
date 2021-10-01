import { makeStyles } from "@material-ui/core";
import theme from "../../Utilites/theme";

const useStyle = makeStyles({
  page: {
    marginTop: "5rem",
    marginBottom: "2rem",
    [theme.breakpoints.down("md")]: {
      marginTop: "1rem",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0 1rem",
    },
  },
  image: {
    width: "100%",
    [theme.breakpoints.down("md")]: {
      maxWidth: "30rem",
      marginBottom: "3rem",
    },
  },
  block2: {
    fontFamily: "Montserrat",
    padding: "2rem 2rem",
    [theme.breakpoints.down("md")]: {
      padding: "0 2rem 0 0",
    },
  },
  table: {
    border: "1px solid #ccc",
    height: "fit-content",
    maxWidth: "20rem",
    "& > *": {
      padding: "1rem",
      "&:not(:last-child)": {
        borderBottom: "1px solid #ccc",
      },
    },
    [theme.breakpoints.down("md")]: {
      margin: "0 auto",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "2rem 0 0",
    },
  },
  Button: {
    backgroundColor: "#6B6B6B",
    width: "100%",
    padding: ".8rem 1rem",
    borderRadius: "0",
    "&:hover": {
      backgroundColor: "#6B6B6B",
    },
  },
  ///////////////////////
  review: {
    maxWidth: "50%",
    "& > *": {
      margin: "2rem 0 0",
      padding: "0 1rem",
      "&:not(:last-child)": {
        borderBottom: "1px #ddd solid",
      },
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: "30rem",
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
    },
  },
  user: {
    marginBottom: ".4rem",
    "& > :first-child": {},
    "& > :nth-child(2)": {
      marginLeft: ".4rem",
      marginBottom: "0",
      textTransform: "none",
    },
  },
  comment: {
    margin: ".5rem 0 .6rem",
  },
  read: {
    maxWidth: "fit-content",
    backgroundColor: theme.palette.primary.main,
    padding: ".8rem 2rem",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  selector: {
    border: "none",
    borderRadius: "3px",
    padding: "7px .5rem",
    width: "4rem",
    backgroundColor: "#eee",
    "scroll-behavior": "smooth",
    "&:focus": {
      outline: "none",
    },
    "& *": {
      outline: "none",
    },
  },
});
export default useStyle;
