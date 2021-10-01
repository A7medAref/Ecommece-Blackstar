import { Grid, Typography } from "@material-ui/core";
import Wrapper from "../../Utilites/Wrapper";
import { useDispatch, useSelector } from "react-redux";
import useStyle from "./CartStyle";
import { BsFillTrashFill } from "react-icons/bs";
import deleteElementInCart from "../../Store/Thunk/deleteCart";
import TableCart from "./TableCart";
import { useEffect, useState } from "react";
import axios from "axios";
import CircularLoading from "../../Components/Feedback/CircularProgress";
import { useHistory } from "react-router";
import AddCart from "../../Store/Thunk/addCart";
import { UserActions } from "../../Store/UserSlice";
import { IsAuth } from "../../Utilites/secure";
import error from "../../Utilites/error";
const CartPage = () => {
  IsAuth();
  let { user, isAuth } = useSelector((state) => state.reducer);
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  const [RealProducts, setRealProducts] = useState([]);
  const [countInStock, setCountInStock] = useState([]);
  const [loading, setLoading] = useState(true);
  async function deleteCartHandler(id, i) {
    try {
      let USER = { ...user };
      const newCart = [
        ...USER.cart.slice(0, i),
        ...USER.cart.slice(i + 1, USER.cart.length),
      ];
      USER.cart = newCart;
      dispatch(UserActions.AddUser(USER));
      await dispatch(deleteElementInCart(user, id));
    } catch (err) {
      error(err, setLoading);
    }
  }
  useEffect(() => {
    const fetching = async () => {
      setLoading(true);
      const promises = [];
      user.cart.forEach((e) => {
        promises.push(axios.get(`/api/v1/products/${e._id}`));
      });

      let OriginProducts = await Promise.all(promises);
      let CloneProducts = [];
      const countInStockClone = [];
      let flag = false;
      OriginProducts.forEach((e, i) => {
        if (!e.data) {
          flag = true;
        } else {
          if (e.data.data.countInStock < user.cart[i].amount) {
            flag = true;
            let x = { ...user.cart[i] };
            x.amount = e.data.data.countInStock;
            CloneProducts.push(x);
          } else CloneProducts.push(user.cart[i]);
          countInStockClone.push(e.data.data.countInStock);
        }
      });
      if (flag) {
        dispatch(UserActions.AddUser({ cart: CloneProducts, ...user }));
        axios.patch("/api/v1/auth/cart", {
          cart: CloneProducts,
        });
      }
      setRealProducts(CloneProducts);
      setCountInStock(countInStockClone);
      setLoading(false);
    };
    try {
      if (isAuth) fetching();
    } catch (err) {
      history.push("/");
      error(err, setLoading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);
  async function updateAmount(e, i) {
    try {
      if (e) {
        await dispatch(AddCart(user, user.cart[i], e.target.value));
      }
    } catch (err) {
      error(err, setLoading);
    }
  }
  return (
    <Wrapper>
      {!isAuth ? null : loading ? (
        <CircularLoading type="page" />
      ) : (
        <Grid container className={classes.cartPage}>
          <Grid container item md={8} xs={12} direction="column">
            <Typography variant="h4" style={{ marginBottom: "2rem" }}>
              Shopping cart
            </Typography>
            {user.cart.map((e, i) => (
              <Grid
                container
                key={e._id}
                alignItems="center"
                className={classes.product}
              >
                <Grid item xs={2}>
                  <img
                    src={e.image}
                    alt="product"
                    className={
                      RealProducts[i].amount <= 0
                        ? `${classes.img} ${classes.opacityError}`
                        : classes.img
                    }
                    onClick={() => history.push(`/product/${e._id}`)}
                  />
                </Grid>
                <Grid item xs={5} sm={4}>
                  <Typography
                    variant="body2"
                    className={
                      RealProducts[i].amount <= 0
                        ? `${classes.name} ${classes.opacityError}`
                        : classes.name
                    }
                  >
                    {e.name}
                  </Typography>
                </Grid>
                <Grid item xs={2} container justifyContent="center">
                  <Typography
                    className={
                      RealProducts[i].amount <= 0
                        ? `${classes.price} ${classes.opacityError}`
                        : classes.price
                    }
                  >
                    ${e.price}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <select
                    disabled={RealProducts[i].amount <= 0}
                    className={classes.selector}
                    defaultValue={
                      RealProducts[i].amount < e.amount
                        ? RealProducts[i].amount
                        : e.amount
                    }
                    onChange={(e) => updateAmount(e, i)}
                  >
                    {Array.from({
                      length: countInStock[i] > 10 ? 10 : countInStock[i],
                    }).map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </Grid>
                <Grid item sm={2} xs={1} className={classes.trash}>
                  <BsFillTrashFill
                    style={{
                      color: RealProducts[i].amount <= 0 ? "red" : undefined,
                    }}
                    onClick={() => {
                      deleteCartHandler(e._id, i);
                    }}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid container item md={4} justifyContent="center">
            <TableCart cart={user.cart} RealProducts={RealProducts} />
          </Grid>
        </Grid>
      )}
    </Wrapper>
  );
};
export default CartPage;
