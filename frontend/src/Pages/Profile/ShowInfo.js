import { Grid, Typography } from "@material-ui/core";
import useStyle from "./ProfileStyle";
const ShowInfo = ({ title, content }) => {
  const classes = useStyle();
  return (
    <Grid container>
      <Grid container>
        <Typography variant="body2" className={classes.title}>
          {title}
        </Typography>
      </Grid>
      <Grid container>
        <Typography className={classes.content}>{content}</Typography>
      </Grid>
    </Grid>
  );
};
export default ShowInfo;
