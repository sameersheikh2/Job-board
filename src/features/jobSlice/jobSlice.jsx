import { apiClient } from "../../api/apiClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  recruiterJobs: [],
  recruiterTotalJobs: 0,
  recruiterNumOfPages: 1,
  recruiterStatus: "idle",
  recruiterError: null,

  jobListings: [],
  listingsTotalJobs: 0,
  listingsNumOfPages: 1,
  listingsStatus: "idle",
  listingsError: null,

  createStatus: "idle",
  createError: null,

  updateStatus: "idle",
  updateError: null,

  jobDetails: null,
  hasApplied: false,
  applicationStatus: null,
  jobDetailsStatus: "idle",
  jobDetailsError: null,
};

export const createJob = createAsyncThunk(
  "job/createJob",
  async (jobData, thunkAPI) => {
    try {
      const response = await apiClient.post("/jobs", jobData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const fetchJobs = createAsyncThunk(
  "job/fetchJobs",
  async (params, thunkAPI) => {
    try {
      const response = await apiClient.get("/jobs", { params });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const fetchRecruiterJobs = createAsyncThunk(
  "job/fetchRecruiterJobs",
  async (params, thunkAPI) => {
    try {
      const response = await apiClient.get("/jobs/recruiter", { params });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const fetchJobById = createAsyncThunk(
  "job/fetchJobById",
  async (jobId, thunkAPI) => {
    try {
      const response = await apiClient.get(`/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const updateJob = createAsyncThunk(
  "job/updateJob",
  async ({ jobId, updates }, thunkAPI) => {
    try {
      const response = await apiClient.patch(`/jobs/${jobId}`, updates);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

const jobSlice = createSlice({
  name: "job",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createJob.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload || action.error?.message;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.createStatus = "succeeded";

        const createdJob =
          action.payload?.data?.job || action.payload?.data || action.payload;

        if (createdJob) {
          state.recruiterJobs.unshift(createdJob);
          state.recruiterTotalJobs = state.recruiterJobs.length;
        }
      })

      .addCase(fetchRecruiterJobs.pending, (state) => {
        state.recruiterStatus = "loading";
        state.recruiterError = null;
      })
      .addCase(fetchRecruiterJobs.rejected, (state, action) => {
        state.recruiterStatus = "failed";
        state.recruiterError = action.payload || action.error?.message;
      })
      .addCase(fetchRecruiterJobs.fulfilled, (state, action) => {
        state.recruiterStatus = "succeeded";

        const payload = action.payload || {};
        const data = payload.data || payload;
        const jobs = Array.isArray(data) ? data : data?.jobs || [];

        state.recruiterJobs = jobs;
        state.recruiterTotalJobs = data?.totalJobs ?? jobs.length;
        state.recruiterNumOfPages = data?.numOfPages ?? 1;
      })

      .addCase(fetchJobs.pending, (state) => {
        state.listingsStatus = "loading";
        state.listingsError = null;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.listingsStatus = "failed";
        state.listingsError = action.payload || action.error?.message;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.listingsStatus = "succeeded";

        const payload = action.payload || {};
        const data = payload.data || payload;
        const jobs = Array.isArray(data) ? data : data?.jobs || [];

        state.jobListings = jobs;
        state.listingsTotalJobs = data?.totalJobs ?? jobs.length;
        state.listingsNumOfPages = data?.numOfPages ?? 1;
      })

      .addCase(fetchJobById.pending, (state) => {
        state.jobDetailsStatus = "loading";
        state.jobDetailsError = null;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.jobDetailsStatus = "failed";
        state.jobDetailsError = action.payload || action.error?.message;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.jobDetailsStatus = "succeeded";

        const data = action.payload?.data || action.payload;

        state.jobDetails = data?.job || null;
        state.hasApplied = data?.hasApplied || false;
        state.applicationStatus = data?.applicationStatus || null;
      })

      .addCase(updateJob.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload || action.error?.message;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";

        const updatedJob =
          action.payload?.data?.job || action.payload?.data || action.payload;

        if (updatedJob) {
          const id = updatedJob._id || updatedJob.id;
          const index = state.recruiterJobs.findIndex(
            (j) => (j._id || j.id) === id,
          );

          if (index !== -1) {
            state.recruiterJobs[index] = {
              ...state.recruiterJobs[index],
              ...updatedJob,
            };
          }
        }
      });
  },
});

export default jobSlice.reducer;
