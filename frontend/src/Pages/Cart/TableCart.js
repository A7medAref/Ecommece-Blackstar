import { Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
// import AddCart from "../../Store/Thunk/addCart";
import useStyle from "./CartStyle";
import Checkout from "./CheckoutComponent";

function TableCart({ cart }) {
  const classes = useStyle();
  const { user } = useSelector((state) => state.reducer);
  const calcTotalPrice = () => {
    let price = 0;
    cart.map((e, i) => {
      price += e.price * e.amount;
      return null;
    });
    return Number(price).toFixed(2);
  };
  const calcTotalAmount = () => {
    let amount = 0;
    cart.map((e, i) => {
      amount += e.amount;
      return null;
    });
    return amount * 1;
  };
  const Description = () => {
    return `${cart.length} products with total amount ${calcTotalAmount()}`;
  };

  return (
    <Grid item md={11} className={classes.table}>
      <Grid container direction="column">
        <Typography variant="h5" className={classes.title}>
          SUBTOTAL ({calcTotalAmount()}) ITEMS
        </Typography>
        <Grid container>
          <Grid item md={6}>
            <Typography variant="body1">Total Price:</Typography>
          </Grid>
          <Grid item md={6}>
            <Typography variant="body1" style={{ fontSize: "1rem" }}>
              ${calcTotalPrice()}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Checkout
          name={user.name}
          email={user.email}
          price={calcTotalPrice()}
          className={classes.width100}
          description={Description}
          cart={cart}
        ></Checkout>
      </Grid>
    </Grid>
  );
}

export default TableCart;
