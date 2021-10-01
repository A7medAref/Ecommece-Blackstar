import { Grid, Typography, useMediaQuery, useTheme } from "@material-ui/core";
// import axios from "axios";
import { useEffect, useState } from "react";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import CircularLoading from "../../../Components/Feedback/CircularProgress";
import Wrapper from "../../../Utilites/Wrapper";
import useStyle from "../../../Utilites/OrderStyle";
import { useHistory } from "react-router";
import axios from "axios";
import Delivered from "../../../Utilites/AdminStuff/MarkAsDelivered";
import error from "../../../Utilites/error";
import { IsAdmin } from "../../../Utilites/secure";
import AdminSearch from "../../../Components/AdminSearch/AdminSearch";
import searching from "../../../Utilites/AdminStuff/handleSearch";

function AdminOrders() {
  IsAdmin();
  const classes = useStyle();
  const { isAuth } = useSelector((state) => state.reducer);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetching, setRefetching] = useState(true);
  const history = useHistory();
  const match = useMediaQuery(useTheme().breakpoints.down("xs"));

  const handleSearch = async (orderId) => {
    await searching(
      orderId,
      `/api/v1/order?_id=${orderId}`,
      setRefetching,
      setLoading,
      setOrders
    );
  };

  useEffect(() => {
    const fetching = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/v1/order?sort=orderedAt");
        setOrders(data.data);
      } catch (err) {
        error(err, setLoading);
        history.push("/");
      }
      setLoading(false);
    };
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetching]);
  const handleMark = async (e, i) => {
    if (window.confirm("Are you sure you want to mark that order as delivered"))
      await Delivered(setLoading, e._id, orders, setOrders, i);
  };
  return (
    <Wrapper>
      {loading ? (
        <CircularLoading type="page" />
      ) : (
        isAuth && (
          <>
            <Grid container>
              <Grid item style={{ margin: "2rem 0" }}>
                <AdminSearch
                  placeholder="input the order id"
                  event={(keyword) => handleSearch(keyword)}
                />
              </Grid>
              <Grid container className={classes.table}>
                <Grid item xs={4} container alignItems="center">
                  <Typography variant="body1" className={classes.SizeWord}>
                    ID
                  </Typography>
                </Grid>
                <Grid item xs={4} container alignItems="center">
                  <Typography variant="body1" className={classes.SizeWord}>
                    USER ID
                  </Typography>
                </Grid>
                <Grid item xs={2} container alignItems="center">
                  <Typography variant="body1" className={classes.SizeWord}>
                    ORDERED AT
                  </Typography>
                </Grid>
                <Grid item xs={2} container alignItems="center">
                  <Typography variant="body1" className={classes.SizeWord}>
                    MARK
                  </Typography>
                </Grid>
              </Grid>
              {orders.map((e, i) => (
                <Grid container className={classes.table} key={e._id}>
                  <Grid
                    item
                    xs={4}
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
                    xs={4}
                    container
                    alignItems="center"
                    style={{ overflow: "hidden" }}
                  >
                    <Typography variant="body1" className={classes.SizeWord}>
                      {e.user}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} container alignItems="center">
                    <Typography
                      variant="body1"
                      style={{ overflow: "hidden" }}
                      className={classes.SizeWord}
                    >
                      {e.orderedAt.slice(0, 10)}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    container
                    alignItems="center"
                    justifyContent={match ? "center" : undefined}
                  >
                    <Typography variant="body1" className={classes.SizeWord}>
                      <IoCheckmarkDoneCircleSharp
                        className={
                          e.deliveredAt
                            ? classes.checkedActive
                            : classes.checked
                        }
                        onClick={() => handleMark(e, i)}
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

export default AdminOrders;
