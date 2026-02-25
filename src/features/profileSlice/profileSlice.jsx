import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../api/apiClient.jsx";
import { logout, updateUser } from "../authSlice/authSlice.jsx";

const initialState = {
  profile: null,
  applications: [],
  totalApplications: 0,
  applicationsPage: 1,
  applicationsLimit: 25,
  profileStatus: "idle",
  applicationsStatus: "idle",
  error: null,
  applicationsError: null,
};

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (params = {}, thunkAPI) => {
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

export const fetchApplications = createAsyncThunk(
  "profile/fetchApplications",
  async (params = {}, thunkAPI) => {
    try {
      const response = await apiClient.get("/applications", { params });
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
    // Profile fetch handlers
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.profileStatus = "loading";
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.profileStatus = "failed";
        state.error = action.payload || action.error?.message;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profileStatus = "succeeded";
        state.profile = action.payload?.data?.profile || null;
      });

    // Applications fetch handlers
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.applicationsStatus = "loading";
        state.applicationsError = null;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.applicationsStatus = "failed";
        state.applicationsError = action.payload || action.error?.message;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.applicationsStatus = "succeeded";
        state.applications = action.payload?.data?.applications || [];
        state.totalApplications = action.payload?.data?.totalApplications || 0;
      });

    // Upsert profile handlers
    builder
      .addCase(upsertProfile.pending, (state) => {
        state.profileStatus = "loading";
        state.error = null;
      })
      .addCase(upsertProfile.rejected, (state, action) => {
        state.profileStatus = "failed";
        state.error = action.payload || action.error?.message;
      })
      .addCase(upsertProfile.fulfilled, (state, action) => {
        state.profileStatus = "succeeded";
        state.profile = action.payload?.data?.profile || null;
      });

    // Logout
    builder.addCase(logout, () => initialState);
  },
});

export default profileSlice.reducer;
