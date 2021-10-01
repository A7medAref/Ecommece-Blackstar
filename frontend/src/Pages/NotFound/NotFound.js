import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
function NotFoundPage() {
  const history = useHistory();
  return (
    <Grid
      container
      style={{ height: "calc(100vh - 15rem)" }}
      alignItems="center"
      justifyContent="center"
      direction="column"
      //   spacing={5}
    >
      <Typography
        variant="h2"
        style={{ marginBottom: "1.5rem", fontWeight: "500" }}
      >
        That page doesn't exist
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ padding: ".9rem 2.3rem" }}
        onClick={() => history.push("/")}
      >
        back to the home page
      </Button>
    </Grid>
  );
}

export default NotFoundPage;
