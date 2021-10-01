import { makeStyles } from "@material-ui/core";
import theme from "../../../Utilites/theme";
const useStyle = makeStyles({
  EditPage: {
    maxWidth: "44rem",
    margin: "3rem auto 0",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "90rem",
      padding: "0 .5rem",
    },
  },
  imgContainer: {
    width: "20rem",
    height: "17rem",
    margin: "3rem auto 0",
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      margin: ".5rem auto 0",
      width: "90%",
      height: "inherit",
    },
  },
  productImg: {
    width: "100%",
    height: "100%",
    transition: ".3s all",
    "&:hover ~ *": {
      opacity: ".8",
    },
    borderRadius: "0",
  },
  camera: {
    cursor: "pointer",
    position: "absolute",
    fontSize: "2rem",
    opacity: "0",
    width: "100%",
    height: "100%",
    transition: ".3s opacity",
    backgroundColor: "#aaa",
    "&:hover": {
      opacity: ".8",
    },
    display: "grid",
    color: "white",
    placeContent: "center",
  },
});
export default useStyle;
