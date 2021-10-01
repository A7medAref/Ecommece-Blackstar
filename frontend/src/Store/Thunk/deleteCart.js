import axios from "axios";
import { UserActions } from "../UserSlice";

function deleteElementInCart(user, productId) {
  return async (dispatch) => {
    const USER = { ...user };
    const { data } = await axios.delete("/api/v1/auth/cart", {
      data: {
        product: productId,
      },
    });
    USER.cart = data.data;
    dispatch(UserActions.AddUser(USER));
  };
}
export default deleteElementInCart;
