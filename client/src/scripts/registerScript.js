/**
 * registerScript.js
 *
 * - Handles user registration API requests
 */

import axios from "axios";

const backend = import.meta.env.VITE_BACK_URL;

/**
 * - registerSubmit(userLoginData)
 *
 * - Sends registration data to the backend /api/register endpoint
 * - Returns user data or error object
 */
export const registerSubmit = async (userLoginData) => {
  try {
    const registeredUser = await axios.post(
      `${backend}/api/register`,
      {
        userLoginData, // Registration credentials
      },
      {
        withCredentials: true, // Send cookies
      },
    );
    return registeredUser.data;
  } catch (error) {
    if (error?.response?.status === 409) {
      return { error: true, status: 409 };
    } else if (error?.response?.status === 400) {
      return { error: true, status: 400 };
    }
    throw new Error("Server Error");
  }
};
