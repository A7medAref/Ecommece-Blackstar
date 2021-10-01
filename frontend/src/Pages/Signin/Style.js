import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  card: {
    maxWidth: "33rem",
    margin: "1rem auto 3rem",
  },
  signWord: {
    opacity: 1,
    fontFamily: "Montserrat",
    marginBottom: "1.5rem",
  },
  input: {
    border: "none",
    backgroundColor: "#F7F7F9",
    padding: ".8rem 1.3rem",
    marginBottom: "1.5rem",
    "&:focus": {
      outline: "none",
    },
  },
  error: {
    borderBottom: "2px solid red",
  },
  Button: {
    backgroundColor: "#323232",
    padding: ".8rem 2rem",
    borderRadius: "0",
    "&:hover": {
      backgroundColor: "#313131",
    },
    marginBottom: "1.2rem",
  },
  Sign: {
    color: "#777",
    fontFamily: "Roboto",
    textDecoration: "none",
    fontWeight: "400",
    fontSize: "1rem",
    wordSpacing: "0",
  },
});
export default useStyle;
