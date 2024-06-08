import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./expenseSlice";
import authSlice from "./authSlice";
const store = configureStore({
  reducer: {
    expense: expenseSlice,
    auth: authSlice,
  },
});

export default store;
