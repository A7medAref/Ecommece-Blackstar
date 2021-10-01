import { Grid } from "@material-ui/core";
import { RiStarFill, RiStarHalfFill, RiStarLine } from "react-icons/ri";
function Stars({ reviews, UserReview }) {
  let rating = 0;
  if (reviews) {
    reviews.forEach((e) => {
      rating += e.rating;
    });
    rating = rating / reviews.length;
  }
  if (UserReview) rating = UserReview;
  return (
    <Grid
      item
      style={{
        fontSize: "1.1rem",
        color: "#F8E825",
        marginRight: "5px",
      }}
    >
      {rating > 0.75 ? (
        <RiStarFill />
      ) : rating > 0.25 ? (
        <RiStarHalfFill />
      ) : (
        <RiStarLine />
      )}
      {rating > 1.75 ? (
        <RiStarFill />
      ) : rating > 1.25 ? (
        <RiStarHalfFill />
      ) : (
        <RiStarLine />
      )}
      {rating > 2.75 ? (
        <RiStarFill />
      ) : rating > 2.25 ? (
        <RiStarHalfFill />
      ) : (
        <RiStarLine />
      )}
      {rating > 3.75 ? (
        <RiStarFill />
      ) : rating > 3.25 ? (
        <RiStarHalfFill />
      ) : (
        <RiStarLine />
      )}
      {rating > 4.75 ? (
        <RiStarFill />
      ) : rating > 4.25 ? (
        <RiStarHalfFill />
      ) : (
        <RiStarLine />
      )}
    </Grid>
  );
}

export default Stars;
