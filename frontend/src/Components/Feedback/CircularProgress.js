import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
const useStyle = makeStyles({
  page: {
    width: "100%",
    height: "60vh",
    "& > *": {
      width: "4rem",
      height: "4rem",
    },
  },
  comp: {
    width: "100%",
    height: "100%",
    "& > *": {
      width: "3.3rem",
      height: "3.3rem",
    },
  },
});
function CircularLoading({ type, style }) {
  const classes = useStyle();
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={
        type === "page"
          ? classes.page
          : (type = "component" ? classes.comp : null)
      }
    >
      <CircularProgress
        size="medium"
        color="primary"
        className={classes.child}
        style={style}
      ></CircularProgress>
    </Grid>
  );
}
export default CircularLoading;
