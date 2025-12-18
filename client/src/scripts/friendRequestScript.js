import { intercept } from "./axiosScript.js";

export const sendAcceptFriend = async (currentUserId, friendId, authToken) => {
  try {
    await intercept.post(
      "api/friendRequest",
      { data: { currentUserId, friendId } },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );

    return { error: false };
  } catch (error) {
    console.log(error);
    return { error: true, status: 500 };
  }
};

export const sendRejectFriend = async (notificationId, authToken) => {
  try {
    await intercept.delete(`api/friendRequest/${notificationId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  } catch (error) {
    console.log("rejectFriendErr:", error);
    return { error: true, status: 500 };
  }
};

export const fetchFriendsList = async (userId, accessToken) => {
  try {
    const fetchFriendList = await intercept.get("api/friendRequest", {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { userId },
    });

    return fetchFriendList.data.newList;
  } catch (error) {
    console.log("listRefreshErr:", error);
  }
};
