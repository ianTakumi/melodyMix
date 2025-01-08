import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Load user and artist from AsyncStorage and decode the token
export const loadUser = createAsyncThunk("auth/loadUser", async () => {
  const token = await AsyncStorage.getItem("userJwt");
  const userObj = await AsyncStorage.getItem("userData");
  if (token && userObj) {
    return { isAuthenticated: true, data: JSON.parse(userObj), token };
  }
  return { isAuthenticated: false, data: {}, token: null };
});

export const loadArtist = createAsyncThunk("auth/loadArtist", async () => {
  const token = await AsyncStorage.getItem("artistJwt");
  const artistObj = await AsyncStorage.getItem("artistData");

  if (token && artistObj) {
    return { isAuthenticated: true, data: JSON.parse(artistObj), token };
  }
  return { isAuthenticated: false, data: {}, token: null };
});

// Save user and artist data to AsyncStorage
export const saveUser = createAsyncThunk(
  "auth/saveUser",
  async ({ user, token }) => {
    await AsyncStorage.setItem("userJwt", token);
    await AsyncStorage.setItem("userData", JSON.stringify(user));
    return { isAuthenticated: true, data: user, token };
  }
);

export const saveArtist = createAsyncThunk(
  "auth/saveArtist",
  async ({ artist, token }) => {
    await AsyncStorage.setItem("artistJwt", token);
    await AsyncStorage.setItem("artistData", JSON.stringify(artist));
    return { isAuthenticated: true, data: artist, token };
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ user }) => {
    await AsyncStorage.removeItem("userData");
    await AsyncStorage.setItem("userData", JSON.stringify(user));
    return user;
  }
);

const initialState = {
  user: {
    isAuthenticated: null,
    data: null,
    token: null,
  },
  artist: {
    isAuthenticated: null,
    data: null,
    token: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user.isAuthenticated = false;
      state.user.data = null;
      state.user.token = null;
      AsyncStorage.removeItem("userJwt");
      AsyncStorage.removeItem("userData");
    },
    logoutArtist: (state) => {
      state.artist.isAuthenticated = false;
      state.artist.data = null;
      state.artist.token = null;
      AsyncStorage.removeItem("artistJwt");
      AsyncStorage.removeItem("artistData");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.user.isAuthenticated = action.payload.isAuthenticated;
      state.user.data = action.payload.data;
      state.user.token = action.payload.token;
    });
    builder.addCase(loadArtist.fulfilled, (state, action) => {
      state.artist.isAuthenticated = action.payload.isAuthenticated;
      state.artist.data = action.payload.data;
      state.artist.token = action.payload.token;
    });
    builder.addCase(saveUser.fulfilled, (state, action) => {
      state.user.isAuthenticated = action.payload.isAuthenticated;
      state.user.data = action.payload.data;
      state.user.token = action.payload.token;
    });
    builder.addCase(saveArtist.fulfilled, (state, action) => {
      state.artist.isAuthenticated = action.payload.isAuthenticated;
      state.artist.data = action.payload.data;
      state.artist.token = action.payload.token;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user.data = action.payload;
    });
  },
});

export const { logoutUser, logoutArtist } = authSlice.actions;
export default authSlice.reducer;
