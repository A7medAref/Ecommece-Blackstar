import axios from "axios";

const DeleteProduct = async (setLoading, productId) => {
  setLoading(true);
  try {
    await axios({
      method: "delete",
      data: {
        _id: productId,
      },
      url: "/api/v1/products",
    });
  } catch (err) {
    setLoading(false);
    window.alert(err.response.data.message);
  }
  setLoading(false);
};
export default DeleteProduct;
