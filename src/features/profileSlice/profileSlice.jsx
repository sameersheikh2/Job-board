import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  profile: null,
  status: "",
  error: "",
};

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (userId, thunkAPI) => {
    axios
      .get(`/api/profile/${userId}`)
      .then((response) => response.data)
      .catch((error) => thunkAPI.rejectWithValue(error.message));
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.status = "loading";
    };
    const handleRejected = (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    };
    builder
      .addCase("profile/fetchProfile/pending", handlePending)
      .addCase("profile/fetchProfile/rejected", handleRejected)
      .addCase("profile/fetchProfile/fulfilled", (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      });
  },
});

export default profileSlice.reducer;
