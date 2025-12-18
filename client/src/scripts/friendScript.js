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
    console.log("friendScriptSaveFriend:", error);
    if (error?.response) {
      if (error?.response?.status === 500) {
        return { error: true, status: 500 };
      }
    }
  }
};
