import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    addReviewStart: (state) => {
      state.loading = true;
    },
    addReviewSuccess: (state, action) => {
      state.reviews.push(action.payload);
      state.loading = false;
    },
    addReviewFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { addReviewStart, addReviewSuccess, addReviewFailure } =
  reviewSlice.actions;

export default reviewSlice.reducer;
