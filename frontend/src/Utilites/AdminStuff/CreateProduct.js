import axios from "axios";
import error from "../error";

const CreateProduct = async (
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
  if (!name || !category || !price || !description || !countInStock) {
    setLoading(false);
    setTimeout(
      () =>
        window.alert("the data required to create a product is not completed"),
      200
    );
    return false;
  }
  try {
    const form = new FormData();
    form.append("photo", image);
    form.append("name", name);
    form.append("category", category);
    form.append("price", price);
    form.append("description", description);
    form.append("countInStock", countInStock);
    const { data } = await axios.post("/api/v1/products", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data.data;
  } catch (err) {
    error(err, setLoading);
  }
  return false;
};
export default CreateProduct;
