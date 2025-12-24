import { data } from "react-router-dom";
import { intercept } from "./axiosScript.js";

export const saveMessage = async (messageData, accessToken) => {
  try {
    await intercept.post(
      "api/chat",
      { data: { messageData } },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
  } catch (error) {
    if (error?.response?.status === 500) {
      return { error: true, status: 500 };
    }
  }
};
