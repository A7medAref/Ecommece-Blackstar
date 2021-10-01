import { Grid, makeStyles } from "@material-ui/core";
import theme from "./theme";

const useStyle = makeStyles({
  Wrapper: {
    width: "70rem",
    margin: "0 auto",
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "98%",
    },
  },
  header: {
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "1rem",
    },
  },
});
function Wrapper({ children, type }) {
  const classes = useStyle();
  return (
    <Grid
      item
      className={
        type === "header"
          ? `${classes.Wrapper} ${classes.header}`
          : classes.Wrapper
      }
    >
      {children}
    </Grid>
  );
}

export default Wrapper;
