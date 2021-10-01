import { makeStyles } from "@material-ui/core";
import theme from "../../Utilites/theme";
const useStyle = makeStyles({
  slider: {
    height: "24rem",
    backgroundColor: theme.palette.primary.main,
    marginBottom: "2rem",
    overflow: "hidden",
    maxWidth: "100%",
    [theme.breakpoints.down("md")]: {
      height: "26rem",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "97%",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "5rem",
    },
  },
  arrow: {
    "& > *": {
      fontSize: "2rem",
      color: "white",
      opacity: ".6",
    },
    "&:hover > *": {
      opacity: "1",
    },
    cursor: "pointer",
    maxWidth: "12rem",
    height: "100%",
    zIndex: "10",
  },
  stylePhoto: {
    textDecoration: "none",
    height: "calc(100% - 4.2rem)",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "calc(100% - 5.2rem)",
    },
    [theme.breakpoints.down("xs")]: {
      height: "calc(100% - 7rem)",
    },
  },
  name: {
    cursor: "pointer",
    textAlign: "center",
    color: "white",
    textTransform: "uppercase",
    fontSize: "1.5rem",
    letterSpacing: "2px",
    wordSpacing: "3px",
    marginTop: "1.5rem",
    userSelect: "none",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.3rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.1rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: ".99rem",
    },
  },
  img: {
    userSelect: "none",
    cursor: "pointer",
    height: "15rem",
    maxHeight: "80%",
    borderRadius: "50%",
    zIndex: "2",
    [theme.breakpoints.down("sm")]: {
      height: "14rem",
      maxHeight: "80%",
    },
    [theme.breakpoints.down("xs")]: {
      height: "11rem",
      maxHeight: "80%",
    },
  },
  slide: {
    color: "white",
    marginBottom: "1.5rem",
    height: "1.2rem",
    fontSize: "2.5rem",
    "& > *": {
      cursor: "pointer",
      transition: ".5s opacity",
      "&:not(:last-child)": {
        marginRight: "0px",
      },
    },
  },
  non_active: {
    opacity: ".4",
  },
  current: {
    position: "relative",
    left: 0,
    opacity: "1",
    transition: ".7s all",
    transitionDelay: ".3s",
  },
  next: {
    position: "absolute",
    left: "-100%",
    opacity: 0,
    transform: "translateX(50%)",
    transition: ".7s all",
  },
  previous: {
    position: "absolute",
    left: "100%",
    transform: "translateX(50%)",
    opacity: 0,
    transition: ".7s all",
  },
});
export default useStyle;
