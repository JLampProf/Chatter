/**
 * friendScript.js
 *
 * - Handles sending and removing friends
 */

import { intercept } from "./axiosScript.js";

/**
 * - sendFriendRequest(currentUser, searchedUser, room_id, accessToken)
 *
 * - Sends a friend request to the backend
 * - Returns error object if server fails
 */
export const sendFriendRequest = async (
  currentUser,
  searchedUser,
  room_id,
  accessToken,
) => {
  try {
    await intercept.post(
      "api/friends",
      {
        data: {
          fromUserData: currentUser, // Sender user ID
          toUserData: searchedUser, // Receiver user ID
          fromUserDataRoomId: room_id, // Sender's room ID
        },
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }, // Auth header
    );
    return;
  } catch (error) {
    if (error?.response) {
      if (error?.response?.status === 500) {
        return { error: true, status: 500 };
      }
    }
  }
};

/**
 * - removeFriend(userId, friendId, accessToken)
 *
 * - Removes a friend relationship via API
 * - Returns success or error object
 */
export const removeFriend = async (userId, friendId, accessToken) => {
  try {
    await intercept.delete("api/friends/remove", {
      data: { userId, friendId }, // IDs for removal
      headers: { Authorization: `Bearer ${accessToken}` }, // Auth header
    });
    return { success: true };
  } catch (error) {
    return { error: true, status: error?.response?.status };
  }
};
