import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ArtistState {
  artist: {
    _id: string;
    name: string;
    bio?: string;
    email: string;
    phoneNumber?: string;
    profile_picture: {
      public_id: string;
      url: string;
    };
    followersCount: number;
    socMedLinks: {
      platform: string;
      url: string;
    }[];
    fcm_token?: string;
  } | null;
  isAuthenticated: boolean;
}

const initialState: ArtistState = {
  artist: null,
  isAuthenticated: false,
};

const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {
    setArtist: (
      state,
      action: PayloadAction<{
        _id: string;
        name: string;
        bio?: string;
        email: string;
        phoneNumber?: string;
        profile_picture: {
          public_id: string;
          url: string;
        };
        followersCount: number;
        socMedLinks: {
          platform: string;
          url: string;
        }[];
        fcm_token?: string;
      }>
    ) => {
      state.artist = action.payload;
      state.isAuthenticated = true;
    },
    clearArtist: (state) => {
      state.artist = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setArtist, clearArtist } = artistSlice.actions;
export default artistSlice.reducer;
