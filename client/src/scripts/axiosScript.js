import axios, { HttpStatusCode } from "axios";

const BACK_URL = import.meta.env.VITE_BACK_URL;

export const intercept = axios.create({
  baseURL: BACK_URL,
  withCredentials: true,
});

intercept.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite retry loops
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // Handle both 401 and 403 as token-related errors
    if (
      error.response?.status === HttpStatusCode.Unauthorized ||
      error.response?.status === HttpStatusCode.Forbidden
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await intercept.post("api/refresh");
        const accessToken = newToken.data.accessToken;

        // Ensure headers object exists
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        return intercept(originalRequest);
      } catch (refreshError) {
        // If refresh fails, reject with the original error
        // Don't return objects, let axios handle the error properly
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
