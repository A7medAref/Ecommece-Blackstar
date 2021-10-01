import {
  IconButton,
  SwipeableDrawer,
  List,
  Avatar,
  Grid,
} from "@material-ui/core";
import { FaShoppingCart, FaTruck, FaProductHunt } from "react-icons/fa";
import { GiSpikyWing } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import useStyle from "./HeaderStyle";
import { useHistory } from "react-router-dom";
import SearchBar from "./SearchBar";
export default function AccountMenu({ logOutHandler }) {
  const classes = useStyle();
  const [OpenMenu, setOpenMenu] = useState(false);
  const { isAuth, user } = useSelector((s) => s.reducer);
  const history = useHistory();
  return (
    <>
      <IconButton
        className={classes.menuIcon}
        onClick={(_) => setOpenMenu(true)}
      >
        <GiHamburgerMenu />
      </IconButton>
      <SwipeableDrawer
        classes={{ paper: classes.SwipeableDrawer }}
        open={OpenMenu}
        onClose={() => setOpenMenu(false)}
        onOpen={() => {}}
      >
        <List disablePadding className={classes.menuCard}>
          {isAuth ? (
            <>
              <Avatar
                src={user.photo}
                className={classes.menuAvatar}
                onClick={() => {
                  history.push("/profile");
                  setOpenMenu(false);
                }}
              />
              {user.isAdmin && (
                <>
                  <Grid
                    item
                    className={classes.MenuTab}
                    onClick={() => {
                      history.push("/admin/users");
                      setOpenMenu(false);
                    }}
                  >
                    <FiUsers style={{ marginRight: ".5rem" }} /> Users
                    Controller
                  </Grid>
                  <Grid
                    item
                    className={classes.MenuTab}
                    onClick={() => {
                      history.push("/admin/orders");
                      setOpenMenu(false);
                    }}
                  >
                    <GiSpikyWing style={{ marginRight: ".5rem" }} /> Orders
                    Deliveries
                  </Grid>
                  <Grid
                    item
                    className={classes.MenuTab}
                    onClick={() => {
                      history.push("/admin/products");
                      setOpenMenu(false);
                    }}
                  >
                    <FaProductHunt style={{ marginRight: ".5rem" }} /> Products
                    Controller
                  </Grid>
                </>
              )}
              <Grid
                className={classes.MenuTab}
                onClick={() => {
                  history.push("/orders");
                  setOpenMenu(false);
                }}
              >
                <FaTruck style={{ marginRight: ".5rem" }} /> My Orders
              </Grid>
              <Grid
                item
                className={classes.MenuTab}
                onClick={() => {
                  history.push("/cart");
                  setOpenMenu(false);
                }}
              >
                <FaShoppingCart style={{ marginRight: ".5rem" }} /> My Cart
              </Grid>
              <Grid
                item
                className={classes.MenuTab}
                onClick={() => {
                  logOutHandler();
                  setOpenMenu(false);
                }}
              >
                <BiLogOut style={{ marginRight: ".5rem" }} /> Log out
              </Grid>
              <Grid container justifyContent="center">
                <SearchBar />
              </Grid>
            </>
          ) : (
            <>
              <Grid
                item
                className={`${classes.MenuTab} ${classes.MenuTabSign}`}
                onClick={() => {
                  history.push("/signin");
                  setOpenMenu(false);
                }}
              >
                SIGN IN
              </Grid>
              <Grid
                item
                className={`${classes.MenuTab} ${classes.MenuTabSign} ${classes.tabSignUp}`}
                onClick={() => {
                  history.push("/signup");
                  setOpenMenu(false);
                }}
              >
                SIGN UP
              </Grid>
            </>
          )}
        </List>
      </SwipeableDrawer>
    </>
  );
}
