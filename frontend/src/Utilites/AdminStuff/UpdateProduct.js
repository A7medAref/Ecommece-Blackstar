import axios from "axios";
import error from "../error";

const UpdateProduct = async (
  setLoading,
  _id,
  name,
  category,
  price,
  description,
  countInStock
) => {
  setLoading(true);
  const image = document.getElementById("fileId").files[0];
  try {
    if (!image) {
      await axios.patch("/api/v1/products", {
        _id,
        name,
        category,
        price,
        description,
        countInStock,
      });
    } else {
      const form = new FormData();
      form.append("photo", image);
      form.append("_id", _id);
      form.append("name", name);
      form.append("category", category);
      form.append("price", price);
      form.append("description", description);
      form.append("countInStock", countInStock);
      await axios.patch("/api/v1/products", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
  } catch (err) {
    error(err, setLoading);
    return false;
  }
  return true;
};
export default UpdateProduct;
