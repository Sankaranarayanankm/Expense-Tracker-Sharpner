import { createSlice } from "@reduxjs/toolkit";
export const apiKey = "AIzaSyAOs3l1dk_d6TtQJHjuzJ7YN1Fb6aWs9Mc";


const initialState = {
  id: "",
  email: "",
  isLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
   
    login(state, action) {
      state.id = action.payload.id || "";
      state.email = action.payload.email || "";
      state.isLogin = !!action.payload.id;
    },
    logout(state) {
      state.id = "";
      state.email = "";
      state.isLogin = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
