import { Avatar, Button, Grid, Typography } from "@material-ui/core";
import Stars from "../../Components/ProductCard/Stars";
import { useState } from "react";
import useStyle from "./ProductStyle";
import NewReview from "../../Components/CreateReview/NewReview";
const Reviews = ({ Reviews, productId }) => {
  const fixedNum = 10;
  const classes = useStyle();
  const [more, setMore] = useState(6);
  const [reviews, setReviews] = useState(
    Reviews.slice(0, more > Reviews.length ? Reviews.length : more)
  );
  function HandleMore() {
    if (Reviews.length - 1 > more + fixedNum) {
      setReviews(Reviews.slice(0, more + fixedNum));
      setMore(more + fixedNum);
    } else {
      setReviews(Reviews.slice(0, Reviews.length));
      setMore(Reviews.length);
    }
  }
  return (
    <>
      <Grid container className={classes.review}>
        {reviews.map((user, i) => (
          <Grid container key={i}>
            <Grid container alignItems="center" className={classes.user}>
              <Avatar src={user.user.photo} />
              <Typography variant="body2">{user.user.name}</Typography>
            </Grid>
            <Grid container>
              <Stars UserReview={user.rating} />
            </Grid>
            <Grid container>
              <Typography variant="body1" gutterBottom>
                {`${new Date(user.createdAt).getUTCDate()}-${new Date(
                  user.createdAt
                ).getUTCMonth()}-${new Date(user.createdAt).getUTCFullYear()}`}
              </Typography>
            </Grid>
            <Grid container className={classes.comment}>
              <Typography variant="body2">{user.comment}</Typography>
            </Grid>
          </Grid>
        ))}
        <NewReview productId={productId} setReviews={setReviews} />
      </Grid>
      <Grid container justifyContent="center">
        {!(Reviews.length <= more) && (
          <Button
            variant="contained"
            color="primary"
            onClick={HandleMore}
            className={`${classes.Button} ${classes.read}`}
          >
            See More
          </Button>
        )}
      </Grid>
    </>
  );
};

export default Reviews;
