import { Button, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CircularLoading from "../../../Components/Feedback/CircularProgress";
import CreateProduct from "../../../Utilites/AdminStuff/CreateProduct";
import UpdateProduct from "../../../Utilites/AdminStuff/UpdateProduct";
import { IsAdmin } from "../../../Utilites/secure";
import Wrapper from "../../../Utilites/Wrapper";
import useStyleProfile from "../../Profile/ProfileStyle";
import useStyle from "./Edit-Add-Style";
import ProductImage from "./ProductImg";

const EditAddProducts = () => {
  IsAdmin();
  const InputClasses = useStyleProfile();
  const param = useParams();
  const history = useHistory();
  const classes = useStyle();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [description, setDiscription] = useState();
  const [countInStock, setCountInStock] = useState();
  useEffect(() => {
    if (param.id) {
      setLoading(true);
      const fetching = async () => {
        const { data } = await axios.get(`/api/v1/products/${param.id}`);
        setProduct(data.data);
        setLoading(false);
      };
      fetching();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleUpload = async () => {
    const inputs = [
      setLoading,
      product._id,
      name,
      category,
      price,
      description,
      countInStock,
    ];
    if (param.id) {
      if (await UpdateProduct(...inputs))
        history.push(`/product/${product._id}`);
    } else {
      await CreateProduct(...inputs);
    }
  };
  return (
    <>
      {loading ? (
        <CircularLoading type="page" />
      ) : (
        <Wrapper>
          <ProductImage productImg={product.image} />
          <Grid container direction="column" className={classes.EditPage}>
            <Typography variant="body2">Name</Typography>
            <input
              onChange={(e) => setName(e.target.value)}
              placeholder="Name of the product"
              className={InputClasses.input}
              defaultValue={product.name}
            ></input>
            <Typography variant="body2">description</Typography>
            <input
              onChange={(e) => setDiscription(e.target.value)}
              placeholder="Discription for the product"
              className={InputClasses.input}
              defaultValue={product.description}
            ></input>
            <Typography variant="body2">Price</Typography>
            <input
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price of the product"
              className={InputClasses.input}
              defaultValue={product.price}
            ></input>
            <Typography variant="body2">Category</Typography>
            <input
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category of the product"
              className={InputClasses.input}
              defaultValue={product.category}
            ></input>
            <Typography variant="body2">Count In Stock</Typography>
            <input
              onChange={(e) => setCountInStock(e.target.value)}
              placeholder="Avaliable amount of the product"
              className={InputClasses.input}
              defaultValue={product.countInStock}
            ></input>
          </Grid>
          <Grid container justifyContent="center">
            <Button
              onClick={handleUpload}
              className={InputClasses.Button}
              variant="contained"
              color="primary"
            >
              {param.id ? "Update the product" : "Create the product"}
            </Button>
          </Grid>
        </Wrapper>
      )}
    </>
  );
};
export default EditAddProducts;

//   ErrorConfirm ? `${InputClasses.input} ${InputClasses.error}` : InputClasses.input
