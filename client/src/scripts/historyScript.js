import { intercept } from "./axiosScript.js";

export const fetchHistory = async (currentUserId, friendId, accessToken) => {
  try {
    const history = await intercept.get(
      `api/history/${currentUserId}/${friendId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return history.data.history;
  } catch (error) {
    if (error?.response?.status === 500) {
      console.log("Here:", error);
      return { error: true, status: 500 };
    }
  }
};
