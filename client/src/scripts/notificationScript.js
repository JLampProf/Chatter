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

export const sendRemove = async () => {
  try {
    await intercept.delete("api/notifications");

    return;
  } catch (error) {
    console.log(error);
  }
};
