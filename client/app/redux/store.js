import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import productReducer from "./slices/ProductSlice";
import reviewReducer from "./slices/ReviewSlice";
import orderReducer from "./slices/OrderSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    order: orderReducer,
    review: reviewReducer,
  },
});

export default store;
