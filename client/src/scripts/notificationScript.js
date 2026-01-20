/**
 * notificationScript.js
 *
 * - Handles fetching and updating notifications for the user
 */

import { intercept } from "./axiosScript.js";

/**
 * - fetchNotifications(userId, accessToken)
 *
 * - Fetches notifications for the user from the backend
 * - Returns notification data or error object
 */
export const fetchNotifications = async (userId, accessToken) => {
  try {
    const notifications = await intercept.get("api/notifications", {
      headers: { Authorization: `Bearer ${accessToken}` }, // Auth header
      params: { userId }, // Query param for user
    });
    return notifications.data;
  } catch (error) {
    console.log("NotificationsScript:", error);
    if (error?.response?.status === 500) {
      return { error: true, status: 500 };
    }
    throw new Error("Failed to fetch Notifications");
  }
};

/**
 * - markAllNewMessagesAsRead(userId, accessToken)
 *
 * - Marks all new messages as read for the user
 * - Returns response data or throws error
 */
export const markAllNewMessagesAsRead = async (userId, accessToken) => {
  try {
    const response = await intercept.post(
      "api/notifications/mark-all-read",
      { userId }, // User ID to mark as read
      {
        headers: { Authorization: `Bearer ${accessToken}` }, // Auth header
      },
    );
    return response.data;
  } catch (error) {
    console.log("markAllNewMessagesAsRead:", error);
    throw new Error("Failed to mark notifications as read");
  }
};
