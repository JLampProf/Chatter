/**
 * searchScript.js
 *
 * - Handles searching for users and fetching room IDs
 */

import { intercept } from "./axiosScript.js";

/**
 * - searchFriend(currentUser, searchValue, authToken)
 *
 * - Searches for a user by name
 * - Returns user data or error object
 */
export const searchFriend = async (currentUser, searchValue, authToken) => {
  try {
    const searchedFriend = await intercept.get(`/api/search`, {
      headers: { authorization: `Bearer ${authToken}` }, // Auth header
      params: { name: searchValue, currentUser }, // Query params
      withCredentials: true, // Send cookies
    });
    return searchedFriend.data;
  } catch (error) {
    if (error?.status === 404) {
      return { error: true, status: 404 };
    }
    throw new Error("Server Error");
  }
};

/**
 * - fetchRoomId(searchedUser, authToken)
 *
 * - Fetches the room ID for a searched user
 * - Returns room ID or error object
 */
export const fetchRoomId = async (searchedUser, authToken) => {
  try {
    const roomId = await intercept.get(`/api/search/${searchedUser}`, {
      headers: { Authorization: `Bearer ${authToken}` }, // Auth header
      withCredentials: true, // Send cookies
    });
    return roomId.data.roomId;
  } catch (error) {
    if (error?.status) {
      return { error: true, status: 400 };
    }
  }
};
