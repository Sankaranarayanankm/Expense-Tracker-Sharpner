import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./expenseSlice";
import authSlice from "./authSlice";
import modalSlice from "./modalSlice";
const store = configureStore({
  reducer: {
    expense: expenseSlice,
    auth: authSlice,
    modal: modalSlice,
  },
});

export default store;
