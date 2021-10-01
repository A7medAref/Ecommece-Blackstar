import useStyle from "./HeaderStyle";
import { Avatar, Grid, Typography } from "@material-ui/core";
import { FaShoppingCart, FaTruck, FaProductHunt } from "react-icons/fa";
import { GiSpikyWing } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const TabsComp = ({ logOutHandler }) => {
  const classes = useStyle();
  const { isAuth, user, loadingUser } = useSelector((state) => state.reducer);
  const history = useHistory();

  const AuthTabs = (
    <Grid container style={{ width: "fit-content" }} alignItems="center">
      <Grid item className={classes.tab} onClick={logOutHandler}>
        <BiLogOut className={classes.cart} />
      </Grid>
      <Grid className={classes.tab} onClick={() => history.push("/orders")}>
        <FaTruck className={classes.cart} />
      </Grid>
      <Grid item className={classes.tab} onClick={() => history.push("/cart")}>
        <FaShoppingCart className={classes.cart} />
      </Grid>
      {user.isAdmin && (
        <>
          <Grid
            item
            className={classes.tab}
            onClick={() => history.push("/admin/users")}
          >
            <FiUsers className={classes.cart} />
          </Grid>
          <Grid
            item
            className={classes.tab}
            onClick={() => history.push("/admin/orders")}
          >
            <GiSpikyWing className={classes.cart} />
          </Grid>
          <Grid
            item
            className={classes.tab}
            onClick={() => history.push("/admin/products")}
          >
            <FaProductHunt className={classes.cart} />
          </Grid>
        </>
      )}

      <Avatar
        src={user.photo}
        className={classes.avatar}
        onClick={() => history.push("/profile")}
      />
    </Grid>
  );
  return (
    <>
      {!loadingUser &&
        (isAuth ? (
          AuthTabs
        ) : (
          <Grid container style={{ width: "fit-content" }} alignItems="center">
            <Grid item className={classes.tab} component={Link} to="/signin">
              <Typography variant="h6">sign In</Typography>
            </Grid>
            <Grid
              item
              className={`${classes.tab} ${classes.signUp}`}
              component={Link}
              to="/signup"
            >
              <Typography variant="h6">sign up</Typography>
            </Grid>
          </Grid>
        ))}
    </>
  );
};
export default TabsComp;
