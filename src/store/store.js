import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice/authSlice";
import profileReducer from "../features/profileSlice/profileSlice";
import jobReducer from "../features/jobSlice/jobSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    job: jobReducer,
  },
});

export default store;
