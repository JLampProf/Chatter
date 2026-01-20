/**
 * loginScript.js
 *
 * - Handles login API requests
 * - Sends user credentials to backend and returns response
 */

import axios from "axios";
const { VITE_BACK_URL } = import.meta.env;

/**
 * - handleLogin(userLoginData)
 *
 * - Sends login data to the backend /api/login endpoint
 * - Returns user data or error object
 */
export const handleLogin = async (userLoginData) => {
  try {
    const userDBData = await axios.post(
      `${VITE_BACK_URL}/api/login`,
      {
        userLoginData, // Login credentials
      },
      {
        withCredentials: true, // Send cookies
      },
    );
    return userDBData.data;
  } catch (error) {
    if (error?.response?.status === 400) {
      return { error: true, status: 400 };
    } else if (error?.response?.status === 401) {
      return { error: true, status: 401 };
    } else if (error?.response?.status === 500) {
      return { error: true, status: 500 };
    }
    throw new Error("Server Connection Failed");
  }
};
