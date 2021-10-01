import axios from "axios";
import error from "../../Utilites/error";
import { UserActions } from "../UserSlice";

function AddCart(user, product, quantity) {
  return async (dispatch) => {
    try {
      const USER = { ...user };
      const { data } = await axios.post("/api/v1/auth/cart", {
        product: {
          _id: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          amount: quantity,
        },
      });
      USER.cart = data.data;
      dispatch(UserActions.AddUser(USER));
    } catch (err) {
      error(err);
    }
  };
}
export default AddCart;
