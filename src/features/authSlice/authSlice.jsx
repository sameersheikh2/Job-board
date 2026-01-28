import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../api/apiClient.jsx";

const initialState = {
  user: null,
  token: "",
  isLoggedIn: false,
  isVerified: false,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await apiClient.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await apiClient.post("/auth/signup", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = "";
      state.isLoggedIn = false;
      state.isVerified = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.status = "loading";
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.status = "failed";
      state.error = action.payload || action.error?.message;
    };

    builder
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        const data = action.payload?.data;
        state.status = "succeeded";
        state.user = data?.user || null;
        state.token = data?.token || "";
        state.isLoggedIn = Boolean(data?.token);
        state.isVerified = data?.user?.isVerified ?? false;
        if (state.token) {
          localStorage.setItem("token", state.token);
        }
      })
      .addCase(loginUser.rejected, handleRejected);
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
        state.token = "";
        state.isLoggedIn = false;
        state.isVerified = false;
        localStorage.removeItem("token");
      })
      .addCase(registerUser.rejected, handleRejected);
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
