import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { Route } from "react-router";
import { useDispatch } from "react-redux";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import "./index.css";
import Main from "./Pages/Main/Main";
import ProductPage from "./Pages/Product/Product";
import SignIn from "./Pages/Signin/Sign";
import SignUp from "./Pages/Signin/SignUp";
import getMe from "./Store/Thunk/getMe";
import CartPage from "./Pages/Cart/Cart";
import ProfilePage from "./Pages/Profile/Profile";
import Orders from "./Pages/Orders/Orders";
import AdminUsers from "./Pages/Admin/AdminUsers/AdminUser";
import AdminProducts from "./Pages/Admin/AdminProducts/AdminProducts";
import EditAddProducts from "./Pages/Admin/AdminProducts/Edit-Add-Products";
import AdminOrders from "./Pages/Admin/Orders/Orders";
import NotFoundPage from "./Pages/NotFound/NotFound";
import { Switch } from "react-router-dom";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  return (
    <>
      <Grid style={{ minHeight: "calc(100vh - 7rem)" }}>
        <Header />
        <div style={{ height: "7.5rem" }}></div>
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/search/:keyword" exact>
            <Main />
          </Route>
          <Route path="/product/:id">
            <ProductPage />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/cart">
            <CartPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/admin/users">
            <AdminUsers />
          </Route>
          <Route path="/admin/products" exact>
            <AdminProducts />
          </Route>
          <Route path="/admin/products/create">
            <EditAddProducts />
          </Route>
          <Route path="/admin/products/Edit/:id">
            <EditAddProducts />
          </Route>
          <Route path="/admin/orders">
            <AdminOrders />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Grid>
      <Footer />
    </>
  );
}

export default App;
