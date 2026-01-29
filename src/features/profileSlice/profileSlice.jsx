import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../api/apiClient.jsx";
import { logout, updateUser } from "../authSlice/authSlice.jsx";

const initialState = {
  profile: null,
  status: "idle",
  error: null,
};

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get("/profile/me");
      const user = response.data?.data?.user;
      if (user) {
        thunkAPI.dispatch(updateUser(user));
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const upsertProfile = createAsyncThunk(
  "profile/upsertProfile",
  async (payload, thunkAPI) => {
    try {
      const response = await apiClient.put("/profile/me", payload);
      const user = response.data?.data?.user;
      if (user) {
        thunkAPI.dispatch(updateUser(user));
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.status = "loading";
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.status = "failed";
      state.error = action.payload || action.error?.message;
    };
    const handleFulfilled = (state, action) => {
      state.status = "succeeded";
      state.profile = action.payload?.data?.profile || null;
    };

    builder
      .addCase(fetchProfile.pending, handlePending)
      .addCase(fetchProfile.rejected, handleRejected)
      .addCase(fetchProfile.fulfilled, handleFulfilled)
      .addCase(upsertProfile.pending, handlePending)
      .addCase(upsertProfile.rejected, handleRejected)
      .addCase(upsertProfile.fulfilled, handleFulfilled)
      .addCase(logout, () => initialState);
  },
});

export default profileSlice.reducer;
