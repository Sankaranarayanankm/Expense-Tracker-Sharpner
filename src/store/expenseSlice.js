import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  editedItem: {},
  loading: false,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    loadingHandler(state, action) {
      state.loading = action.payload;
    },
    addItem(state, action) {
      state.items = state.items.concat(action.payload);
      state.editedItem = {};
    },
    deleteItem(state, action) {
      console.log(action.payload);
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setEditedItem(state, action) {
      console.log(action.payload);
      state.editedItem = { ...action.payload };
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const expenseAction = expenseSlice.actions;

export default expenseSlice.reducer;
