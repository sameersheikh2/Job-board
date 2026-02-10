import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice/authSlice";
import profileReducer from "../features/profileSlice/profileSlice";
import jobReducer from "../features/jobSlice/jobSlice";
import applicationReducer from "../features/applicationSlice/applicationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    job: jobReducer,
    application: applicationReducer,
  },
});

export default store;
