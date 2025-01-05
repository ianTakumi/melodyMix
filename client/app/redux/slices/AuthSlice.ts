import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ISubscription } from "../types/subscription";

interface UserData {
  _id: string;
  subscription: string | ISubscription;
  stripeCustomerId: string;
  name: string;
  email: string;
  dob: Date;
  gender: string;
  role: string;
  fcm_token: string | null;
  phoneNumber: string;
  profile_picture: {
    public_id: string;
    url: string;
  };
  socialAccounts: {
    provider: string;
    provider_id: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

interface ArtistData {
  _id: string;
  name: string;
  bio: string | null;
  email: string;
  phoneNumber: string;
  profile_picture: {
    public_id: string;
    url: string;
  };
  followersCount: Number;
  socMedLinks: {
    platform: string;
    url: string;
  }[];
  fcm_token: string;
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  isAuthenticated: boolean | null;
  data: UserData | null;
  token: string | null;
}

interface Artist {
  isAuthenticated: boolean | null;
  data: ArtistData | null;
  token: string | null;
}

interface AuthState {
  user: User;
  artist: Artist;
}
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
  async ({ user, token }: { user: any; token: string }) => {
    await AsyncStorage.setItem("userJwt", token);
    await AsyncStorage.setItem("userData", JSON.stringify(user));
    const savedToken = await AsyncStorage.getItem("userJwt");
    const savedUser = await AsyncStorage.getItem("userData");

    console.log("Saved token:", savedToken);
    console.log("Saved user:", savedUser);
    return { isAuthenticated: true, data: user, token: token };
  }
);

// Save artist data to async storage
export const saveArtist = createAsyncThunk(
  "auth/saveArtist",
  async ({ artist, token }: { artist: any; token: string }) => {
    console.log("Artist data: ", artist);
    console.log("Artist token: ", token);
    await AsyncStorage.setItem("artistJwt", token);
    await AsyncStorage.setItem("artistData", JSON.stringify(artist));
    return { isAuthenticated: true, data: artist, token: artist };
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ user }: { user: UserData }) => {
    AsyncStorage.removeItem("userData");
    await AsyncStorage.setItem("userData", JSON.stringify(user));
    return user;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      isAuthenticated: null as boolean | null,
      data: null as UserData | null, // Changed to null
      token: null as string | null,
    },
    artist: {
      isAuthenticated: null as boolean | null,
      data: null as ArtistData | null,
      token: null as string | null,
    },
  } as AuthState,
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
