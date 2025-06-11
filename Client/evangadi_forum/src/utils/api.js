/**
 * API configuration for Evangadi Forum
 * Production Summary: Configures Axios instance with token interceptor for backend API communication.
 */
import axios from "axios";

const baseURL = axios.create({
  baseURL: "http://localhost:3000",
});

// Add interceptor to attach JWT token to all requests
baseURL.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Attaching token to request:", token); // Debug
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { baseURL };
