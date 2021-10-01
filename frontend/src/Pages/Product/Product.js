import { Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CircularLoading from "../../Components/Feedback/CircularProgress";
import Stars from "../../Components/ProductCard/Stars";
import Wrapper from "../../Utilites/Wrapper";
import useStyle from "./ProductStyle";
import Reviews from "./Reviews";
import OrderTable from "./Table";
function ProductPage() {
  const classes = useStyle();
  const param = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/v1/products/${param.id}`);
      setProduct(data.data);
      setLoading(false);
    };
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Wrapper>
      {loading ? (
        <CircularLoading type="page" />
      ) : (
        <>
          <Grid container className={classes.page}>
            <Grid container item lg={6} xs={12} justifyContent="center">
              <img
                src={product.image}
                alt="Product"
                className={classes.image}
              ></img>
            </Grid>
            <Grid item container lg={6}>
              <Grid
                container
                item
                lg={6}
                sm={6}
                direction="column"
                className={classes.block2}
              >
                <Typography variant="h3" style={{ marginBottom: "2rem" }}>
                  {product.name}
                </Typography>
                <Grid container>
                  <Stars reviews={product.reviews} />
                  <Typography variant="body2">
                    {" "}
                    {" " + product.reviews.length} reviews
                  </Typography>
                </Grid>
                <Typography variant="body1" style={{ marginBottom: "1rem" }}>
                  Price: ${product.price}
                </Typography>
                <Typography
                  variant="body1"
                  style={{ lineHeight: "1.6", letterSpacing: "1px" }}
                >
                  Description: {product.description}
                </Typography>
              </Grid>
              {<OrderTable product={product} />}
            </Grid>
          </Grid>
          <Reviews Reviews={product.reviews} productId={product._id} />
        </>
      )}
    </Wrapper>
  );
}

export default ProductPage;
