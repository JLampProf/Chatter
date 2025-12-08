import { intercept } from "./axiosScript.js";

export const handleLogout = async (accessToken) => {
  try {
    const logout = await intercept.get("api/logout", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    throw new Error("Could not logout.");
  }
};
