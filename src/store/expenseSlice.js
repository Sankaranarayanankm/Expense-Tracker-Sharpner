import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  editedItem: {},
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addItem(state, action) {
      state.items = state.items.concat(action.payload);
    },
    deleteItem(state, action) {
      state.items = state.items.filter((item) => item.id == action.payload.id);
    },
    editedItem(state, action) {
      state.editedItem = { ...action.payload };
      state.items = state.items.filter((item) => item.id === action.payload.id);
    },
  },
});

export const expenseAction = expenseSlice.actions;

export default expenseSlice.reducer;
