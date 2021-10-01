import { makeStyles } from "@material-ui/core";
import theme from "../../Utilites/theme";

const useStyle = makeStyles({
  profileImage: {
    width: "13rem",
    height: "13rem",
    marginTop: "1rem",
  },
  profileImageContainer: {
    borderRadius: "50%",
    cursor: "pointer",
    width: "fit-content",
    position: "relative",
    overflow: "hidden",
  },
  upload: {
    position: "absolute",
    bottom: "0%",
    backgroundColor: theme.palette.primary.main,
    width: "100%",
    color: "white",
    textAlign: "center",
    opacity: ".8",
    padding: ".9rem 0 1.2rem",
    transform: "translateY(100%)",
    transition: "transform .3s",
    borderRadius: "0 0 50% 50%",
  },
  uploadTop: {
    transform: "translateY(0)",
  },
  uploadButton: {
    "&::-webkit-file-upload-button": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      textAlign: "center",
      opacity: ".8",
    },
  },
  ShowBlock: {
    // marginTop: "-1rem",
    width: "44rem",
    maxWidth: "90%",
  },
  title: {
    // fontSize: "1.6rem",
    "&:not(:first-child)": {},
    marginTop: "2rem",
    width: "100%",
  },
  content: {
    backgroundColor: "#F2F2F2",
    width: "100%",
    padding: "1.2rem 2rem",
    color: "#555",
    fontSize: "1rem",
    fontWeight: "400",
  },
  changeTitle: {
    color: "#222",
    marginTop: "3rem",
    letterSpacing: "4px",
  },
  input: {
    border: "none",
    backgroundColor: "#F7F7F9",
    padding: ".8rem 1.3rem",
    marginBottom: "2rem",
    "&:focus": {
      outline: "none",
    },
  },
  error: {
    borderBottom: "2px solid red",
  },
  Button: {
    marginTop: "1.5rem",
    minWidth: "15rem",
    padding: "1rem 0",
  },
});

export default useStyle;
