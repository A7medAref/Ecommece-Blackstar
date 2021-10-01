import { useSelector } from "react-redux";
import {
  Grid,
  Button,
  Typography,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import Stars from "./Stars";
import { useState } from "react";
import axios from "axios";
import error from "../../Utilites/error";
const useStyle = makeStyles({
  input: {
    border: "none",
    backgroundColor: "#F7F7F9",
    padding: ".8rem 1.3rem",
    marginBottom: "1.5rem",
    "&:focus": {
      outline: "none",
    },
  },
  area: {
    padding: "1.1rem 1.3rem",
  },
  notAuth: {
    width: "100%",
    color: "#444",
    fontWeight: "400",
    backgroundColor: "#D2EBF5",
    fontFamily: "Roboto",
    padding: ".8rem 1.3rem",
  },
});
function NewReview({ productId, setReviews }) {
  const { isAuth, user } = useSelector((s) => s.reducer);
  const [selectedStar, setSelectedStar] = useState(undefined);
  const classes = useStyle();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const SubmitReview = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/review", {
        product: productId,
        rating: selectedStar,
        comment: comment,
      });
      const TheUser = { ...data.data, user: user };
      setReviews((e) => [TheUser, ...e]);
      setLoading(false);
      window.scrollTo(0, 0);
    } catch (err) {
      error(err, setLoading);
    }
  };
  return (
    <>
      {loading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container>
          <Typography variant="h3" style={{ marginBottom: "1.1rem" }}>
            Write A customer review
          </Typography>
          {!isAuth ? (
            <Grid container className={classes.notAuth}>
              Sign in to write a review about the product
            </Grid>
          ) : (
            <Grid container direction="column">
              <Stars
                numStars={5}
                selectedStar={selectedStar}
                setSelectedStar={setSelectedStar}
              />
              <textarea
                style={{ marginTop: ".8rem" }}
                placeholder="Write your comment..."
                className={`${classes.input} ${classes.area}`}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              ></textarea>
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginBottom: "2rem" }}
                  onClick={SubmitReview}
                  disabled={!selectedStar || comment.length < 2}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
}

export default NewReview;
