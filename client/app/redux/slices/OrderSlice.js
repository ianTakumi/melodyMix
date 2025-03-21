import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    placeOrderStart: (state) => {
      state.loading = true;
    },
    placeOrderSuccess: (state, action) => {
      state.orders.push(action.payload);
      state.loading = false;
    },
    placeOrderFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { placeOrderStart, placeOrderSuccess, placeOrderFailure } =
  orderSlice.actions;

export default orderSlice.reducer;
