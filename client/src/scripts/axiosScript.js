/**
 * axiosScript.js
 *
 * - Configures a custom Axios instance for API requests
 * - Handles automatic token refresh on 401/403 errors
 */

import axios, { HttpStatusCode } from "axios";

const BACK_URL = import.meta.env.VITE_BACK_URL; // Backend URL from environment

/**
 * - intercept
 *
 * - Axios instance with base URL and credentials
 */
export const intercept = axios.create({
  baseURL: BACK_URL, // Set base URL for all requests
  withCredentials: true, // Send cookies with requests
});

/**
 * - Response Interceptor
 *
 * - Automatically refreshes token on 401/403 and retries the request
 */
intercept.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (originalRequest._retry) {
      return Promise.reject(error);
    }
    if (
      error.response?.status === HttpStatusCode.Unauthorized ||
      error.response?.status === HttpStatusCode.Forbidden
    ) {
      originalRequest._retry = true;
      try {
        const newToken = await intercept.post("api/refresh");
        const accessToken = newToken.data.accessToken;
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return intercept(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
