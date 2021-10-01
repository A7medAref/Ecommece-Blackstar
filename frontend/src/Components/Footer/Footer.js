import { Grid, makeStyles, Typography } from "@material-ui/core";
const useStyle = makeStyles({
  Footer: {
    marginTop: "4rem",
    minHeight: "3rem",
  },
});
function Footer() {
  const classes = useStyle();
  return (
    <Grid
      container
      className={classes.Footer}
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="body2">Copyrights &#169; BlackStar</Typography>
    </Grid>
  );
}

export default Footer;
