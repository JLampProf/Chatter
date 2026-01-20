/**
 * chatController.js
 *
 * - Handles saving chat messages and creating notifications
 */

import { pool } from "./databaseController.js";

/**
 * - saveMessageHandler(req, res)
 *
 * - Saves a chat message to the database and creates a notification
 */
export const saveMessageHandler = async (req, res) => {
  const data = req.body.data.messageData; // Extract message data from request
  const { message, receiverId, sender_id, roomId } = data; // Destructure message fields
  try {
    await pool.query(
      // Insert message into chats table
      "INSERT INTO chats (message, receiver_id, sender_id, room_id) VALUES (?, ?, ?, ?)",
      [message, receiverId, sender_id, roomId],
    );
    await pool.query(
      // Create notification for new message
      "INSERT INTO notifications (notification_type, content, to_user_id, from_user_id) VALUES (?, ?, ?, ?)",
      ["new_message", message, receiverId, sender_id],
    );
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};
