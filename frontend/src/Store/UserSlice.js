import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: {}, isAuth: false, loadingUser: true },
  reducers: {
    AddUser(state, action) {
      state.user = action.payload;
    },
    setAuth(state, action) {
      state.isAuth = action.payload;
    },
    setLoadingUser(state, action) {
      state.loadingUser = action.payload;
    },
    ClearCart(state) {
      state.user.cart = [];
    },
    addOrder(state, action) {
      if (state.user.orders) state.user.orders.push(action.payload);
    },
  },
});

export default userSlice;
export const UserActions = userSlice.actions;
