import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserSlice";

const store = configureStore({
  reducer: userSlice,
});

export default store;
