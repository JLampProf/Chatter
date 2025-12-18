import { intercept } from "./axiosScript.js";

export const searchFriend = async (currentUser, searchValue, authToken) => {
  try {
    const searchedFriend = await intercept.get(`/api/search`, {
      headers: { authorization: `BEARER ${authToken}` },
      params: { name: searchValue, currentUser },
      withCredentials: true,
    });

    return searchedFriend.data;
  } catch (error) {
    if (error?.status === 404) {
      return { error: true, status: 404 };
    }
    throw new Error("Server Error");
  }
};

export const fetchRoomId = async (searchedUser, authToken) => {
  try {
    const roomId = await intercept.get(`/api/search/${searchedUser}`, {
      headers: { Authorization: `BEARER ${authToken}` },
      withCredentials: true,
    });

    return roomId.data.roomId;
  } catch (error) {
    if (error?.status) {
      return { error: true, status: 400 };
    }
  }
};
