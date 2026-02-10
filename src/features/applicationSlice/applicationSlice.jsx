import { apiClient } from "../../api/apiClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error: null,
  message: null,
};

export const applyToJob = createAsyncThunk(
  "application/applyToJob",
  async (jobId, thunkAPI) => {
    try {
      const res = await apiClient.post(`/applications/apply/${jobId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to apply to job",
      );
    }
  },
);

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.status = "loading";
      state.error = null;
      state.message = null;
    };

    const handleRejected = (state, action) => {
      state.status = "error";
      state.error = action.payload || "An error occurred";
      state.message = null;
    };

    builder.addCase(applyToJob.pending, handlePending);
    builder.addCase(applyToJob.rejected, handleRejected);
    builder.addCase(applyToJob.fulfilled, (state, action) => {
      state.status = "success";
      state.error = null;
      state.message =
        action.payload?.message || "Application submitted successfully";
    });
  },
});

export const { clearError } = applicationSlice.actions;
export default applicationSlice.reducer;
