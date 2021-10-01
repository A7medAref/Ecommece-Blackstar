import StripeCheckout from "react-stripe-checkout";
import { Button, CircularProgress } from "@material-ui/core";
import { useState } from "react";
import useStyle from "./CartStyle";
import axios from "axios";
import { useDispatch } from "react-redux";
import { UserActions } from "../../Store/UserSlice";
import { useHistory } from "react-router-dom";
import error from "../../Utilites/error";
function Checkout({ name, price, email, description, cart }) {
  const [loading, setLoading] = useState(false);
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  const checkoutHandler = async (Token) => {
    try {
      setLoading(true);
      if (cart.length === 0) console.log("You didn't order anything");
      else {
        const order = await axios.post("/api/v1/order", {
          products: cart,
        });
        await axios.post("/api/v1/order/checkout", {
          token: Token,
          amount: price * 100,
        });
        dispatch(UserActions.ClearCart());
        dispatch(UserActions.addOrder(order.data.data));
        history.push("/orders");
      }
    } catch (err) {
      error(err, setLoading);
    }
    setLoading(false);
  };

  return (
    <>
      {cart.length > 0 ? (
        <StripeCheckout
          name={name}
          description={description()} // the pop-in header subtitle
          image="https://proshopapp.herokuapp.com/images/phone.jpg" // the pop-in header image (default none)
          panelLabel="Give Money" // prepended to the amount in the bottom pay button
          ComponentClass={"div"}
          amount={price * 100} // cents
          currency="USD"
          stripeKey="pk_test_51JdxqBHjgTGgepZOdYRM2RNSchS7iqhyQUzKQJefZ8r57aTEvouWrOScFpW3j6WD5662Uw5iHgpPyJjAnxky37NL00ktDiDdEO"
          email={email}
          allowRememberMe // "Remember Me" option (default true)
          token={checkoutHandler} // submit callback
          //   opened={onOpened} // called when the checkout popin is opened (no IE6/7)
          //   closed={onClosed} // called when the checkout popin is closed (no IE6/7)
        >
          <Button
            variant="contained"
            className={classes.Button}
            color="primary"
            style={{ pointerEvents: loading ? "none" : undefined }}
          >
            {loading ? (
              <CircularProgress className={classes.loading} />
            ) : (
              "Proceed to checkout"
            )}
          </Button>
        </StripeCheckout>
      ) : (
        <Button
          variant="contained"
          className={classes.Button}
          color="primary"
          style={{ pointerEvents: "none" }}
          disabled={true}
        >
          Proceed to checkout
        </Button>
      )}
    </>
  );
}
export default Checkout;
