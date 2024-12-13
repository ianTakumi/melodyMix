import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: {
    _id: string;
    name: string;
    email: string;
    dob?: Date;
    gender?: string;
    phoneNumber?: string;
    profile_picture: {
      public_id: string;
      url: string;
    };
    role: string;
    socialAccounts: {
      provider: string;
      provider_id: string;
    }[];
    fcm_token?: string;
  } | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        _id: string;
        name: string;
        email: string;
        dob?: Date;
        gender?: string;
        phoneNumber?: string;
        profile_picture: {
          public_id: string;
          url: string;
        };
        role: string;
        socialAccounts: {
          provider: string;
          provider_id: string;
        }[];
        fcm_token?: string;
      }>
    ) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
