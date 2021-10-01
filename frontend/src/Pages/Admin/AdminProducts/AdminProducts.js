import {
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
} from "@material-ui/core";
import { BsFillPlusCircleFill } from "react-icons/bs";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import CircularLoading from "../../../Components/Feedback/CircularProgress";
import Wrapper from "../../../Utilites/Wrapper";
import useStyle from "../../../Utilites/OrderStyle";
import { TiEdit } from "react-icons/ti";
import DeleteProduct from "../../../Utilites/AdminStuff/DeleteProduct";
import { useHistory } from "react-router";
import error from "../../../Utilites/error";
import { IsAdmin } from "../../../Utilites/secure";
import AdminSearch from "../../../Components/AdminSearch/AdminSearch";
import searching from "../../../Utilites/AdminStuff/handleSearch";

function AdminProducts() {
  IsAdmin();
  const classes = useStyle();
  const { isAuth } = useSelector((state) => state.reducer);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const history = useHistory();
  const match = useMediaQuery(useTheme().breakpoints.down("xs"));

  useEffect(() => {
    try {
      const fetching = async () => {
        setLoading(true);
        const users = await axios.get("/api/v1/products");
        setProducts(users.data.data);
        setLoading(false);
      };
      fetching();
    } catch (err) {
      error(err, setLoading);
    }
  }, [refresh]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you wanna delete that product")) {
      await DeleteProduct(setLoading, id);
      setRefresh(!refresh);
    }
  };
  const handleSearch = async (productId) => {
    await searching(
      productId,
      `/api/v1/products?_id=${productId}`,
      setRefresh,
      setLoading,
      setProducts
    );
  };

  return (
    <Wrapper>
      {loading ? (
        <CircularLoading type="page" />
      ) : (
        isAuth && (
          <>
            <Grid container>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <AdminSearch
                    placeholder="Product ID ...."
                    event={handleSearch}
                  />
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "2rem 0 3rem", padding: ".7rem 2rem" }}
                  onClick={() => {
                    history.push("/admin/products/create");
                  }}
                >
                  <BsFillPlusCircleFill
                    style={{ fontSize: "1.2rem", marginRight: ".6rem" }}
                  />{" "}
                  Create New product
                </Button>
              </Grid>
              <Grid container className={classes.table}>
                <Grid item xs={3} container alignItems="center">
                  <Typography variant="body1" className={classes.SizeWord}>
                    ID
                  </Typography>
                </Grid>
                <Grid item xs={3} container alignItems="center">
                  <Typography variant="body1" className={classes.SizeWord}>
                    NAME
                  </Typography>
                </Grid>
                <Grid item xs={2} container alignItems="center">
                  <Typography variant="body1" className={classes.SizeWord}>
                    PRICE
                  </Typography>
                </Grid>
                <Grid item xs={2} container alignItems="center">
                  <Typography variant="body1" className={classes.SizeWord}>
                    Rating
                  </Typography>
                </Grid>
                <Grid item xs={2} container alignItems="center">
                  <Typography variant="body1" className={classes.SizeWord}>
                    EDIT
                  </Typography>
                </Grid>
              </Grid>
              {products.map((e) => (
                <Grid container className={classes.table} key={e._id}>
                  <Grid
                    item
                    xs={3}
                    container
                    alignItems="center"
                    style={{ overflow: "hidden" }}
                  >
                    <Typography variant="body1" className={classes.SizeWord}>
                      {e._id}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    container
                    alignItems="center"
                    style={{ overflow: "hidden" }}
                  >
                    <Typography variant="body1" className={classes.SizeWord}>
                      {e.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} container alignItems="center">
                    <Typography
                      variant="body1"
                      style={{ overflow: "hidden" }}
                      className={classes.SizeWord}
                    >
                      ${e.price}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    container
                    alignItems="center"
                    justifyContent={match ? "center" : undefined}
                  >
                    {e.rating}
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    container
                    alignItems="center"
                    justifyContent={match ? "center" : undefined}
                  >
                    <Typography variant="body1" className={classes.SizeWord}>
                      <TiEdit
                        className={classes.edit}
                        onClick={() =>
                          history.push(`/admin/products/Edit/${e._id}`)
                        }
                      />
                    </Typography>
                    <Typography variant="body1" className={classes.SizeWord}>
                      <BiTrash
                        className={classes.trash}
                        onClick={() => handleDelete(e._id)}
                      />
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </>
        )
      )}
    </Wrapper>
  );
}

export default AdminProducts;
