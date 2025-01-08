import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  artist: null,
  isAuthenticated: false,
};

const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {
    setArtist: (state, action) => {
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
