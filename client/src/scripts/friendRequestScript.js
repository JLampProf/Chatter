/**
 * friendRequestScript.js
 *
 * - Handles friend request accept, reject, and list refresh
 */

import { intercept } from "./axiosScript.js";

/**
 * - sendAcceptFriend(currentUserId, friendId, authToken)
 *
 * - Accepts a friend request via API
 * - Returns error object if server fails
 */
export const sendAcceptFriend = async (currentUserId, friendId, authToken) => {
  console.log("auth:", authToken); // Debug: log auth token
  try {
    await intercept.post(
      "api/friendRequest",
      { data: { currentUserId, friendId } }, // Send user IDs
      {
        headers: { Authorization: `Bearer ${authToken}` }, // Auth header
      },
    );
    return { error: false };
  } catch (error) {
    console.log(error);
    return { error: true, status: 500 };
  }
};

/**
 * - sendRejectFriend(notificationId, authToken)
 *
 * - Rejects a friend request via API
 * - Returns error object if server fails
 */
export const sendRejectFriend = async (notificationId, authToken) => {
  try {
    await intercept.delete(`api/friendRequest/${notificationId}`, {
      headers: { Authorization: `Bearer ${authToken}` }, // Auth header
    });
  } catch (error) {
    console.log("rejectFriendErr:", error);
    return { error: true, status: 500 };
  }
};

/**
 * - fetchFriendsList(userId, accessToken)
 *
 * - Fetches the user's friend list from the backend
 */
export const fetchFriendsList = async (userId, accessToken) => {
  try {
    const fetchFriendList = await intercept.get("api/friendRequest", {
      headers: { Authorization: `Bearer ${accessToken}` }, // Auth header
      params: { userId }, // Query param for user
    });
    return fetchFriendList.data.newList;
  } catch (error) {
    console.log("listRefreshErr:", error);
  }
};
