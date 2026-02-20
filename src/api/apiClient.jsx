// src/utils/apiClient.js (or wherever you keep it)

import axios from "axios";
import store from "../store/store";
import { logout } from "../redux/authSlice";
import { showError } from "../utils/toast";

export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

// Response interceptor - handle 401
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
