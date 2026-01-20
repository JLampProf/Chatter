/**
 * logoutScript.js
 *
 * - Handles user logout API request
 */

import { intercept } from "./axiosScript.js";

/**
 * - handleLogout(accessToken)
 *
 * - Sends a logout request to the backend
 * - Throws error if logout fails
 */
export const handleLogout = async (accessToken) => {
  try {
    const logout = await intercept.delete("api/logout", {
      headers: { Authorization: `Bearer ${accessToken}` }, // Auth header
    });
  } catch (error) {
    throw new Error("Could not logout.");
  }
};
