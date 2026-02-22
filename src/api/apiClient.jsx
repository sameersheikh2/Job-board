import axios from "axios";
import store from "../store/store";
import { logout } from "../features/authSlice/authSlice";
import { showError } from "../utils/toast";

export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      showError("Session expired. Please log in again.");
    }
    return Promise.reject(error);
  },
);
