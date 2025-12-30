import { intercept } from "./axiosScript.js";

export const fetchNotifications = async (userId, accessToken) => {
  try {
    const notifications = await intercept.get("api/notifications", {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { userId },
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

export const markAllNewMessagesAsRead = async (userId, accessToken) => {
  try {
    const response = await intercept.post(
      "api/notifications/mark-all-read",
      { userId },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return response.data;
  } catch (error) {
    console.log("markAllNewMessagesAsRead:", error);
    throw new Error("Failed to mark notifications as read");
  }
};
