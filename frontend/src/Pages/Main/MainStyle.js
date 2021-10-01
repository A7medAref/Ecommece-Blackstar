import { makeStyles } from "@material-ui/core";
import theme from "../../Utilites/theme";

const useStyle = makeStyles({
  last: {
    margin: "0 0 2rem 1.1rem",
    userSelect: "none",
    [theme.breakpoints.down("xs")]: { margin: "0 auto 2rem" },
  },
  page: {
    width: "2rem",
    height: "2rem",
    borderRadius: "50%",
    margin: "0 .4rem",
    textAlign: "center",
    // border: `2px solid #aaa`,
    color: "#bbb",
    lineHeight: "2rem",
    userSelect: "none",
    cursor: "pointer",
  },
  ActivePage: {
    backgroundColor: "#aaa",
    color: "white",
  },
  exchange: {
    color: "#999",
    fontSize: "1.5rem",
    height: "2rem",
    margin: "0 .8rem",
    lineHeight: "2.5rem",
  },
  productSection: {
    minHeight: "30rem",
  },
  disable: {
    opacity: 0.8,
    cursor: "default",
    pointerEvents: "none",
  },
});
export default useStyle;
