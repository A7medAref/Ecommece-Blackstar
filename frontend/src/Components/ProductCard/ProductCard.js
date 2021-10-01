import { Card, Grid, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Stars from "./Stars";
const useStyle = makeStyles({
  card: {
    boxSizing: "border-box",
    padding: "1rem 1rem 1.5rem",
    userSelect: "none",
  },
  img: {
    userSelect: "none",
    width: "100%",
  },
  price: {
    fontSize: "1.5rem",
    color: "black",
    letterSpacing: "2px",
  },
  Height: {
    minHeight: "43px",
    textDecoration: "none",
  },
});
function ProductCard({ product }) {
  const classes = useStyle();

  // eslint-disable-next-line no-unused-vars
  return (
    <Card className={classes.card}>
      <Grid container direction="column">
        <Grid
          item
          component={Link}
          to={`/product/${product._id}`}
          style={{ marginBottom: "1.2rem" }}
        >
          <img src={product.image} alt={product.name} className={classes.img} />
        </Grid>
        <Typography
          variant="body2"
          className={classes.Height}
          component={Link}
          to={`/product/${product._id}`}
        >
          {product.name}
        </Typography>
        <Grid container style={{ marginBottom: ".5rem" }}>
          <Stars reviews={product.reviews} />
          <Typography
            variant="body2"
            style={{ fontSize: ".92rem", margin: ".1rem 0 0 .1rem" }}
          >
            {product.reviews.length}{" "}
            {product.reviews.length <= 1 ? "review" : "reviews"}
          </Typography>
        </Grid>
        <Typography className={classes.price}>${product.price}</Typography>
      </Grid>
    </Card>
  );
}

export default ProductCard;
