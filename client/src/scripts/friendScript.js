import { intercept } from "./axiosScript.js";

export const sendFriendRequest = async (
  currentUser,
  searchedUser,
  room_id,
  accessToken
) => {
  try {
    await intercept.post(
      "api/friends",
      {
        data: {
          fromUserData: currentUser,
          toUserData: searchedUser,
          fromUserDataRoomId: room_id,
        },
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
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

// Remove friend API
export const removeFriend = async (userId, friendId, accessToken) => {
  try {
    await intercept.delete("api/friends/remove", {
      data: { userId, friendId },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return { success: true };
  } catch (error) {
    return { error: true, status: error?.response?.status };
  }
};
