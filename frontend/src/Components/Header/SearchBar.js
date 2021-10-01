import { Grid, makeStyles } from "@material-ui/core";
import { useRef } from "react";
import { useHistory } from "react-router";
import theme from "../../Utilites/theme";
const useStyle = makeStyles({
  block: {
    marginLeft: "2rem",
    width: "fit-content",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      width: "92%",
      marginLeft: "0",
      marginTop: "1rem",
    },
  },
  input: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    border: "none",
    backgroundColor: "#F7F7F9",
    padding: "0 1.3rem",
    boxSizing: "border-box",
    height: "2.9rem",
    "&:focus": {
      outline: "none",
    },
  },
  button: {
    height: "2.9rem",
    boxSizing: "border-box",
    padding: ".8rem 1.2rem",
    marginLeft: "1rem",
    textTransform: "uppercase",
    backgroundColor: "transparent",
    color: "#4BBF73",
    border: "1.5px solid #4BBF73",
    cursor: "pointer",
    transition: ".1s all",
    letterSpacing: ".5px",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#57CC99",
    },
    [theme.breakpoints.down("md")]: {
      color: theme.palette.primary.main,
      fontWeight: "500",
      "&:hover": {
        color: theme.palette.primary.main,
        backgroundColor: "transparent",
      },
      position: "absolute",
      top: 0,
      right: 0,
      paddingRight: "10px",
      border: "0",
      padding: "0",
    },
  },
});

export default function SearchBar() {
  const classes = useStyle();
  const ref = useRef();
  const history = useHistory();
  const handleSubmit = () => {
    if (ref.current.value.length > 0)
      history.push(`/search/${ref.current.value}`);
    else if (window.location.pathname.includes("search")) {
      history.push("/");
    }
  };
  return (
    <Grid container className={classes.block} alignItems="center">
      <input
        placeholder="Search Products"
        className={classes.input}
        ref={ref}
      />
      <button className={classes.button} onClick={handleSubmit}>
        search
      </button>
    </Grid>
  );
}
