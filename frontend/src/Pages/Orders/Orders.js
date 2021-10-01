import { Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import CircularLoading from "../../Components/Feedback/CircularProgress";
import { IsAuth } from "../../Utilites/secure";
import Wrapper from "../../Utilites/Wrapper";
import useStyle from "../../Utilites/OrderStyle";

function Orders() {
  IsAuth();
  const classes = useStyle();
  const { user, loadingUser, isAuth } = useSelector((state) => state.reducer);
  const calcTotalAmount = (products) => {
    let amount = 0;
    products.forEach((e) => {
      amount += e.amount;
    });
    return amount;
  };
  return (
    <Wrapper>
      {loadingUser ? (
        <CircularLoading type="page" />
      ) : (
        isAuth && (
          <>
            <Grid container>
              <Grid container className={classes.table}>
                <Grid item xs={3} container alignItems="center">
                  <Typography variant="body1" className={classes.SizeWord}>
                    ID
                  </Typography>
                </Grid>
                <Grid item xs={3} container alignItems="center">
                  <Typography variant="body1" className={classes.SizeWord}>
                    DATE
                  </Typography>
                </Grid>
                <Grid item xs={3} container alignItems="center">
                  <Typography variant="body1" className={classes.SizeWord}>
                    TOTAL
                  </Typography>
                </Grid>
                <Grid item xs={3} container alignItems="center">
                  <Typography variant="body1" className={classes.SizeWord}>
                    DELIVERED
                  </Typography>
                </Grid>
              </Grid>
              {user.orders.map((e) => (
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
                  <Grid item xs={3} container alignItems="center">
                    <Typography variant="body1" className={classes.SizeWord}>
                      {e.orderedAt.slice(0, 10)}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} container alignItems="center">
                    <Typography variant="body1" className={classes.SizeWord}>
                      {calcTotalAmount(e.products)} PRODUCTS
                    </Typography>
                  </Grid>
                  <Grid item xs={3} container alignItems="center">
                    <Typography
                      variant="body1"
                      className={classes.SizeWord}
                      style={{ color: e.deliveredAt ? "#81B214" : "#FF6B6B" }}
                    >
                      {e.deliveredAt
                        ? `DELIVERED AT ${e.deliveredAt.slice(0, 10)}`
                        : "NOT DELIVERED YET"}
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

export default Orders;
