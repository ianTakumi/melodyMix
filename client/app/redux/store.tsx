import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice";
import authReducer from "./slices/AuthSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
