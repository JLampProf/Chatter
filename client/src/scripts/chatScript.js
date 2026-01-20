/**
 * chatScript.js
 *
 * - Handles saving chat messages to the backend
 */

import { data } from "react-router-dom";
import { intercept } from "./axiosScript.js";

/**
 * - saveMessage(messageData, accessToken)
 *
 * - Sends a chat message to the backend API
 * - Returns error object if server fails
 */
export const saveMessage = async (messageData, accessToken) => {
  try {
    await intercept.post(
      "api/chat",
      { data: { messageData } }, // Send message data in request body
      { headers: { Authorization: `Bearer ${accessToken}` } }, // Auth header
    );
  } catch (error) {
    if (error?.response?.status === 500) {
      return { error: true, status: 500 }; // Return error if server fails
    }
  }
};
