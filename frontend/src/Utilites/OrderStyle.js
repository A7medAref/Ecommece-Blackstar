import { makeStyles } from "@material-ui/core";
import theme from "./theme";

const useStyle = makeStyles({
  table: {
    border: "2px solid #eee",
    padding: "0",
    "&:not(:first-child)": {
      borderTop: "0",
    },
    "& > :not(:last-child)": {
      borderRight: "1px solid #eee",
    },
    "& > *": {
      height: "100%",
      padding: "1rem 0 1rem 1rem",
    },
    [theme.breakpoints.down("xs")]: {
      "& > *": {
        padding: "1rem 0 1rem .3rem",
      },
    },
  },
  SizeWord: {
    [theme.breakpoints.down("sm")]: {
      fontSize: ".8rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: ".7rem",
      textAlign: "center",
    },
  },
  adminCreate: {
    color: "#666",
    fontSize: "1.5rem",
    marginRight: "1rem",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: { marginRight: "0", width: "2rem" },
  },
  trash: {
    margin: "auto",
    fontSize: "1.5rem",
    color: "#FF4848",
    cursor: "pointer",
  },
  edit: {
    fontSize: "1rem",
    marginRight: ".5rem",
    cursor: "pointer",
  },
  checked: {
    fontSize: "1.5rem",
    color: "#666",
    cursor: "pointer",
  },
  checkedActive: {
    fontSize: "1.5rem",
    color: "#57CC99",
  },
});

export default useStyle;
