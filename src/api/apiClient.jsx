import axios from "axios";

axios.defaults.headers.common["Authorization"] =
  `Bearer ${localStorage.getItem("token") || ""}`;

export const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
