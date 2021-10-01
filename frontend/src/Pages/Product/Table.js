import { Grid, Typography, Button, CircularProgress } from "@material-ui/core";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddCart from "../../Store/Thunk/addCart";
import useStyle from "./ProductStyle";
function OrderTable({ product }) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { isAuth, user } = useSelector((state) => state.reducer);
  const [loading, setLoading] = useState(false);
  function HandleQuantity(e) {
    if (quantity !== e.target.value) setQuantity(e.target.value);
  }
  async function AddCartHandler() {
    if (window.confirm("Do you want to add that product to your cart")) {
      setLoading(true);
      await dispatch(AddCart(user, product, quantity));
      setLoading(false);
    }
  }
  return (
    <Grid item sm={6} xs={12} className={classes.table}>
      <Grid container>
        <Grid item sm={6}>
          <Typography variant="body1">Price:</Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="body1">${product.price}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item sm={6}>
          <Typography variant="body1">Status:</Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="body1">
            {product.countInStock ? "In Stock" : "Out Of Stock"}
          </Typography>
        </Grid>
      </Grid>
      {product.countInStock * 1 !== 0 && (
        <Grid container alignItems="center">
          <Grid item sm={6}>
            <Typography variant="body1">Qty</Typography>
          </Grid>
          <Grid item sm={6}>
            <select className={classes.selector} onClick={HandleQuantity}>
              {Array.from({
                length: product.countInStock > 10 ? 10 : product.countInStock,
              }).map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </Grid>
        </Grid>
      )}
      <Grid container>
        <Button
          variant="contained"
          className={classes.Button}
          color="primary"
          disabled={!isAuth || product.countInStock <= 0}
          onClick={AddCartHandler}
        >
          {loading ? (
            <CircularProgress style={{ color: "white" }} />
          ) : (
            "add to card"
          )}
        </Button>
      </Grid>
    </Grid>
  );
}

export default OrderTable;
