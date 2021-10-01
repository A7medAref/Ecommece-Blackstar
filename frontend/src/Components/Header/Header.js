import {
  AppBar,
  Grid,
  Toolbar,
  Typography,
  useScrollTrigger,
  Slide,
  Hidden,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import Wrapper from "../../Utilites/Wrapper";
import AccountMenu from "./Menu";
import SearchBar from "./SearchBar";
import TabsComp from "./Tabs";
import { useDispatch } from "react-redux";
import axios from "axios";
import { UserActions } from "../../Store/UserSlice";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logOutHandler = async () => {
    dispatch(UserActions.setAuth(false));
    dispatch(UserActions.AddUser({}));
    axios.post("/api/v1/auth/logout");
    if (window.location.pathname !== "/") history.push("/");
  };

  return (
    <HideOnScroll>
      <AppBar>
        <Toolbar style={{ padding: ".9rem 0" }}>
          <Wrapper type="header">
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid
                container
                style={{ width: "fit-content" }}
                alignItems="center"
              >
                <Typography variant="h5" component={Link} to="/">
                  BLACKSTAR
                </Typography>
                <Hidden mdDown>
                  <SearchBar />
                </Hidden>
              </Grid>
              <Hidden mdDown>
                <TabsComp logOutHandler={logOutHandler} />
              </Hidden>
              <Hidden lgUp>
                <AccountMenu logOutHandler={logOutHandler} />
              </Hidden>
            </Grid>
          </Wrapper>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};
export default Header;
