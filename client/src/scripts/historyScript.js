/**
 * historyScript.js
 *
 * - Handles fetching chat history between users
 */

import { intercept } from "./axiosScript.js";

/**
 * - fetchHistory(currentUserId, friendId, accessToken)
 *
 * - Fetches chat history from the backend for two users
 * - Returns error object if server fails
 */
export const fetchHistory = async (currentUserId, friendId, accessToken) => {
  try {
    const history = await intercept.get(
      `api/history/${currentUserId}/${friendId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` }, // Auth header
      },
    );
    return history.data.history;
  } catch (error) {
    if (error?.response?.status === 500) {
      console.log("Here:", error);
      return { error: true, status: 500 };
    }
  }
};
